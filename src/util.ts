import path = require("path");

const fs = require("fs");
const LOCALES = "mdLocales";

export const genFiles = function (
  src: string,
  dst: string,
  targtName: string,
  endWith: string = "tpl"
) {
  try {
    const targetPath = path.join(dst, targtName);
    fs.mkdirSync(targetPath);
    copyFile(src, targetPath, targtName, endWith);
  } catch (error) {
    return error;
  }
};

export const copyFile = function (
  src: string,
  dst: string,
  targtName: string,
  endWith: string = "tpl"
) {
  let paths: [] = fs.readdirSync(src); //同步读取当前目录
  paths
    .filter((item: string) => {
      return !item.includes(".js");
    })
    .forEach(function (itemPath: string) {
      const _src = path.join(src, itemPath);
      const lowTargtName = targtName.toLocaleLowerCase();
      let finalPath = itemPath;
      if (itemPath.includes(".test")) {
        finalPath = itemPath.replace(endWith, lowTargtName);
        // 排除md文件和 替换模版字符串
        // } else if (itemPath.includes(endWith) && !itemPath.includes(".md")) {
        //   finalPath = itemPath.replace(endWith, lowTargtName);
      }
      const _dst = path.join(dst, finalPath);
      fs.stat(_src, function (err: any, stats: any) {
        //stats  该对象 包含文件属性
        if (err) {
          return err;
        }
        if (stats.isFile()) {
          //如果是个文件则拷贝
          const data = fs.readFileSync(_src, "utf-8");
          let finalData = "";
          if (itemPath.includes("tpl.md")) {
            finalData = data
              .replaceAll(endWith, lowTargtName)
              .replaceAll("Bpl", targtName);
          } else {
            finalData = data.replaceAll(
              endWith,
              itemPath.includes(".less") ? lowTargtName : targtName
            );
          }

          fs.writeFileSync(_dst, finalData);
        } else if (stats.isDirectory()) {
          //是目录则
          fs.mkdirSync(_dst);
          copyFile(_src, _dst, targtName);
        }
      });
    });
};

export const genLocalesDir = function (fsPath: string, name: string) {
  const lowName = name.toLocaleLowerCase();
  try {
    const data: string = fs.readFileSync(
      path.join(__dirname, "/tpls/locale.ts"),
      "utf-8"
    );
    fs.mkdir(path.join(fsPath, "../", LOCALES, lowName), (err: any) => {
      if (err) {
        return err;
      }
      ["zh-CN", "en-US"].forEach((item) => {
        fs.writeFileSync(
          path.join(fsPath, "../", LOCALES, lowName, `${item}.ts`),
          data.replace("locale", lowName)
        );
      });
    });
  } catch (error) {
    return error;
  }
};

export const genExport = function (fsPath: string, name: string) {
  if (!fsPath.includes("src")) {
    return;
  }
  const targetPath = path.join(fsPath.split("src")[0], "src", "index.ts");
  try {
    const data: string = fs.readFileSync(targetPath, "utf-8");
    if (data && !data.includes(name)) {
      fs.appendFile(
        targetPath,
        `export { default as ${name} } from './components/${name}';`,
        "utf-8",
        (err: any) => {
          console.log(err);
        }
      );
    }
  } catch (error) {
    return error;
  }
};

export const getFileRepeat = function (fsPath: string, name: string) {
  let paths: [] = fs.readdirSync(fsPath); //同步读取当前目录
  return !!paths.find((item) => item === name);
};
