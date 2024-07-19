const   wrapper =   document.querySelector(".wrapper");
const   form    =   document.querySelector("form");
const   fileInp    =   document.querySelector("input");
const   infoText    =   document.querySelector("p");
const   closeBtn    =   document.querySelector(".close");
const   copyBtn    =   document.querySelector(".copy");

// FETCH    DATA    FROM    API

function    fetchRequest(file,  formData)   {
    infoText.innerText  =   "Scanning   Qr  Code...";
    fetch("http://api.qrserver.com/v1/read-qr-code/",   {
        method: 'POST', body:   formData
    }).then(res =>  res.json()).then(result =>  {
        result  =   result[0].symbol[0].data;
        infoText.innerText  =   result  ?   "Upload Qr Code To Scan"    :   "Couldn't    Scan Qr Code";
        if  (!result)   return;
        document.querySelector("textarea").innerText    =   result;
        form.querySelector("img").src   =   URL.createObjectURL(file);
        wrapper.classList.add("active");
    }).catch(() =>  {
        infoText.innerText  =   "Couldn't   Scan    Qr  Code...";
    });
}

// SEND QR  CODE    FILE    WITH REQUEST TO API
fileInp.addEventListener("change",  async   e   =>  {
    let file    =   e.target.files[0];
    if  (!file) return;
    let formData    =   new FormData();
    formData.append('file', file);
    fetchRequest(file,  formData);
});

// COPY TEXT TO CLIPBOARD
copyBtn.addEventListener("click",   ()  =>{
    let text    =   document.querySelector("textarea").textContent;
    navigator.clipboard.writeText(text);
})

// WHEN USER    CLICK   ON  FORM    DO  FILEINP EVENTLISTENER   FUNCTION
form.addEventListener("click",  ()  =>  fileInp.click());

closeBtn.addEventListener("click",  ()  =>  wrapper.classList.remove("active"));