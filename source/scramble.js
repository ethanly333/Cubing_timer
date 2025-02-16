/*
    Module to generate random scrambles
*/

function getRandomNum(max)
{
    return Math.floor(Math.random() * Math.floor(max)) ;
}

function getRandomNumBetween(min, max)
{
    return Math.floor(Math.random()*(max-min)+min) ;
}

export function generateScramble(html_element)
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
    html_element.innerHTML = scrambleStr;
}//end generateScramble