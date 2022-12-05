var times = {
    days : 2 ,
    hours : 15 ,
    minutes : 20 ,
    seconds : 5
}


var daysElement = document.querySelector("#days")
var hoursElement = document.querySelector("#hours")
var minutesElement = document.querySelector("#minutes")
var secondsElement = document.querySelector("#seconds")

function initialTimer(){
    daysElement.innerText = times.days;
    hoursElement.innerText = times.hours;
    minutesElement.innerText = times.minutes;
    secondsElement.innerText = times.seconds;
    startTimer();
}
initialTimer();

function startTimer(){
    var timer = setInterval(() => {        
        if( daysElement.innerText == 0 && hoursElement.innerText == 0 && minutesElement.innerText == 0 && secondsElement.innerText == 0 ){
            alert("Hooray Folani Is Singing In Folan Ja"); 
            clearInterval(timer);
        }else{
            reduceSeconds();
        }
    }, 1000);
}
function reduceSeconds(){
    var seconds = secondsElement.innerText;    
    if( seconds - 1 == -1 ){
        reduceMinutes();
        seconds = 59;
        secondsElement.innerText = 59;
    }else{
        secondsElement.innerText = addZeroToNumber(--seconds);        
    }
}
function reduceMinutes(){
    var minutes = minutesElement.innerText;
    if( minutes - 1 == -1 ){
        reduceHours();
        minutes = 59;
        minutesElement.innerText = 59;
    }else{
        minutesElement.innerText = addZeroToNumber(--minutes);
    }
}
function reduceHours(){
    var hours = hoursElement.innerText;
    if( hours - 1 == -1 ){
        reduceDays();
        hours = 24;
        hoursElement.innerText = 24;
    }else{
        hoursElement.innerText = addZeroToNumber(--hours);
    }
}
function reduceDays(){
    var days = daysElement.innerText;
    if( days - 1 == -1 ){
        
    }else{
        daysElement.innerText = --days;
    }
}