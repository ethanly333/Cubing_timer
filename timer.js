var mins = "00" ;
var seconds = "00" ;
var tens = "00" ;
var appendTens = document.getElementById("tens") ;
var appendSeconds = document.getElementById("seconds") ;
var appendMins = document.getElementById("mins") ;
var keyName ;
var isRunning = false ;
var solveList = document.getElementById("solveList") ;
var solveArr = solveList.getElementsByTagName("li") ;
var string_SolveArr = [];
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
var statModal = document.querySelector(".statModal") ;

var appendScramble = document.getElementById("scramble") ;
var body = getComputedStyle(document.querySelector('body')) ;

const openStatModal = function() {
    statModal.classList.remove("hidden") ;
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
    statModal.classList.add("hidden") ;
} ; 

openModalBtn.addEventListener("click", openModal) ;
overlay.addEventListener("click", closeModal) ;

/* LOCAL STORAGE FUNCTIONS FOR SAVING STATE */
function setItem(key, item) 
{
    localStorage.setItem(key, item);
}

function getItem(key) 
{
    return localStorage.getItem(key);
}

/* THEME INIT */
if(getItem("theme") == null)
{
    setItem("theme", "classyOGTheme");
}
else
{
    document.body.classList.replace("classyOGTheme", getItem("theme")) ;
}

/* SOLVE INIT */
if(localStorage != null)
{
    //var solveList_arr = [];
    solveList.innerHTML = getItem("solveList");
    /*for(let i=0; i<getItem("solveList").length; i++)
    {
        solveList.prepend(getItem("solveList")[i]);
    }*/
}

function initStats() 
{
    const empty = "--"
    setItem("appendBestSolve", empty);
    setItem("appendAvg", empty);
    setItem("appendAo5", empty);
    setItem("appendAo12", empty);
    setItem("appendAo50", empty);
    setItem("appendAo100", empty);
}

function loadSavedStats()
{
    const empty = "--";
    if(getItem("appendAo5") == null) 
    {
        setItem("appendAo5", empty);
        setItem("appendAo12", empty);
        setItem("appendAo50", empty);
        setItem("appendAo100", empty);
    }
    else if(getItem("appendAo12") == null)
    {
        setItem("appendAo12", empty);
        setItem("appendAo50", empty);
        setItem("appendAo100", empty);
    }
    else if(getItem("appendAo50") == null)
    {
        setItem("appendAo50", empty);
        setItem("appendAo100", empty);
    }
    else if(getItem("appendAo100") == null)
    {
        setItem("appendAo100", empty);
    }
    else
    {
        // Do nothing
    }
}

function appendAllStats()
{
    appendBestSolve.innerHTML = getItem("appendBestSolve");
    appendAvg.innerHTML = getItem("appendAvg"); 
    appendAo5.innerHTML = getItem("appendAo5");
    appendAo12.innerHTML = getItem("appendAo12");
    appendAo50.innerHTML = getItem("appendAo50");
    appendAo100.innerHTML = getItem("appendAo100");
}

if(mins == "00")
{
    document.getElementById("mins").style.display = 'none' ;
    document.getElementById("colon").style.display = 'none' ;
}

if(getItem("appendBestSolve") == null) 
{
    initStats();
}
else
{
    loadSavedStats();
}

appendAllStats();

function convertTimeToFloat(time)
{
    var minFloat ;
    var secFloat ;
    var timeInSecFloat ;
    if(time.length > 5)     //time is > 60s 
    {
        minFloat = parseFloat(time.split(":")) ;
        if(minFloat < 10)
            startIdxSec = 2 ;
        else
            startIdxSec = 3 ;
        secFloat = parseFloat(time.substr(startIdxSec, time.length)) ;

        timeInSecFloat = (minFloat * 60) + secFloat ;
    }
    else
        timeInSecFloat = parseFloat(time) ;

    return timeInSecFloat ;
}

function convertFloatToTime(time)
{
    var formattedTime ;
    var minutes ;
    var seconds ;

    minutes = Math.trunc(time/60) ;
    seconds = time - (minutes*60) ;

    if(minutes > 0)
        formattedTime = minutes + ":" + seconds.toFixed(2) ;
    else
        formattedTime = seconds.toFixed(2) ;
    
    return formattedTime ; 
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
        if(str_sec[0] == "0" && str_min == "00")
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
}

