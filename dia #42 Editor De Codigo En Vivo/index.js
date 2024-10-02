// CATCHING COMMONLY USED ELEMENTS TO MINIMIZE DOM QUERIES
const livePreviewFrame = document.getElementById('live-preview');
const htmlEditor = document.getElementById('html');
const cssEditor = document.getElementById('css');
const jsEditor = document.getElementById('js');

// FUNCTION TO SET UP THE LIVE PREVIEW IFRAME AND INCLUDE NECESSARY  SCRIPTS

function initializeLivePreview() {
    livePreviewFrame.contentWindow.document.body.innerHTML = '';
    const styleElement = document.createElement('style');
    styleElement.setAttribute('id', 'live-preview-style');
    livePreviewFrame.contentWindow.document.head.appendChild(styleElement);

    const pagedJsScript = document.createElement('script');
    pagedJsScript.src = 'https://unpkg.com/pagedjs/dist/paged.legacy.polyfill.js';
    livePreviewFrame.contentWindow.document.head.appendChild(pagedJsScript);
}

// FUNCTION TO UPDATE THE LIVE  PREVIEW IFRAME  WITH THE HTML CODE FROM EDITOR

function updateLiveHTMLPreview(codeEditors){
    livePreviewFrame.contentWindow.document.body.innerHTML = codeEditors.html.getValue();
}

// FUNCTION TO UPDATE THE LIVE  PREVIEW IFRAME WITH THE CSS CODE FROM EDITOR 

function updateLiveCSSPreview(codeEditors){
    const styleElement = livePreviewFrame.contentWindow.document.getElementById('live-preview-style');
    styleElement.innerHTML = codeEditors.css.getValue();
}


// FUNCTION TO UPDATE THE LIVE  PREVIEW IFRAME WITH THE JS CODE FROM EDITOR 

function updateLiveJSPreview(codeEditors){
    const scriptElement = document.createElement('script');
    scriptElement.innerHTML = codeEditors.js.getValue();
    livePreviewFrame.contentWindow.document.body.appendChild(scriptElement);
}

// FUNCTION TO INITIALIZE CODEMIRROR EDITORS FOR HTML, CSS AND JAVASCRIPT

function initializeCodeEditors() {
    function getDefaultOptions(object){
        const defaultOptions = {
            lineNumbers: true,
            autoCloseTags: true,
            autoCloseBrackets: true,
            theme: 'panda-syntax'
        };
        if(object){
            const keys = Object.keys(object);
            for(const key of keys){
                defaultOptions[key] = object[key];
            }
        }
        return defaultOptions;
    }

    const codeEditors = {
        html: CodeMirror(htmlEditor, getDefaultOptions({
            mode: 'text/html',
            value: '',
        })),
        css: CodeMirror(cssEditor, getDefaultOptions({
            mode: 'css',
            value: '',
            extraKeys: { 'Ctrl-Space': 'autoComplete'},
            hintOptions: {
                completeSingle: false,
                closeOnUnfocus: false
            }
        })),
        js: CodeMirror(jsEditor, getDefaultOptions({
            mode: 'javascript',
            value: ''
        })),
    };
}