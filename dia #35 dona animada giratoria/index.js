(function   ()  {
    var preTag  =   document.getElementById("donut");

    // ANGLES,  RADIUS  AND CONTANTS
    var A   =   1;
    var B   =   1;
    var R1  =   1;
    var R2  =   2;
    var K1  =   150;
    var K2  =   5;

    // FUNCTION TO RENDER ASCII FRAME
    function    renderAsciiFrame(){
        var b   =   []; // ARRAY TO STAY ASCII CHARS
        var z   =   []; //  ARRAY TO STORE DEPTH VALUES

        var width   =   380;    // WIDTH OF FRAME
        var height  =   160;    // HEIGHT OF FRAME

        A +=    0.05;    // INCREMENT ANGLE A
        B +=    0.03;   // INCREMENT ANGLE B
        // SIN AND COSINE OF ANGLES
        var cA  =   Math.cos(A),
            sA  =   Math.sin(A),
            cB  =   Math.cos(B),
            sB  =   Math.sin(B);

        // INITIALIZE ARRAYS WITH DEFAULT ANGLES
        for(var k   =   0;  k   <   width   *   height; k++){
            // SET DEFAULT ASCII CHAR
            b[k]    =   k   %   width   ==  width    -   1   ?   '\n'   :   ' ';
            // SET DEFAULT DEPTH
            z[k]    =   0;
        }

        // GENERATE THE ASCII FRAME
        for (var j  =   0;  j   <   6.28;   j+=0.07){
            var ct  =   Math.cos(j); // COSINE OF J
            var st  =   Math.sin(j); // SIN OF J

            for (var i  =   0;  i   <   6.28;   i   +=  0.02){
                var sp  =   Math.sin(i);    // SIN OF I
                    cp  =   Math.cos(i),    // COSINE OF I
                    h =  ct + 2,    //  HEIGHT CALCULATION
                    // DISTANCE CALCUTATION
                    D   =   1   /   (sp *   h   * sA    + st    * cA    + 5),
                    t   =   sp  *   h   *   cA  -   st  * sA;

                // CALCULATE CORDINATES OF ASCII CHAR
                var x   =   Math.floor(width    /   2   +   (width  /   4)  *   D   *   (cp * h * cB    -   t   *   sB));
                var y   =   Math.floor(height    /   2   +   (height  /   4)  *   D   *   (cp * h * sB    +   t   *   cB));

                // CALCULATE  THE INDEX IN THE ARRAY
                var o     =   x   +   width   *   y;
                // CALCULATE THE ASCII CHAR INDEX
                var N   =   Math.floor(8    *   ((st    *   sA  -   sp  *   ct  *   cA) *   cB  -   sp  *   ct  *   sA  -   st  * cA    -   cp *    ct  *   sB));

                // UPDATE ASCII  CHAR AND DEPTH  IF CONDITIONS ARE MET
                if(y    <   height  && y    >=  0   && x    >= 0    &&  x   <   width   &&  D   >   z[o]){
                    z[o]    =   D;
                    // UPDATE ASCII CHAR BASED  ON THE INDEX
                    b[o]    =   '.,-~:;=!*#%@'  [N  > 0 ?   N   :   0];
                }
            }
        }

        // UPDATE HTML ELEMENT WITH THE ASCII FRAME
        preTag.innerHTML    =   b.join('');
    }

    // FUNCTION TO START THE ANIMATION
    function startAsciiAnimation(){
        // START IT BY CALLING RENDERASCIIANIMATION EVERY 50MS
        window.asciiIntervalId  =   setInterval(renderAsciiFrame,   50);
    }

    renderAsciiFrame(); // RENDER THE INITIAL ASCII FRAME
    // ADD EVEN LISTENER TO START ANIMATION WHEN PAGE IS LOADED
    if(document.all){
        // FOR OLDER VERSION OF INTERNET EXPLORER
            window.attachEvent('onload',    startAsciiAnimation);
    }else{
        // FOR MODERN BROWSER
        window.addEventListener('load', startAsciiAnimation,    false);
    }

    // ADD EVENT LISTENER TO UPDATE ASCII FRAME WHEN WINDOW RESIZED
    window.addEventListener('resize',   renderAsciiFrame);
})();   