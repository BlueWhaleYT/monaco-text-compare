const text1 = "Sample text for diffing";
const text2 = "Samp1e text for dlffing";

let language = localStorage.getItem("language") === "plaintext" ;
let inline = localStorage.getItem("inline") === "true";
let lightTheme = localStorage.getItem("lightTheme") === "true";

require.config({
    paths: {
        vs: "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.35.0/min/vs"
    }
});
require(["vs/editor/editor.main"], () => {
    var originalModel = monaco.editor.createModel(text1, language);
    var modifiedModel = monaco.editor.createModel(text2, language);

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
        theme: lightTheme ? 'vs-light' : 'vs-dark',
        renderSideBySide: !inline
    });

    onCheckedChange("#inline", (e) => {
        inline = e.target.checked;
        diffEditor.updateOptions({
            renderSideBySide: !inline
        });
        localStorage.setItem("inline", inline);
    });

    onCheckedChange("#light-theme", (e) => {
        lightTheme = e.target.checked;
        diffEditor.updateOptions({
            theme: lightTheme ? 'vs-light' : 'vs-dark'
        });
        document.body.style.backgroundColor = lightTheme ? 'white' : 'black';
        localStorage.setItem("lightTheme", lightTheme);
    });

    onCheckedChange("#language", (e) => {
        language = e.target.value;
        localStorage.setItem("language", language);
        monaco.editor.setModelLanguage(originalModel, language);
        monaco.editor.setModelLanguage(modifiedModel, language);
    })

    document.querySelector('#language').value = language
    document.querySelector("#inline").checked = inline;
    document.querySelector("#light-theme").checked = lightTheme;
});

function onCheckedChange(target, callback) {
    document.querySelector(target).addEventListener("change", (e) => {
        callback(e)
    });
}