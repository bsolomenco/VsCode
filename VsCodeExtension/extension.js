const vscode = require('vscode');
const fs = require('fs');
const path = require('path');

let selectedDir = '';

// Serialize clipboard access so that two inputs resolved back to back (path and name) never overwrite each other's clipboard contents.
let queue = Promise.resolve();
function getSelectedDir() {
  const job = queue.then(async () => {
    const previous = await vscode.env.clipboard.readText();
    try {
      await vscode.commands.executeCommand('copyFilePath');// Copies the path of the Explorer selection (or the active editor's file)
      let p = (await vscode.env.clipboard.readText()).trim();
      if (!p) throw new Error('No folder selected');
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        p = path.dirname(p);
      }
      return p;
    } finally {
      await vscode.env.clipboard.writeText(previous);
    }
  });
  queue = job.catch(() => {});
  return job;
}

function activate(context) {
  context.subscriptions.push(
    // For tasks.json: ${input:...} of type "command"
    vscode.commands.registerCommand('selectedDir.path', () => getSelectedDir()),

    vscode.commands.registerCommand('selectedDir.name', async () =>
      path.basename(await getSelectedDir())
    ),

    // Explorer context menu entry: opens the task picker
    vscode.commands.registerCommand('selectedDir.run', () =>
      vscode.commands.executeCommand('workbench.action.tasks.runTask')
    )
  );
}

function deactivate() {}

module.exports = { activate, deactivate };