// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as util from "./util";
import * as comment from "./tpls/comment";
import { Position } from "vscode";
import path = require("path");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

const tpl = (type: string | undefined) => `
  /**
   * @required 
   * @description.zh-CN
   * @description.en-US
   * @type
   */
  ${type}:`;

export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const genCompontent = vscode.commands.registerCommand(
    "gen-compontent-file.genCompontent",
    (uri) => {
      vscode.window
        .showInputBox({
          placeHolder: "请输入组件名", // 在输入框内的提示信息
          prompt: "输入组件名字，首字母大写", // 在输入框下方的提示信息
          validateInput: (text) => {
            if (/^[A-Z][A-z0-9]*$/.test(text)) {
              return;
            }
            if (!text) {
              return "组件名字为必填";
            }
            return "输入组件名字，首字母大写";
          },
        })
        .then((msg) => {
          const repeat = util.getFileRepeat(uri.fsPath, msg ?? "Compontent");
          const gen = () => {
            if (!msg) {
              return;
            }
            util.genFiles(path.join(__dirname, "tpls/tpl"), uri.fsPath, msg);
            util.genLocalesDir(uri.fsPath, msg);
            setTimeout(() => {
              vscode.window.showInformationMessage(`生成${msg}文件夹成功`);
            }, 10);
          };
          if (repeat) {
            vscode.window
              .showInformationMessage(
                `${msg}组件已存在,是否继续创建`,
                { modal: true },
                "是"
              )
              .then((pick) => {
                if (pick === "是") {
                  gen();
                }
              });
          } else {
            gen();
          }
        });
    }
  );

  const genComment = vscode.commands.registerCommand(
    "gen-compontent-file.genComment",
    () => {
      //在光标位置插入字符串
      const msg = vscode.window
        .showInputBox({
          placeHolder: "请输入属性", // 在输入框内的提示信息
          prompt: "请输入属性", // 在输入框下方的提示信息
        })
        .then((msg) => {
          vscode.window.activeTextEditor?.edit((editBuilder) => {
            //获取光标位置
            const position = new Position(
              vscode.window.activeTextEditor?.selection.active.line || 1,
              vscode.window.activeTextEditor?.selection.active.character || 1
            );
            editBuilder.insert(position, comment.tpl(msg));
          });
        });
    }
  );
  context.subscriptions.push(genComment);
  context.subscriptions.push(genCompontent);
}

// this method is called when your extension is deactivated
export function deactivate() {}
