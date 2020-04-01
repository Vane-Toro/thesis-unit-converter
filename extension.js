// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require('vscode');

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {

  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "thesis-unit-converter" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerCommand('extension.pxToThesisUnit', () => {
    // The code you place here will be executed every time your command is executed
    const editor = vscode.window.activeTextEditor;
    const regex = /^-?\d*px/
    const position = editor.document.getWordRangeAtPosition(editor.selection.active, regex)
    let selection;
    let selectTmp;
    if (!position) {
      vscode.window.showInformationMessage(`Not a a valid selection`);
      return
    } else {
      const start = position.start
      const end = position.end
      selection = new vscode.Selection(start.line, start.character, end.line, end.character)
      selectTmp = editor.document.getText(selection)

      let n;

      n = Number(selectTmp.slice(0, -2))
      if (typeof n === "number") {
        if (n % 8 === 0) {
          n = `s(${n / 8})`
        } else if ((n <= Math.abs(20)) && n % 4 === 0) {
          n = `s(${n / 8})`
        } else {
          let num = n / 16
          n = `${+num.toFixed(3)}rem`
        }
      }
      editor.edit(edit => {
        edit.replace(selection, n)
      })
    }

  });
  disposable = vscode.commands.registerCommand('extension.pxToRem', () => {
    // The code you place here will be executed every time your command is executed
    const editor = vscode.window.activeTextEditor;
    const regex = /^-?\d*px/
    const position = editor.document.getWordRangeAtPosition(editor.selection.active, regex)

    if (!position) {
      vscode.window.showInformationMessage(`Not a a valid selection`);
    } else {
      const start = position.start
      const end = position.end
      const selection = new vscode.Selection(start.line, start.character, end.line, end.character)
      const selectTmp = editor.document.getText(selection)
      let n;
      n = Number(selectTmp.slice(0, -2))

      let num = n / 16
      n = `${+num.toFixed(3)}rem`
      editor.edit(edit => {
        edit.replace(selection, n)
      })
    }

  });

  context.subscriptions.push(disposable);
}
exports.activate = activate;


// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
  activate,
  deactivate
}