function findBestSolve()
{
    bestSolve = convertTimeToFloat(string_SolveArr[0]);
    tempIdx = 0 ;
    for(let i=1; i<solveArr.length; i++)
    {
        if(convertTimeToFloat(string_SolveArr[i]) < bestSolve) 
        {
            setItem("bestSolve", string_SolveArr[i]);
            bestSolve = convertTimeToFloat(string_SolveArr[i]) ;
            tempIdx = i ;
        }
    }
    setItem("appendBestSolve", string_SolveArr[tempIdx]);
    appendBestSolve.innerHTML =  getItem("appendBestSolve");
}

function updateStats(time)
{
    /* DEBUG */
    //console.log(string_SolveArr);
    /****************/

    // retrieve the stored solve array string and split it back into separate indices
    string_SolveArr = getItem("string_SolveArr").split(',');

    if(solveArr.length == 1)
    {
        setItem("appendBestSolve", time);
        appendBestSolve.innerHTML = getItem("appendBestSolve") ;

        setItem("bestSolve", time);
        bestSolve = convertTimeToFloat(getItem("appendBestSolve")); 

        setItem("appendAvg", time);
        appendAvg.innerHTML = getItem("appendAvg") ;
    }//end if

    /* Best Solve and Avg Statistic */
    if(solveArr.length > 1)
    {
        if(convertTimeToFloat(time) < convertTimeToFloat(getItem("bestSolve")))
        {
            setItem("bestSolve", time);
            bestSolve = convertTimeToFloat(time) ;

            setItem("appendBestSolve", time);
            appendBestSolve.innerHTML = getItem("appendBestSolve");
        }//end if

        var avgtemp = 0 ;
        for(let i=0; i<solveArr.length; i++) 
        {
            avgtemp += convertTimeToFloat(string_SolveArr[i]);
        }//end for i

        avg = (avgtemp/string_SolveArr.length).toFixed(2);

        appendAvg.innerHTML = convertFloatToTime(avg); 
        setItem("appendAvg", convertFloatToTime(avg));
    }//end else if

    /* Ao5 Statistic */
    if(solveArr.length >= 5)
    {
        //console.log(string_SolveArr);

        var ao5temp = 0 ;
        var bestTime = convertTimeToFloat(string_SolveArr[0]) ;
        var worstTime = convertTimeToFloat(string_SolveArr[0]) ;

        // Find the best and worst times in the last 5 solves to remove from the average
        for(let i=1; i<5; i++)
        {
            if(convertTimeToFloat(string_SolveArr[i]) < bestTime) 
                bestTime = convertTimeToFloat(string_SolveArr[i]); 

            if(convertTimeToFloat(string_SolveArr[i]) > worstTime)
                worstTime = convertTimeToFloat(string_SolveArr[i]); 
        }//end for i

        for(let i=0; i<5; i++)
        {
            ao5temp += convertTimeToFloat(string_SolveArr[i]) ;
        }//end for i

        ao5 = ((ao5temp-bestTime-worstTime)/3).toFixed(2);

        //setItem("ao5", JSON.stringify(((ao5temp-bestTime-worstTime)/3).toFixed(2)));
        //ao5 = JSON.parse(getItem("ao5"));
        //setItem("ao5", ao5);

        appendAo5.innerHTML = convertFloatToTime(ao5);//convertTimeToFloat(ao5.toFixed(2)) ;
        setItem("appendAo5", convertFloatToTime(ao5));
    }//end if

    /* Ao12 Statistic */
    if(solveArr.length >= 12)
    {
        var ao12temp = 0 ;
        var bestTime = convertTimeToFloat(string_SolveArr[0]) ;
        var worstTime = convertTimeToFloat(string_SolveArr[0]) ;

        for(let i=1; i<12; i++)
        {
            if(convertTimeToFloat(string_SolveArr[i]) < bestTime)
                bestTime = convertTimeToFloat(string_SolveArr[i]) ;

            if(convertTimeToFloat(string_SolveArr[i]) > worstTime)
                worstTime = convertTimeToFloat(string_SolveArr[i]) ;
        }//end for i

        for(let i=0; i<12; i++)
        {
            ao12temp += convertTimeToFloat(string_SolveArr[i]) ;
        }//end for i

        ao12 = ((ao12temp-bestTime-worstTime)/10).toFixed(2) ;
        appendAo12.innerHTML = convertFloatToTime(ao12) ;
        setItem("appendAo12", convertFloatToTime(ao12));
    }//end if

    /* Ao50 Statistic */
    if(solveArr.length >= 50)
    {
        var ao50temp = 0 ;
        var bestTime = convertTimeToFloat(string_SolveArr[0]) ;
        var worstTime = convertTimeToFloat(string_SolveArr[0]) ;

        for(let i=1; i<50; i++)
        {
            if(convertTimeToFloat(string_SolveArr[i]) < bestTime)
                bestTime = convertTimeToFloat(string_SolveArr[i]) ;

            if(convertTimeToFloat(string_SolveArr[i]) > worstTime)
                worstTime = convertTimeToFloat(string_SolveArr[i]) ;
        }//end for i

        for(let i=0; i<50; i++)
        {
            ao50temp += convertTimeToFloat(string_SolveArr[i]) ;
        }//end for i

        ao50 = ((ao50temp-bestTime-worstTime)/48).toFixed(2) ;
        appendAo50.innerHTML = convertFloatToTime(ao50) ;
        setItem("appendAo50", convertFloatToTime(ao50));
    }//end if

    /* Ao100 Statistic */
    if(solveArr.length >= 100)
    {
        var ao100temp = 0 ;
        var bestTime = convertTimeToFloat(string_SolveArr[0]) ;
        var worstTime = convertTimeToFloat(string_SolveArr[0]) ;

        for(let i=1; i<100; i++)
        {
            if(convertTimeToFloat(string_SolveArr[i]) < bestTime)
                bestTime = convertTimeToFloat(string_SolveArr[i]) ;

            if(convertTimeToFloat(solveArr[i].textContent) > worstTime)
                worstTime = convertTimeToFloat(string_SolveArr[i]) ;
        }//end for i

        for(let i=0; i<100; i++)
        {
            ao100temp += convertTimeToFloat(string_SolveArr[i]) ;
        }//end for i

        ao100 = ((ao100temp-bestTime-worstTime)/98).toFixed(2);
        appendAo100.innerHTML = convertFloatToTime(ao100);
        setItem("appendAo100", convertFloatToTime(ao100));
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
        setItem("solveList", solveList.innerHTML);
        //console.log(JSON.stringify(solveList.classList));
        
        if(getItem("string_SolveArr") != null)
        {
            string_SolveArr = getItem("string_SolveArr").split(','); 
        }
        string_SolveArr.unshift(li.textContent);
        setItem("string_SolveArr", string_SolveArr.toString());

        updateStats(time.innerHTML) ;
        generateScramble() ;
    }//end else if

    else if(keyName  == "r")
    {
        if(confirm("Remove last solve"))
        {
            tens = "00" ;
            seconds = "0" ;
            mins = "0" ;
            appendTens.innerHTML = tens ;
            appendSeconds.innerHTML = seconds ;
            appendMins.innerHTML = mins ;
            document.getElementById("mins").style.display= 'none';
            document.getElementById("colon").style.display= 'none';

            solveList.removeChild(solveList.firstChild) ;
        
            if(string_SolveArr.length == 0)
            {
                initStats();
                appendAllStats();
            }
            else
            {
                findBestSolve() ;
                updateStats(solveList.firstChild.textContent) ;
            }
        }
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

            var saveTheme = getItem("theme");
            localStorage.clear();
            setItem("theme", saveTheme);
            document.body.classList.replace("classyOGTheme", getItem("theme")) ;
            initStats();
            appendAllStats();
        }        
    }//end else if

    if(keyName == "t")
    {
        openThemeModal() ;
    }//end if

    if(keyName == "s")
    {
        openStatModal() ;
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
    document.body.classList.replace(getItem("theme"), "classyOGTheme") ;
    setItem("theme", "classyOGTheme");
}//end classy OG Mode

function sunsetMode() {
    document.body.classList.replace(getItem("theme"), "sunsetTheme") ;
    setItem("theme", "sunsetTheme");
}//end sunset Mode

function vintageMode() {
    document.body.classList.replace(getItem("theme"), "vintageTheme") ;
    setItem("theme", "vintageTheme");
}//end vintage mode

function jungleMode() {
    document.body.classList.replace(getItem("theme"), "jungleTheme") ;
    setItem("theme", "jungleTheme");
}//end jungle mode

function halloweenMode() {
    document.body.classList.replace(getItem("theme"), "halloweenTheme") ;
    setItem("theme", "halloweenTheme");
}

function lightMode() {
    document.body.classList.replace(getItem("theme"), "lightTheme") ;
    setItem("theme", "lightTheme");
}

function tuxMode() {
    document.body.classList.replace(getItem("theme"), "tuxTheme") ;
    setItem("theme", "tuxTheme");
}