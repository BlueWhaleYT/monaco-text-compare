require.config({
    paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.35.0/min/vs"
    }
});
require(["vs/editor/editor.main"], () => {
    var originalModel = monaco.editor.createModel("", "plaintext");
    var modifiedModel = monaco.editor.createModel("", "plaintext");

    var diffEditor = monaco.editor.createDiffEditor(
        document.getElementById("diff-editor"), {
            originalEditable: true,
            fontSize: "20px",
        }
    );
    diffEditor.setModel({
        original: originalModel,
        modified: modifiedModel
    });

    diffEditor.updateOptions({
        theme: 'vs-dark'
    });

    document.querySelector(".inline-it").addEventListener("change", (e) => {
        diffEditor.updateOptions({
            renderSideBySide: !e.target.checked
        });
    });
});