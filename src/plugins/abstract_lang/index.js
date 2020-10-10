let fs = require("fs");
let path = require('path');
let filePath = path.resolve(__dirname, '../', '../');
let dirRegEx = /^((?!i18n).)*$/;
let pathRegEx = /^.*\.(js|vue)$/;
let filePathArr = [];
let filteredLang = {};

findPath(filePath);
filterData();

/**
 * 查找目录下的文件或者文件
 * @param {String} path 需要查找的目录或者文件路径 
 */
function findPath (rootPath) {
    let files = fs.readdirSync(rootPath);

    if (files) {
        files.forEach(fileName => {
            if (fileName.match(dirRegEx)) {
                let fileDir = path.join(rootPath, fileName);

                //根据文件路径获取文件信息，返回一个fs.Stats对象

                let status = fs.statSync(fileDir);
                if (status) {
                    let isFile = status.isFile();
                    let isDir = status.isDirectory();

                    if (isFile && fileDir.match(pathRegEx)) {

                        // 读取文件内容
                        // var content = fs.readFileSync(filedir, 'utf-8');
                        // console.log(content);

                        filePathArr.push(fileDir);
                    }

                    //递归，如果是文件夹，就继续遍历该文件夹下面的文件.
                    if (isDir) {
                        findPath(fileDir);
                    }
                }
            }
        });
    }
}

function filterData () {
    fs.readFile(filePathArr[0], 'utf-8', (err,data) => {
        console.log(data);
    });
}
