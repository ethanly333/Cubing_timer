var seconds = 0 ;
var tens = 0 ;
var appendTens = document.getElementById("tens") ;
var appendSeconds = document.getElementById("seconds") ;
var Interval ;
var keyName ;
var isRunning = false ;
const solveList = document.getElementById("solveList") ;

const solveArr = solveList.getElementsByTagName("li") ;

var appendBestSolve = document.getElementById("bestSolve") ;
var bestSolve ;
var appendAvg = document.getElementById("avg") ;
var avg ;
var appendAo5 = document.getElementById("ao5") ;
var ao12 = document.getElementById("ao12") ;
var ao50 = document.getElementById("ao50") ;
var ao100 = document.getElementById("ao100") ;

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

function updateStats(time)
{
    if(solveArr.length == 1)
    {
        appendBestSolve.innerHTML = time ;
        bestSolve = parseFloat(time) ;
        appendAvg.innerHTML = time ;
        avg = parseFloat(time) ;
    }//end if
    else if(solveArr.length > 1)
    {
        if(parseFloat(time) < bestSolve)
        {
            bestSolve = parseFloat(time) ;
            appendBestSolve.innerHTML = time ;
        }//end if
        //avg = (avg+parseFloat(time))/solveArr.length ;
        var temp = 0 ;
        for(let i=0; i<solveArr.length; i++) 
        {
            temp+=parseFloat(solveArr[i].textContent) ;
        }//end for i

        avg = temp/solveArr.length ;

        appendAvg.innerHTML = avg.toFixed(2) ;
    }//end else if

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
        const li = document.createElement("li") ;
        const time = document.createElement("span") ;

        li.setAttribute("class", "solve") ;
        time.setAttribute("class", "time") ;

        time.innerHTML = `${seconds}.${tens}` ;
        li.append(time) ;
        solveList.prepend(li) ;

        updateStats(time.innerHTML) ;
    }

    else if(keyName  == "r")
    {
        clearInterval(Interval) ;
        tens = "00" ;
        seconds = "0" ;
        appendTens.innerHTML = tens ;
        appendSeconds.innerHTML = seconds ;
    }

    else if(keyName == "c")
    {
        while(solveList.firstChild)
            solveList.removeChild(solveList.firstChild) ;
        appendTens.innerHTML = "00" ;
        appendSeconds.innerHTML = "0" ;
        appendBestSolve.innerHTML = "--" ;
        appendAvg.innerHTML = "--" ;
    }
}, false) ;

