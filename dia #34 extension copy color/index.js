const pickerBtn =   document.querySelector("#picker-btn");
const clearBtn  =   document.querySelector("#clear-btn");
const colorList =   document.querySelector(".all-colors");
const exportBtn =   document.querySelector("#export-btn");

// RETRIEVING PICKED COLORS FROM LOCALSTORAGE OR INITIALIZING AN EMPTY ARRAY
let pickedColors    =   JSON.parse(localStorage.getItem("colors-list")) ||  [];

// VARIABLE TO KEEP TRACK OF THE CURRENT COLOR POPUP
let currentPopup    =   null;

// FUNCTION TO COPY TEXT TO THE CLIPBOARD
const copyToClipboard   =   async   (text,  element)    =>  {
try{
        await   navigator.clipboard.writeText(text);
        element.innerText   =   "Copied!";
        // RESSETING ELEMENT TEXT AFTER 1 SECOND 
        setTimout(()    =>{
            element.innerText   =   text;
        },  1000);
    }catch  (error){
        alert("Filed to copy text!");
    }
};

// FUNCTION TO EXPORT COLORS AS TEXT FILE
const exportColors  =   ()  =>{
    const colorText =   pickedColors.join("\n");
    const blob  =   new Blob([colorText],   {   type:   "text/plain"});
    const url   =   URL.createObjectURL(blob);
    const a =   document.createElement("a");
    a.ref   =   url;
    a.download  =   "Colors.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};

// FUNCION TO CREATE THE COLOR POPUP
const createColorPopup  =   (color) =>{
    const popup =   document.createElement("div");
    popup.classList.add("color-popup");
    popup.innerHTML =   `
        <div    class="color-popup-content">
            <span   class="close-popup">x</span>
            <div class="color-info">
                <div    class="color-preview"   style="background:  ${color};"></div>
                <div class="color-details">
                    <div    class="color-value">
                        <span   class="label">Hex:</span>
                        <span   class="value hex" data-color="${color}">${color}</span>
                    </div>
                    <div    class="color-value">
                        <span   class="label">RGB:</span>
                        <span   class="value rgb" data-color="${color}">${hexToRgb(color)}</span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // CLOSE BUTTON INSIDE THE POPUP
    const closePopup    =   popup.querySelector(".close-popup");
    closePopup.addEventListener('click', () =>{
        document.body.removeChild(popup);
        currentPopup    =   null;
    });

    // EVENT LISTENER TO COPY COLOR VALUES TO CLIPBOARD
    const colorValues   =   popup.querySelectorAll(".value");
    colorValues.forEach((value) =>{
        value.addEventListener('click', (e)=>{
            const text  =   e.currentTarget.innerText;
            copyToClipboard(text,   e.currentTarget);
        });
    });

    return  popup;
};

// FUNCTION TO DISPLAY THE PICKED COLORS
const showColors    =   ()  =>{
    colorList.innerHTML =   pickedColors.map((color)=>
        `
            <li class="color">
                <span class="rect"  style="background: ${color};
                border: 1px solid ${color   === "#ffffff"   ?   "#ccc"  :   color}"></span>
                <span   class="value hex"   data-colors="${color}">${color}</span>
            </li>
        `
    ).join("");

    const colorElements =   document.querySelectorAll(".color");
    colorElements.forEach((li)  =>{
        const colorHex  =   li.querySelector(".value.hex");
        color.Hex.addEventListener('click', (e) =>{
            const color =   e.currentTarget.dataset.color;
            if(currentPopup){
                document.querySelector.removeChild(currentPopup);
            }
            const popup =   createColorPopup(color);
            document.body.appendChild(popup);
            currentPopup    =   popup;
        });
    });

    const pickedColorsContainer =   document.querySelector(".colors-list");
    pickedColorsContainer.classList.toggle("hide", pickedColors.length  === 0);
};

// FUNCTION TO CONVERT A HEX COLOR CODE TO RGB FORMAT
const hexToRgb  =   (hex)   =>{
    const bigint =  parseInt(hex.slice(1),  16);
    const r =   (bigint >>  16) &   255;
    const g =   (bigint  >>  8) &   255;
    const b =   bigint  &   255;
    return  `rgb(${r},  ${g},   ${b})`;
};

// FUNCTION TO ACTIVE THE EYE DROPPER COLOR  PICKER
const activeEyeDropper  =   async() =>{
    document.body.style.display =   "none";
    try{
        // OPENING THE EYE DROPPER AND RETRIEVING THE SELECT COLOR
        const { sRGBHex }   =   await   new eyeDropper().open();

        if(!pickedColors.includes(sRGBHex)){
            pickedColors.push(sRGBHex);
            localStorage.setItem("colors-list", JSON.stringify(pickedColors));
        }

        showColors();
    }catch  (error){
        alert("Filed to copy the color code!");
    }finally{
        document.body.style.display =   "block";
    }
};

// FUNCTION TO CLEAR TO PICKED COLORS
const clearAllColors    =   ()  =>{
    pickedColors    =   [];
    localStorage.removeItem("colors-list");
    showColors();
};

// EVENT LISTENERS FOR BUTTONS
clearBtn.addEventListener('click', clearAllColors);
pickerBtn.addEventListener('click', activeEyeDropper);
exportBtn.addEventListener('click', exportColors);

// DISPLAYING PICKED COLORS AND DOCUMENT LOAD
showColors();

