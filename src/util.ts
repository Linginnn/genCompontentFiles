const fs = require("fs");

export const copyFile = function (src: string, dst: string, targtName: string) {
  let paths: [] = fs.readdirSync(src); //同步读取当前目录
  paths
    .filter((item: string) => !item.includes(".js"))
    .forEach(function (path: string) {
      const _src = src + "/" + path;
      let finalPath = path;
      if (path.includes("test")) {
        finalPath = path.replace("tpl", targtName.toLocaleLowerCase());
      } else if (path.includes("tpl")) {
        finalPath = path.replace("tpl", targtName);
      }
      const _dst = dst + "/" + finalPath;
      fs.stat(_src, function (err: any, stats: any) {
        //stats  该对象 包含文件属性
        if (err) {
          throw err;
        }
        if (stats.isFile()) {
          //如果是个文件则拷贝
          const data = fs.readFileSync(_src, "utf-8");
          const finalData = data.replaceAll("tpl", targtName);
          fs.writeFileSync(_dst, finalData);
        } else if (stats.isDirectory()) {
          //是目录则 递归
          checkDirectory(_src, _dst, targtName, copyFile);
        }
      });
    });
};
const checkDirectory = function (
  src: string,
  dst: string,
  targtName: string,
  callback: (src: string, dst: string, targtName: string) => void
) {
  fs.access(dst, fs.constants.F_OK, (err: any) => {
    if (err) {
      fs.mkdirSync(dst);
      callback(src, dst, targtName);
    } else {
      callback(src, dst, targtName);
    }
  });
};
