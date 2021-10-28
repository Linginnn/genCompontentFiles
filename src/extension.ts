// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import * as util from "./util";
import * as comment from "./tpls/comment";
import * as path from "path";
import { typeList, typeListMap } from "./config";
import { Position } from "vscode";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

export function activate(context: vscode.ExtensionContext) {
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const genCompontent = vscode.commands.registerCommand(
    "gen-compontent-file.genCompontent",
    async (uri) => {
      const msg = await vscode.window.showInputBox({
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
      });
      const repeat = util.getFileRepeat(uri.fsPath, msg ?? "Compontent");
      const gen = async () => {
        // @ts-ignore
        const type: keyof typeof typeListMap =
          await vscode.window.showQuickPick(typeList, {
            placeHolder: "请选择组件所属类型",
          });
        if (!msg || !type) {
          return;
        }
        util.genFiles(path.join(__dirname, "tpls/tpl"), uri.fsPath, msg);
        util.genLocalesDir(uri.fsPath, msg);
        util.genExport(uri.fsPath, msg);

        setTimeout(() => {
          vscode.window.showInformationMessage(`生成${msg}文件夹成功`);
        }, 100);
        let terminal = vscode.window.createTerminal({
          name: `生成${msg}的MD文件`,
        });
        terminal.show(true);
        terminal.sendText(`yarn md:gen ${msg}`);
        util.appendDocument(uri.fsPath, msg, type || "通用");
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
    }
  );

  const genComment = vscode.commands.registerCommand(
    "gen-compontent-file.genComment",
    () => {
      //在光标位置插入字符串
      vscode.window
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
