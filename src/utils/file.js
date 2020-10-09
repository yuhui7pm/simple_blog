/*
 * @Descripttion: 
 * @version: 1.0
 * @Author: yuhui
 * @Date: 2020-10-05 22:56:52
 * @LastEditors: yuhui
 * @LastEditTime: 2020-10-06 21:10:25
 */
 
const FileSaver = require('file-saver');

function readFile(filePath){
	fs.readFile(filePath,'utf-8', (err,data)=>{
		if(err){
			console.log(err);
			return;
		}
		console.log(data);
	})
}

function writeFile(filePath, content){
  let blob = new Blob(content, {type: "text/plain;charset=utf-8"});
  FileSaver.saveAs(blob, filePath);
}

module.exports = {
  readFile,
  writeFile
}