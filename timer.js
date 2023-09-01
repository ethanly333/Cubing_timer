var seconds = 0 ;
var tens = 0 ;
var appendTens = document.getElementById("tens") ;
var appendSeconds = document.getElementById("seconds") ;
var Interval ;
var keyName ;
var isRunning = false ;

var modal = document.querySelector(".modal") ;
var overlay = document.querySelector(".overlay") ;
const closeModalBtn = document.querySelector(".closeBtn") ;
const openModalBtn = document.querySelector(".cmdBtn")

const openModal = function() {
    modal.classList.remove("hidden") ;
    overlay.classList.remove("hidden") ; 
} ;

const closeModal = function() {
    modal.classList.add("hidden") ;
    overlay.classList.add("hidden") ;
} ;

closeModalBtn.addEventListener("click", closeModal) ;
openModalBtn.addEventListener("click", openModal) ;
overlay.addEventListener("click", closeModal) ;

function startTimer() 
{
    tens++ ;
    if(tens<9)
        appendTens.innerHTML = "0" + tens ;
    if(tens>9)
        appendTens.innerHTML = tens ;
    if(tens>99)
    {
        seconds++ ;
        appendSeconds.innerHTML = seconds ;
        tens = 0 ;
        appendTens.innerHTML = "00" ;
    }
    if(seconds>9)
        appendSeconds.innerHTML = seconds ;
}



document.addEventListener('keydown', (event) => {
    var keyDown = event.key ;
    const timer = document.getElementById("timer") ;

    if(keyDown == " ")
    {
        timer.style.color = '#EDCC0C' ;
    }
}, false) ;

document.addEventListener('keyup', (event) => {
    keyName = event.key ;
    //alert(`Key pressed ${keyName}\n`) ;
    const timer = document.getElementById("timer") ;
    if(keyName == " " && !isRunning)
    {
        clearInterval(Interval) ;
        tens = "00" ;
        seconds = "0" ;
        appendTens.innerHTML = tens ;
        appendSeconds.innerHTML = seconds ;

        isRunning = true ;
        clearInterval(Interval) ;
        Interval = setInterval(startTimer, 10) ;
    }

    else if(keyName == " " && isRunning) 
    {
        timer.style.color = "white" ;
        isRunning = false ;
        clearInterval(Interval) ;
    }

    else if(keyName  == "r")
    {
        clearInterval(Interval) ;
        tens = "00" ;
        seconds = "0" ;
        appendTens.innerHTML = tens ;
        appendSeconds.innerHTML = seconds ;
    }
}, false) ;

