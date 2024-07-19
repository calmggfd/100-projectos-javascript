const   texarea =   document.querySelector("textarea"),
    voiceList   =   document.querySelector("select"),
    speechBtn   =   document.querySelector("button");

let synth   =   speechSynthesis,
    isSpeaking  =   true;

voices();

function    voices()    {
    for (let    voice   of  synth.getVoices())  {
        let select  =   voice.name  === "Google US  Enligh" ?   "selected"  :   "";
        let option  =   `<option    value=${voice.name}"    ${selected}>${voice.name}   (${voice.lang})</option>`;
        voiceList.insertAdjacentHTML("beforeend",   option);
    }
}

synth.addEventListener("voiceschanged", voices);

function    textToSpeech(text){
    let utterance   =   new SpeechSynthesisUtterance(text);
    for (let    voice   of  synth   .getVoices())   {
        if  (voice.name === voiceList.value)    {
            utterance.voice =   voice;
        }
    }
    synth.speak(utterance);
}

speechBtn.addEventListener("click", e  =>{
    e.preventDefault();
    if  (texarea.value  !== "") {
        // CHECK    IF  NOT SPEAKING,   SPEAK   TEXTAREA    TEXT
        if  (!synth.speaking) {
            textToSpeech(texarea.value);
        }
        // IF   TEXT    WAS LONG,   ADD RESUME  AND PAUSE   FUNCTION
        if  (texarea.value.length   >   80) {
            setInterval(() => {
               if(!synth.speaking   &&  !isSpeaking)    {
                isSpeaking  =   true;
                speechBtn.innerText =   "Convert    To  Speech";
               }    else    {}
            }, 500);
            if  (isSpeaking)    {
                synth.resume();
                isSpeaking  =   false;
                speechBtn.innerText =   "Resume Speech";
            }
        }   else    {
            speechBtn.innerText =   "Convert    To  Speech";
        }
    }
});