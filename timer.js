var mins = "00" ;
var seconds = "00" ;
var tens = "00" ;
var appendTens = document.getElementById("tens") ;
var appendSeconds = document.getElementById("seconds") ;
var appendMins = document.getElementById("mins") ;
var Interval ;
var keyName ;
var isRunning = false ;
const solveList = document.getElementById("solveList") ;
const solveArr = solveList.getElementsByTagName("li") ;
var start_time ;

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

/* Hot Key Modal Variables */
var modal = document.querySelector(".modal") ;
var overlay = document.querySelector(".overlay") ;
const closeModalBtn = document.querySelector(".closeBtn") ;
const openModalBtn = document.querySelector(".cmdBtn")

/* Theme Switcher Modal Variables */
var themeModal = document.querySelector(".themeModal");

/* Manual Insert Modal Variables */
var insertModal = document.querySelector(".insertModal") ;

var appendScramble = document.getElementById("scramble") ;
var currentTheme = "classyOGTheme" ;
var body = getComputedStyle(document.querySelector('body')) ;

const openInsertModal = function() {
    insertModal.classList.remove("hidden") ;
    overlay.classList.remove("hidden") ;
} ;

const openThemeModal = function() {
    themeModal.classList.remove("hidden") ;
    overlay.classList.remove("hidden") ; 
} ;

const openModal = function() {
    modal.classList.remove("hidden") ;
    overlay.classList.remove("hidden") ; 
} ;

const closeModal = function() {
    modal.classList.add("hidden") ;
    overlay.classList.add("hidden") ;
    themeModal.classList.add("hidden") ;
    insertModal.classList.add("hidden") ;
} ; 

openModalBtn.addEventListener("click", openModal) ;
overlay.addEventListener("click", closeModal) ;

if(mins == "00")
{
    document.getElementById("mins").style.display = 'none' ;
    document.getElementById("colon").style.display = 'none' ;
}

function startTimer() 
{
    var now = (new Date()).getTime() ;
    var diff = now - start_time ;

    if(isRunning)
    {
        var str_time = (new Date(diff).toISOString().slice(11, 23)) ; //ex. 15:00:00.000
        
        //var str_hour = "" + str_time.substring(0, 2) ;
        var str_min = "" + str_time.substring(3, 5) ;
        var str_sec = "" + str_time.substring(6, 8) ;
        var str_tens = "" + str_time.substring(9, 11) ;

        document.getElementById("tens").innerHTML = str_tens ;
        tens = str_tens ;

        // strip the leading 0 from seconds if applicable
        if(str_sec[0] == "0")
        {
            str_sec = str_sec.slice(1) ;   
        }
        else
        {
            str_sec = "" + str_time.substring(6, 8) ;
        }
        seconds = str_sec ;
        document.getElementById("seconds").innerHTML = str_sec ;

        // only show minutes if they are not 00
        if(str_min != "00")
        {
            // strip the leading 0 from minutes if applicable
            if(str_min[0] == "0")
            {
                str_min = str_min.slice(1) ;
            }
            else
            {
                str_min = "" + str_time.substring(3, 5) ;
            }
            mins = str_min ;

            document.getElementById("mins").style.display = ''  ;
            document.getElementById("colon").style.display = '' ;
            document.getElementById("mins").innerHTML = str_min ;
        }

        requestAnimationFrame(startTimer) ;
    }
}//end startTimer

