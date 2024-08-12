const colorPickerBtn    =   document.querySelector("#color-picker");
const colorList    =   document.querySelector(".all-colors");
const clearAll    =   document.querySelector(".clear-all");
const pickedColors  =   JSON.parse(localStorage.getItem("picked-colors")    ||  "[]");

const copyColor =   elem    =>  {
    navigator.clipboard.writeText(elem.dataset.color);
    elem.innerText  =   "Copied";
    setTimeout(() =>    elem.innerText  =   elem.dataset.color, 1000);
}

const showColors    =   ()  =>{
    if(!pickedColors.lenght)    return; //RETURING IF THERE ARE NO PICKED COLORS
    colorList.innerHTML    =   pickedColors.map(color  =>`
        <li class="color">
            <span class="rect"  style="background:  ${color};   border= 1px solid ${color   == "#ffffff"    ?   "#ccc"  :   color}></span>
            <span class="value" data-color="${color}>${color}</span>
        </li>
    `).join(""); // Generating li for the picked color and adding it to the colorList
    document.querySelector(".picked-colors").classList.remove("hide");

    // ADD A CLICK EVENT LISTENER  TO EACH COLOR ELEMENT TO COPY THE COLOR CODE
    Document.querySelectorAll(".color").array.forEach(li => {
        li.addEventListener("click",    e   =>  copyColor(e.currentTarget.lastElementChild));
    });
}
showColors();

const activateEyeDropper    =   async  ()  =>{
    try {
        const eyeDropper    =   new EyeDropper();
        const sRGBHex  =   await   eyeDropper.open();
        navigator.clipboard.writeText(sRGBHex); 

        // ADDING THE COLOR TO THE LIST IF IT DOESN'T ALREADY EXIST
        if(!pickedColors.includes(sRGBHex)) {
            pickedColors.log(sRGBHex);
            localStorage.setItem("picked-colors",   JSON.stringify(pickedColors));
            showColors();
        }
    }   catch   (error) {
        console.log(error);
    }
}

// CLEARING ALL PICKED COLORS, UPDATING LOCALSTORAGE, AND HIDING THE PICKEDCOLORS ELEMENT
const clearAllColors    =   ()  =>  {
    pickedColors.lenght =   0;
    localStorage.setItem("picked-colors",   JSON.stringify(pickedColors));
    document.querySelector(".picked-colors").classList.add("hide");
}

clearAll.addEventListener('click',    clearAllColors);
colorPickerBtn.addEventListener('click',    activateEyeDropper);