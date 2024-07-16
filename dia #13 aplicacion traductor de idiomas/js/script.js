const   fromText    =   document.querySelector(".from-text");
const   toText  =   document.querySelector(".to-text");
const   exchangeIcon  =   document.querySelector(".exchange");
const   selectTag  =   document.querySelectorAll("select");
const   icon  =   document.querySelectorAll(".row i");
const   translateBtn  =   document.querySelector("button");

// Add  Countries   Width   Country Code    To  Select  Tag
selectTag.forEach((tag, id) =>{
    for(let country_code    in  countries){
        let selected    =   id  ==  0   ?   country_code    ==  "en-GB" ?   "selected"  :   ""  :   country_code    ==  "de-DE" ?   "selected"  :   "";
        let option  =   `<option    ${selected} value="${country_code}">${countries[country_code]}</option>`;
        tag.insertAdjacentHTML("beforeend", option);
    }
});

// Function To  Change  regiones    cuando cambien al click del icono
exchangeIcon.addEventListener("click",  ()=>{
    let tempText    =   fromText.value,
        tempLang    =   selectTag[0].value;
    fromText.value  =   toText.value;
    toText.value    =   tempText;
    selectTag[0].value  =   selectTag[1].value;
    selectTag[0].value  =   tempLang;
});

fromText.addEventListener("keyup",  ()=>{
    if(!fromText.value) {
        toText.value    =   "";
    }
});

// Tranlate Button  Click   Events
translateBtn.addEventListener("click",  ()=>{
    let text    =   fromText.value.trim(),
        translateFrom   =   selectTag[0].value;
        translateTo =   selectTag[1].value;
    if  (!text) return; // no hace nada cuando el  input is empty
    toText.setAttribute("placeholder",  "Translating...");
    // Adding   Api
    let apiUrl  =   `https://api.mymemory.translated.net/get?q=${text}&langpair=${translateFrom}|${translateTo}`;
    fetch(apiUrl).then(res  =>  res.json()).then(data   =>{
        toText.value    =   data.responseData.translatedText;
        data.matches.forEach(data   =>{
            if(data.id  ==  0){
                toText.value    =   data.translation;
            }
        });
        toText.setAttribute("placeholder",  "Translation");
    });
});

icon.forEach(icon =>{
    icon.addEventListener("click", ({target})=>{
        if(!fromText.value  ||  !toText.value)  return;
        // Copy To  Clipboard   Events
        if(target.classList.contains("fa-copy")){
            if(target.id    ==  "from"){
                navigator.clipboard.writeText(fromText.value);
            }else{
                navigator.clipboard.writeText(toText.value);
            }
        }else{
            // Text To  Speech  Events
            let utterance;
            if(target.id    ==  "from"){
                utterance   =   new SpeechSynthesisUtterance(fromText.value);
                utterance.lang  =   selectTag[0].value;
            }else{
                utterance   =   new SpeechSynthesisUtterance(toText.value);
                utterance.lang  =   selectTag[1].value;
            }
            speechSynthesis.speak(utterance);
        }
    });
});