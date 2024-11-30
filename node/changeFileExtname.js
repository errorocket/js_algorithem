const fs = require('fs');
const path = require('path');

// 处理传参
const args = process.argv.slice(2);
const [dirPath, oldExtname, newExtname] = args;
if (!dirPath || !oldExtname || !newExtname) {
    console.log(`fail  传入的参数不完整 示例: node changeFileExtname 'dirPath' 'oldExtname' 'newExtname'`);
    return;
}

const changeFileExtname = (dirPath) => {
    fs.readdir(dirPath, (err, files) => {
        if (err) {
            console.log(`fail  读取目录时发生错误 ${err.message}`);
            return;
        }
        files.forEach(file => {
            const oldFilePath = path.join(dirPath, file);
            fs.stat(oldFilePath, (err, status) => {
                if (err) {
                    console.log(`fail  获取文件状体时发生错误 ${err.message}`);
                    return;
                }
                if (status.isDirectory()) {
                    changeFileExtname(oldFilePath); // 处理子目录
                } else if (path.extname(file) === oldExtname) {
                    const baseName = path.basename(file, oldExtname);
                    const newFilePath = path.join(dirPath, baseName + newExtname);
                    fs.rename(oldFilePath, newFilePath, err => {
                        if (err) {
                            console.log(`fail  文件重命名时失败 ${err.message}`);
                            return;
                        }
                        console.log(`success  文件 ${oldFilePath} 已重命名为 ${newFilePath}`);
                    });
                }
            });
        });
    });
}

changeFileExtname(dirPath);