function findBestSolve()
{
    bestSolve = parseFloat(solveArr[0].textContent) ;
    tempIdx = 0 ;
    for(let i=1; i<solveArr.length; i++)
    {
        if(parseFloat(solveArr[i].textContent) < bestSolve)
        {
            bestSolve = parseFloat(solveArr[i].textContent) ;
            tempIdx = i ;
        }
    }
    appendBestSolve.innerHTML = solveArr[tempIdx].textContent ;
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
        var bestTime = parseFloat(solveArr[0].textContent) ;
        var worstTime = parseFloat(solveArr[0].textContent) ;

        for(let i=1; i<5; i++)
        {
            if(parseFloat(solveArr[i].textContent) < bestTime)
                bestTime = parseFloat(solveArr[i].textContent) ;

            if(parseFloat(solveArr[i].textContent) > worstTime)
                worstTime = parseFloat(solveArr[i].textContent) ;
        }//end for i

        for(let i=0; i<5; i++)
        {
            ao5temp += parseFloat(solveArr[i].textContent) ;
        }//end for i

        ao5 = (ao5temp-bestTime-worstTime)/3 ;
        appendAo5.innerHTML = ao5.toFixed(2) ;
    }//end if

    /* Ao12 Statistic */
    if(solveArr.length >= 12)
    {
        var ao12temp = 0 ;
        var bestTime = parseFloat(solveArr[0].textContent) ;
        var worstTime = parseFloat(solveArr[0].textContent) ;

        for(let i=1; i<12; i++)
        {
            if(parseFloat(solveArr[i].textContent) < bestTime)
                bestTime = parseFloat(solveArr[i].textContent) ;

            if(parseFloat(solveArr[i].textContent) > worstTime)
                worstTime = parseFloat(solveArr[i].textContent) ;
        }//end for i

        for(let i=0; i<12; i++)
        {
            ao12temp += parseFloat(solveArr[i].textContent) ;
        }//end for i

        ao12 = (ao12temp-bestTime-worstTime)/10 ;
        appendAo12.innerHTML = ao12.toFixed(2) ;
    }//end if

    /* Ao50 Statistic */
    if(solveArr.length >= 50)
    {
        var ao50temp = 0 ;
        var bestTime = parseFloat(solveArr[0].textContent) ;
        var worstTime = parseFloat(solveArr[0].textContent) ;

        for(let i=1; i<50; i++)
        {
            if(parseFloat(solveArr[i].textContent) < bestTime)
                bestTime = parseFloat(solveArr[i].textContent) ;

            if(parseFloat(solveArr[i].textContent) > worstTime)
                worstTime = parseFloat(solveArr[i].textContent) ;
        }//end for i

        for(let i=0; i<50; i++)
        {
            ao50temp += parseFloat(solveArr[i].textContent) ;
        }//end for i

        ao50 = (ao50temp-bestTime-worstTime)/48 ;
        appendAo50.innerHTML = ao50.toFixed(2) ;
    }//end if

    /* Ao100 Statistic */
    if(solveArr.length >= 100)
    {
        var ao100temp = 0 ;
        var bestTime = parseFloat(solveArr[0].textContent) ;
        var worstTime = parseFloat(solveArr[0].textContent) ;

        for(let i=1; i<100; i++)
        {
            if(parseFloat(solveArr[i].textContent) < bestTime)
                bestTime = parseFloat(solveArr[i].textContent) ;

            if(parseFloat(solveArr[i].textContent) > worstTime)
                worstTime = parseFloat(solveArr[i].textContent) ;
        }//end for i

        for(let i=0; i<100; i++)
        {
            ao100temp += parseFloat(solveArr[i].textContent) ;
        }//end for i

        ao100 = (ao100temp-bestTime-worstTime)/98 ;
        appendAo100.innerHTML = ao100.toFixed(2) ;
    }//end if
}//end update Stats

document.addEventListener("DOMContentLoaded", () => {
    generateScramble() ;
}) ;

document.addEventListener('keydown', (event) => {
    var keyDown = event.key ;
    const timer = document.getElementById("timer") ;

    if(keyDown == " ")
    {
        //timer.style.color = '#EDCC0C' ;
        timer.style.color = body.getPropertyValue('--timerDownColor') ;
    }
}, false) ; //end event listener for keydown

document.addEventListener('keyup', (event) => {
    keyName = event.key ;
    //alert(`Key pressed ${keyName}\n`) ;
    const timer = document.getElementById("timer") ;
    if(keyName == " " && !isRunning)
    {
        isRunning = true ;
        mins = "00" ;
        tens = "00" ;
        seconds = "0" ;

        appendTens.innerHTML = tens ;
        appendSeconds.innerHTML = seconds ;

        document.getElementById("mins").style.display = 'none' ;
        document.getElementById("colon").style.display = 'none' ;

        start_time = (new Date()).getTime() ;
        startTimer() ;
    }//end if    

    else if(keyName == " " && isRunning) 
    {
        //timer.style.color = "white" ;
        timer.style.color = body.getPropertyValue('--color') ;
        isRunning = false ;
        clearInterval(Interval) ;
        const li = document.createElement("li") ;
        const time = document.createElement("span") ;

        li.setAttribute("class", "solve") ;
        time.setAttribute("class", "time") ;

        if(mins != "00")
            time.innerHTML = mins + ":" + seconds + "." + tens ; //`${mins}:${seconds}.${tens}` ;
        else
            time.innerHTML = seconds + "." + tens ; //`${seconds}.${tens}` ;

        li.append(time) ;
        solveList.prepend(li) ;

        updateStats(time.innerHTML) ;
        generateScramble() ;
    }//end else if

    else if(keyName  == "r")
    {
        clearInterval(Interval) ;
        tens = "00" ;
        seconds = "0" ;
        mins = "0" ;
        appendTens.innerHTML = tens ;
        appendSeconds.innerHTML = seconds ;
        appendMins.innerHTML = mins ;
        document.getElementById("mins").style.display= 'none';
        document.getElementById("colon").style.display= 'none';

        solveList.removeChild(solveList.firstChild) ;
    
        if(solveArr.length == 0)
        {
            appendBestSolve.innerHTML = "--" ;
            appendAvg.innerHTML = "--" ;
            appendAo5.innerHTML = "--" ;
            appendAo12.innerHTML = "--" ;
            appendAo100.innerHTML = "--" ;
        }//end if

        findBestSolve() ;
        updateStats(solveList.firstChild.textContent) ;
    }//end else if

    if(keyName == "c")
    {
        if(confirm("Clear solve list"))
        {
            while(solveList.firstChild)
            solveList.removeChild(solveList.firstChild) ;

            appendTens.innerHTML = "00" ;
            appendSeconds.innerHTML = "0" ;
            
            appendMins.innerHTML = "0" ;
            document.getElementById("mins").style.display= 'none';
            document.getElementById("colon").style.display= 'none';

            appendBestSolve.innerHTML = "--" ;
            appendAvg.innerHTML = "--" ;
            appendAo5.innerHTML = "--" ;
            appendAo12.innerHTML = "--" ;
            appendAo50.innerHTML = "--" ;
            appendAo100.innerHTML = "--" ;
        }        
    }//end else if

    if(keyName == "t")
    {
        openThemeModal() ;
    }//end if

    if(keyName == "i")
    {
        openInsertModal() ;
    }//end if
}, false) ; //end event listener for keyup

