// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as util from "./util";
import { Position } from "vscode";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
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
            return "输入组件名字，首字母大写";
          },
        })
        .then((msg) => {
          util.copyFile(`${__dirname}/tpls`, uri.fsPath, msg ?? "Compontent");
        });
    }
  );

  const genComment = vscode.commands.registerCommand(
    "gen-compontent-file.genComment",
    () => {
      vscode.window.activeTextEditor?.edit((editBuilder) => {
        //获取光标位置
        const position = new Position(
          vscode.window.activeTextEditor?.selection.active.line || 1,
          vscode.window.activeTextEditor?.selection.active.character || 1
        );
        //在光标位置插入字符串
        editBuilder.insert(position, "width:...");
      });
    }
  );
  context.subscriptions.push(genComment);
  context.subscriptions.push(genCompontent);
}

// this method is called when your extension is deactivated
export function deactivate() {}
