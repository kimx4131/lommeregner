

//Knapper på lommeregner som skal havde specilt tilføjet kode.
var decimalBtn = document.querySelector("#calc-decimal");
var clearBtn = document.querySelector("#calc-clear");
var backspaceBtn = document.querySelector("#calc-backspace");
var displayValElement = document.querySelector("#calc-display-val");

//Knapper på lommeregneren som skal kunne de samme og derfor er SelectorAll og i class'er istedet for id'er
var calcNumBtns = document.querySelectorAll(".calc-btn-num");
var calcOperatorBtns = document.querySelectorAll(".calc-btn-operator");


// variabler som bruges til udregning og nulstilling
var displayVal = "0"; //Denne sørger for at der kommer til at stå nul 0
var pendingVal; //Denne er til at sætte udregningerne ind i
var evalStringArray = []; //denne udregner hvad der er indtastet



// Denne funktion bliver kaldt når man klikker på en af knapperne med classen .calc-btn-num
function updateDisplayVal(clickObj){
    var btnText = clickObj.target.innerText;

    if(displayVal === "0"){
        displayVal = "";
    }

        displayVal += btnText;
        displayValElement.innerText = displayVal;
    
}

//laver event listener for alle calcNumBtns. Dette er istedet for at gøre det manuelt for hver enkel knap.
for(let i = 0; i < calcNumBtns.length; i++){
    calcNumBtns[i].addEventListener('click', updateDisplayVal, false); //Ved click på kanppen skal den køre funktionen updateDisplayVal.
}



//Denne funktion sættes igang når der bliver klikket på en af operatior knapperne. 
function performOperation(clickObj){
    var operator = clickObj.target.innerText; //Her henter den det element som er inden i knappen
    
    //her går den alle kanpperne igennem
    switch (operator){
        case "+": 
            pendingVal = displayVal; //vi gemmer det som vi har i displayVal over i pendingVal
            displayVal = "0"; //Her sætter den displayet til 0
            displayValElement.innerText = displayVal; //sætter display vinduet til displayval, så når man klikker på + så retter den display vinduet til 0
            evalStringArray.push(pendingVal); //her gemmer den det som vi har lagt over i pendinVal til arrayen
            evalStringArray.push('+');//tilføjer et + til arrayet.
            break;
        
        case "-": 
            pendingVal = displayVal;
            displayVal = "0";
            displayValElement.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('-');
            break;

        case "x": 
            pendingVal = displayVal;
            displayVal = "0";
            displayValElement.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('*');
            break;

        case "/": 
            pendingVal = displayVal;
            displayVal = "0";
            displayValElement.innerText = displayVal;
            evalStringArray.push(pendingVal);
            evalStringArray.push('/');
            break;

        case "=": 
            evalStringArray.push(displayVal);
            var evaluation = eval(evalStringArray.join(' ')); //['5', '+', '5'] '5 + 5'
            displayVal = evaluation + '';
            displayValElement.innerText = displayVal;
            evalStringArray = [];
            break;

        default: 
            break;
    }
}

//Denne tiltøjer en Eventlisterner som lytter på klik til alle operator knapperne.
for(let i = 0; i < calcOperatorBtns.length; i++){
    calcOperatorBtns[i].addEventListener('click', performOperation, false);
}



//Denne funktion gør at når man klikker på claer knappen, så ryder man det som der står. 
clearBtn.onclick = function() {
    displayVal = '0'; //Sætter displayval til 0
    pendingVal = undefined; //ryder pendingval
    evalStringArray = []; //ryder arrayen
    displayValElement.innerHTML = displayVal; //ryder det som står i display
    
}

//Denne funktion sættes igang når man klikker på slet knappen
backspaceBtn.onclick = function(){
    let lengthOfDisplayVal = displayVal.length; //gemmer længtden af display vinduet til en variabel
    displayVal = displayVal.slice(0, lengthOfDisplayVal-1); //her skære den det sidste af tegnet væk

    //Her siger den hvis displayet er tøm skal den skrive 0. Så vis man hele tiden klikker på slet, så vil der kommer til at stå 0 og ikke være tomt
    if(displayVal ===""){
        displayVal = "0";
    }
    displayValElement.innerText = displayVal; //her skriver den det skærede tal ud i displayet.
    
}

//Denne funktion gøre når man klikker på decimal knappen.
decimalBtn.onclick = function(){
    if(!displayVal.includes('.')){ //Her kigger den på om her iforvejen er et "." i displayet. Hvis der IKKE er det så gør den følgende
    displayVal += '.'; //så sætter den et "."
    }
    displayValElement.innerText = displayVal;
    
}
