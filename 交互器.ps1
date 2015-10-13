Function Get-FileName($initialDirectory)
{  
 [System.Reflection.Assembly]::LoadWithPartialName("System.Windows.Forms") |
 Out-Null
 
    $OpenFileDialog = New-Object System.Windows.Forms.OpenFileDialog
    $OpenFileDialog.initialDirectory = $initialDirectory
    $OpenFileDialog.filter = "All files (*.*)| *.*"
    $OpenFileDialog.ShowDialog() | Out-Null
    return $OpenFileDialog.filename
}

while("true"){

    echo "KK，你需要干嘛呢？";
    echo "1、必应今日壁纸下载";
    echo "2、小游戏转存";
    echo "3、PHP编码";
    echo "5、发布项目";
    echo "4、生成二维码";
    echo "6、[缺]解析二维码";
    echo "7、快速配置Typescript项目";
    echo "8、BASE64编码图片";
    echo "9、BASE64解码图片";
    echo "10、超级密码";
    echo "0、退出"


    $phphost = "C:\xiaok\bin\tools\server\modules";

    $readKey = Read-Host;
    if($readKey -eq 0){
    break;
    }

    switch($readKey){
        1{
            $phphost += "\Bingv3\bing.php";
            php $phphost;
            echo $?;
        }
        2{
            $phphost += "\DownloadHar\index.php";
            while("true"){
                php $phphost;
                echo $?;
                Read-Host;
            
            };
        
        }
        3{
            echo "暂无";
        }
        5{
            $phphost += "\Publish\index.php";
            while("true"){
                $dir = Read-Host;
                php $phphost $dir;
                echo $?;
            };
        }
        4{
            $phphost += "\QrCode\index.php";
            while("true"){
                $dir = Read-Host;
                $output = php $phphost $dir;
                echo $?;
            };
        }
        7{
            $phphost += "\VisualCodeFast\index.php";
            $dir = Read-Host;
            php $phphost $dir;
            echo $?;
        }
        8{
            $imgpath = Get-FileName;
            $phphost += "\Base64Encode\index.php";
            php $phphost $imgpath;
            echo $?;
        }
        Default{
            clear;
            echo "什么都没有选择";
        }
    }
}