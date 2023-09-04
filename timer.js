var seconds = 0 ;
var tens = 0 ;
var appendTens = document.getElementById("tens") ;
var appendSeconds = document.getElementById("seconds") ;
var Interval ;
var keyName ;
var isRunning = false ;
const solveList = document.getElementById("solveList") ;
const solveArr = solveList.getElementsByTagName("li") ;

/* All statistic variables */
var appendBestSolve = document.getElementById("bestSolve") ;
var bestSolve ;
var appendAvg = document.getElementById("avg") ;
var avg ;
var appendAo5 = document.getElementById("ao5") ;
var ao5 ;
var appendAo12 = document.getElementById("ao12") ;
var ao12 ;
var appendAo50 = document.getElementById("ao50") ;
var ao50 ;
var appendAo100 = document.getElementById("ao100") ;
var ao100 ;

/* Modal Variables */
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
    }//end if
    if(seconds>9)
        appendSeconds.innerHTML = seconds ;
}//end startTimer

function updateStats(time)
{
    if(solveArr.length == 1)
    {
        appendBestSolve.innerHTML = time ;
        bestSolve = parseFloat(time) ;
        appendAvg.innerHTML = time ;
        avg = parseFloat(time) ;
    }//end if

    /* Best Solve and Avg Statistic */
    if(solveArr.length > 1)
    {
        if(parseFloat(time) < bestSolve)
        {
            bestSolve = parseFloat(time) ;
            appendBestSolve.innerHTML = time ;
        }//end if

        var avgtemp = 0 ;
        for(let i=0; i<solveArr.length; i++) 
        {
            avgtemp += parseFloat(solveArr[i].textContent) ;
        }//end for i

        avg = avgtemp/solveArr.length ;
        appendAvg.innerHTML = avg.toFixed(2) ;
    }//end else if

    /* Ao5 Statistic */
    if(solveArr.length >= 5)
    {
        var ao5temp = 0 ;
        for(let i=0; i<5; i++)
        {
            ao5temp += parseFloat(solveArr[i].textContent) ;
        }//end for i

        ao5 = ao5temp/5 ;
        appendAo5.innerHTML = ao5.toFixed(2) ;
    }//end if

    /* Ao12 Statistic */
    if(solveArr.length >= 12)
    {
        var ao12temp = 0 ;
        for(let i=0; i<12; i++)
        {
            ao12temp += parseFloat(solveArr[i].textContent) ;
        }//end for i

        ao12 = ao12temp/12 ;
        appendAo12.innerHTML = ao12.toFixed(2) ;
    }//end if

    /* Ao50 Statistic */
    if(solveArr.length >= 50)
    {
        var ao50temp = 0 ;
        for(let i=0; i<50; i++)
        {
            ao50temp += parseFloat(solveArr[i].textContent) ;
        }//end for i

        ao50 = ao50temp/50 ;
        appendAo50.innerHTML = ao50.toFixed(2) ;
    }//end if

    /* Ao100 Statistic */
    if(solveArr.length >= 100)
    {
        var ao100temp = 0 ;
        for(let i=0; i<100; i++)
        {
            ao100temp += parseFloat(solveArr[i].textContent) ;
        }//end for i

        ao100 = ao100temp/100 ;
        appendAo100.innerHTML = ao100.toFixed(2) ;
    }//end if
}//end update Stats

document.addEventListener('keydown', (event) => {
    var keyDown = event.key ;
    const timer = document.getElementById("timer") ;

    if(keyDown == " ")
    {
        timer.style.color = '#EDCC0C' ;
    }
}, false) ; //end event listener for keydown

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
    }//end if

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
    }//end else if

    else if(keyName  == "r")
    {
        clearInterval(Interval) ;
        tens = "00" ;
        seconds = "0" ;
        appendTens.innerHTML = tens ;
        appendSeconds.innerHTML = seconds ;

        solveList.removeChild(solveList.firstChild) ;
        updateStats(solveList.firstChild.textContent) ;

        if(solveArr.length == 0)
        {
            appendBestSolve.innerHTML = "--" ;
            appendAvg.innerHTML = "--" ;
        }
    }//end else if

    if(keyName == "c")
    {
        while(solveList.firstChild)
            solveList.removeChild(solveList.firstChild) ;

        appendTens.innerHTML = "00" ;
        appendSeconds.innerHTML = "0" ;
        appendBestSolve.innerHTML = "--" ;
        appendAvg.innerHTML = "--" ;
        appendAo5.innerHTML = "--" ;
        appendAo12.innerHTML = "--" ;
        appendAo50.innerHTML = "--" ;
        appendAo100.innerHTML = "--" ;
    }//end else if
}, false) ; //end event listener for keyup

function generateScramble() 
{
    
}//end generateScramble