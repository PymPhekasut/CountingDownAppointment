const countDownForm = document.getElementById('countDownForm'); /*countdown form*/
const inputContainer = document.getElementById('input-container');
const dateEl = document.getElementById('date-picker');
const countDownEL = document.getElementById('countdown');

const countdownTitleEL = document.getElementById('countdown-title');
const countdownButtonEl = document.getElementById('countdown-button');
const timeEl = document.querySelectorAll('span'); //because we have many span

const completeEl = document.getElementById('complete');
const completeInfoEl = document.getElementById('complete-info');
const completeButtonEl = document.getElementById('complete-button');


//Control making appointment process

let countDownTitle = '';
let countDownDate = '';

let countDownValue = Date; //keep date from selected form
let countDownActive; //Counting time
let saveCountDown; //keep detail of countDownTitle and countDownDate (objec)


//Counting time

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

countDownForm.addEventListener('submit', updateCountDowm);

function updateCountDowm(e) {
    e.preventDefault();
    countDownTitle = e.srcElement[0].value;
    countDownDate = e.srcElement[1].value;

    if (countDownTitle === '') {
        alert("Please complete the form!")
    } else {
        saveCountDown = { title: countDownTitle, date: countDownDate };
        localStorage.setItem("countDown", JSON.stringify(saveCountDown)); //set to local storage "countdown" is key
        countDownValue = new Date(countDownDate).getTime(); //get time value that set
        setUpTime();
    }

}

function setUpTime() {
    countDownActive = setInterval(() => {
        // Setting time - present time
        const now = new Date().getTime();
        const distance = countDownValue - now; //countDownValue = future time that set
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        inputContainer.hidden = true;

        if (distance < 0) {
            countDownEL.hidden = true;
            completeEl.hidden = false;
            completeInfoEl.textContent = `${countDownTitle} Date: ${countDownDate}`;
            clearInterval(countDownActive);
            //time up
        } else {
            countdownTitleEL.textContent = `${countDownTitle}`;
            //countdown
            timeEl[0].textContent = `${days}`;
            timeEl[1].textContent = `${hours}`;
            timeEl[2].textContent = `${minutes}`;
            timeEl[3].textContent = `${seconds}`;
            countDownEL.hidden = false;
            completeEl.hidden = true;
        }

    }, second);


}

function callDatainStore() {
    if (localStorage.getItem("countDown")) {
        inputContainer.hidden = true;
        saveCountDown = JSON.parse(localStorage.getItem("countDown"));
        countDownTitle = saveCountDown.title;
        countDownDate = saveCountDown.date;
        countDownValue = new Date(countDownDate).getTime();
        setUpTime();
    }
}

function reset() {
    localStorage.removeItem("countDown");
    countDownEL.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    clearInterval(countDownActive); //stop timing
    countDownTitle = '';
    countDownDate = '';
}

callDatainStore();

countdownButtonEl.addEventListener('click', reset);
completeButtonEl.addEventListener('click', reset);