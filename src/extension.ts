import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand('vs-code-gen-mongo-id.generateIdAtCursor', () => {
		const editor = vscode.window.activeTextEditor;

        if (editor) {
            const document = editor.document;
            editor.edit(editBuilder => {
                editor.selections.forEach(s => {
                    const range = s.isEmpty ? document.getWordRangeAtPosition(s.start) || s : s;
                    editBuilder.replace(range, mongoObjectId());
                });
            });
        }
	});

	context.subscriptions.push(disposable);
}

export function deactivate() {}

// Taken from Solenoid: https://gist.github.com/solenoid/1372386
const mongoObjectId = function () {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    return timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function() {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
};