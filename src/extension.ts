// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as util from "./util";
import * as path from "path";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand(
    "gen-compontent-file.genCompontent",
    (uri) => {
      vscode.window
        .showInputBox({
          placeHolder: "请输入组件名", // 在输入框内的提示信息
          prompt: "输入组件名字，首字母大写", // 在输入框下方的提示信息
        })
        .then(function (msg) {
          util.copyFile(
            `${path.join(__dirname, "../")}public`,
            uri.fsPath,
            msg ?? "Compontent"
          );
        });
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
