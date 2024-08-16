const preview   =   document.getElementById("preview"),
      styles    =   document.getElementById("styles"),
      ranges    =   document.querySelectorAll(".settings input"),
      copyButton    =   document.getElementById("copy-styles");

// ADD EVENT LISTENER TO EACH RANGE INPUT
ranges.forEach((slider) =>{
    slider.addEventListener("input",    generateStyles);
});

// FUNCTION TO GENERATE AND UPDATE STYLES
function generateStyles(){
    const xShadow   =   document.getElementById("x-shadow").value;
    const yShadow   =   document.getElementById("y-shadow").value;
    const blurRadius   =   document.getElementById("blur-r").value;
    const spreadRadius   =   document.getElementById("spread-r").value;
    const shadowColor   =   document.getElementById("shadow-color").value;
    const shadowOpacity   =   document.getElementById("shadow-opacity").value;
    const shadowInset   =   document.getElementById("inset-shadow").checked;
    const borderRadius   =   document.getElementById("border-r").value;

    // CREATE THE BOX SHADOW CSS PROPERTIES  VALUE
    const boxShadow =   `${shadowInset ?   "inset " : ""}   ${xShadow}px  ${yShadow}px    ${blurRadius}px ${spreadRadius}px ${hexToRgba(shadowColor,  shadowOpacity)}`;

    // UPDATE THE PREVIEW ELEMENT STYLES
    preview.style.boxShadow =   boxShadow;
    preview.style.borderRadius  =   `${borderRadius}px`;

    // UPDATE TEXTARE WITH GENERATE STYLES
    styles.textContent  =   `box-shadow:    ${boxShadow};\nborder-radius: ${borderRadius}px;`;
    
}

// FUNCTION TO CONVERT HEX COLOR AND OPACITY TO RGBA FORMAT
function hexToRgba(shadowColor, shadowOpacity){
    const r =   parseInt(shadowColor.substr(1,  2), 16);
    const g =   parseInt(shadowColor.substr(3,  2), 16);
    const b =   parseInt(shadowColor.substr(5,  2), 16);

    return  `rgba(${r}, ${g}, ${b}, ${shadowOpacity})`;
}

// FUNCTION TO COPY THE GENERATED STYLES
function    copyStyles(){
    styles.select();
    document.execCommand("copy");
    copyButton.innerHTML    =   "Copied!";
    setTimeout(() => {
        copyButton.innerText    =   "Copy Styles";
    }, 500);
}
generateStyles();