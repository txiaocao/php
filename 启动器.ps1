$phphost = "C:\xiaok\bin\tools\server\modules";
$phphost += "\Publish\index.php";
$dir = Read-Host;
php $phphost $dir;
echo $?;