@echo off
path %path%;"C:\Program Files\CodeAndWeb\TexturePacker\bin"

for /f "usebackq tokens=*" %%d in (`dir /s /b *.pvr.ccz`) do (
TexturePacker.exe --opt RGBA8888 --sheet "%%~dpnd.png" "%%d"
)
del out.plist
pause