function getRandomNum(max)
{
    return Math.floor(Math.random() * Math.floor(max)) ;
}

function getRandomNumBetween(min, max)
{
    return Math.floor(Math.random()*(max-min)+min) ;
}

function generateScramble() 
{
    const moveList = ["F", "F'", "F2", "R", "R'", "R2", 
                    "L", "L'", "L2", "U", "U'", "U2", 
                    "D", "D'", "D2", "B", "B'", "B2"
                    ] ; 
    const NUM_MOVE_TYPE = 6 ; //F, B, R, L, U, D
    var scramble_int = [] ; 
    var scramble_char = [] ;
    var scrambleStr ; 
    var isValidScramble = false ;
    
    //Ensure that no side is turned twice in a row
    scramble_int.push(getRandomNum(NUM_MOVE_TYPE)) ;
    var idx = 1 ;
    while(idx < 20) 
    {
        var temp = getRandomNum(NUM_MOVE_TYPE) ;

        while(temp == scramble_int[idx-1])
            temp = getRandomNum(NUM_MOVE_TYPE) ;

        scramble_int.push(temp) ;  
        idx++ ;
    }//end for i
    
    //Choose one of three possible turns depending on the side
    for(let i=0; i<scramble_int.length; i++)
    {
        switch (scramble_int[i]) 
        {
            case 0: 
                scramble_char.push(moveList[getRandomNumBetween(0, 3)]) ;
                break ;
            case 1:
                scramble_char.push(moveList[getRandomNumBetween(3, 6)]) ;
                break ;
            case 2:
                scramble_char.push(moveList[getRandomNumBetween(6, 9)]) ;
                break ;
            case 3:
                scramble_char.push(moveList[getRandomNumBetween(9, 12)]) ;
                break ;
            case 4:
                scramble_char.push(moveList[getRandomNumBetween(12, 15)]) ;
                break ;
            case 5:
                scramble_char.push(moveList[getRandomNumBetween(15, 18)]) ;
                break ;
        }//end switch
    }//end for i

    scrambleStr = scramble_char.toString().split(',').join(' ') ;
    appendScramble.innerHTML = scrambleStr ;
}//end generateScramble

function classyOGMode() {
    document.body.classList.replace(currentTheme, "classyOGTheme") ;
    currentTheme = "classyOGTheme" ;
}//end classy OG Mode

function sunsetMode() {
    document.body.classList.replace(currentTheme, "sunsetTheme") ;
    currentTheme = "sunsetTheme" ;
}//end sunset Mode

function vintageMode() {
    document.body.classList.replace(currentTheme, "vintageTheme") ;
    currentTheme = "vintageTheme" ;
}//end vintage mode

function jungleMode() {
    document.body.classList.replace(currentTheme, "jungleTheme") ;
    currentTheme = "jungleTheme" ;
}//end jungle mode

function halloweenMode() {
    document.body.classList.replace(currentTheme, "halloweenTheme") ;
    currentTheme = "halloweenTheme" ;
}

function lightMode() {
    document.body.classList.replace(currentTheme, "lightTheme") ;
    currentTheme = "lightTheme" ;
}

function tuxMode() {
    document.body.classList.replace(currentTheme, "tuxTheme") ;
    currentTheme = "tuxTheme" ;
}