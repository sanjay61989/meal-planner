# Variables
$EC2User = "ec2-user"  # Or "ubuntu" for Ubuntu AMIs
$EC2Host = "13.60.244.16"
$PEMFile = "C:\Users\sonu6\Downloads\rbeon.pem"
$AngularBuildDir = "D:\test git modules\meal-planner\dist\meal-planner\browser"
$NginxConfLocal = "D:\test git modules\meal-planner\nginx.conf"
$NginxConfRemote = "/etc/nginx/nginx.conf"
$ZipFilePath = "D:\test git modules\meal-planner\build.zip"  # Path for the compressed zip file
$RemoteZipPath = "/tmp"  # Remote path where the zip file will be uploaded
$ExtractPath = "/usr/share/nginx/html/"  # Path where the zip file will be extracted

# Set location to your project directory
Set-Location "D:\test git modules\meal-planner"

# Build Angular App
Write-Host "Building Angular app..."
ng build --configuration production

# Compress the Angular build directory into a zip file
Write-Host "Compressing Angular build directory..."
Compress-Archive -Path "$AngularBuildDir\*" -DestinationPath $ZipFilePath

# Unified function to deploy a zip file to the EC2 server
function Deploy-ZipToServer {
    param (
        [string]$ZipFilePath,  # Path to the zip file on your local machine
        [string]$RemotePath,   # Destination folder on the EC2 server
        [string]$ExtractPath,  # Path where the zip file will be extracted
        [string]$PEMFile,      # Path to the PEM file
        [string]$EC2User,      # EC2 username (ec2-user or ubuntu)
        [string]$EC2Host,      # EC2 host IP address
        [bool]$CleanUp = $true # Whether to delete the zip file after extraction
    )

    Write-Host "Uploading zip file to EC2..."
    # Extract the zip file name from the local path
    $ZipFileName = (Split-Path $ZipFilePath -Leaf)
    scp -i $PEMFile $ZipFilePath "$EC2User@${EC2Host}:$RemotePath"

    Write-Host "Extracting zip file on EC2..."
    ssh -i $PEMFile $EC2User@$EC2Host "sudo unzip -o $RemotePath/$ZipFileName -d $ExtractPath"

    if ($CleanUp) {
        Write-Host "Cleaning up zip file on EC2 and Windows..."
        Remove-Item -Path $ZipFilePath -Force
        ssh -i $PEMFile $EC2User@$EC2Host "sudo rm $RemotePath/$ZipFileName"
    }
}

# Delete Existing Files on EC2
Write-Host "Deleting existing files on EC2..."
ssh -i $PEMFile $EC2User@$EC2Host "sudo rm -rf /usr/share/nginx/html/*"

# Upload and Deploy Zip File
Deploy-ZipToServer -ZipFilePath $ZipFilePath -RemotePath $RemoteZipPath -ExtractPath $ExtractPath -PEMFile $PEMFile -EC2User $EC2User -EC2Host $EC2Host

# Upload NGINX Configuration
Write-Host "Uploading NGINX configuration..."
scp -i $PEMFile $NginxConfLocal "$EC2User@${EC2Host}:$NginxConfRemote"

# Restart NGINX
Write-Host "Restarting NGINX on EC2..."
ssh -i $PEMFile $EC2User@$EC2Host "sudo systemctl restart nginx"

Write-Host "Deployment completed successfully."
Write-Host ("http://$EC2Host")
