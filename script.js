$(function () {
    //stopWatch object that with attributes and methods that are common to both forward and reverse timers

    var stopWatch = {
        days: 0,
        hours: 0,
        mins: 0,
        secs: 0,
        running: 0,
        setIntervalOnce: 0,
        userInput: 0,
        d: 0,
        h: 0,
        m: 0,
        s: 0,
        resultArea: null,
        resetBtn: null,
        pauseBtn: null,
        isReverse: 0,
        /**
         * @description Initializes variables to DOM elements
         * @param{string} pauseBtnId - 'pause/start' button element
         * @param{string} resetBtnId - 'reset' button element
         * @param{string} resultsId - 'result' paragraph element
         */
        init: function (pauseBtnId, resetBtnId, resultsId) {
            var timer = this;
            timer.pauseBtn = document.getElementById(pauseBtnId); //'start-pause'
            timer.resetBtn = document.getElementById(resetBtnId); //'reset'
            timer.resultArea = document.getElementById(resultsId); //'results'
            timer.resultArea.innerHTML = timer.days + " days " + timer.hours + " hours " + timer.mins + " minutes " + timer.secs + " seconds";

            timer.commonBtn = document.getElementById('common-start');

            /* 'Click' event listener for the 'Go!' button, which initiates both timers*/
            timer.commonBtn.addEventListener('click', function (event) {

                document.getElementById('warning').style.display = 'none';
                timer.reset();
                timer.pauseBtn.classList.remove("disabled");
                timer.pauseBtn.innerHTML = "Pause";
                //Get the number of seconds entered by the user
                timer.userInput = document.getElementById('userInput').value;
                //Compute the days, hours, minutes and seconds from the seconds obtained entered by the user
                if(timer.userInput !== "0" && timer.userInput !== "null" && timer.userInput !== "" && timer.userInput !== NaN){
                timer.d = Math.floor(timer.userInput / 86400);
                timer.h = Math.floor((timer.userInput % 86400) / 3600);
                timer.m = Math.floor(((timer.userInput % 86400) % 3600) / 60);
                timer.s = ((timer.userInput % 86400) % 3600) % 60;
                //Check if this is for reverse timer, if it is, set the initial values of
                //days, hours, mins and seconds to the above computed values or if it is for
                //forward timer, display them, which are set to zeroes initially

                if (timer.isReverse) {
                    timer.days = timer.d;
                    timer.hours = timer.h;
                    timer.mins = timer.m;
                    timer.secs = timer.s;
                    timer.resultArea.innerHTML = timer.days + " days " + timer.hours + " hours " + timer.mins + " minutes " + timer.secs + " seconds";
                }

                else {
                    timer.resultArea.innerHTML = timer.days + " days " + timer.hours + " hours " + timer.mins + " minutes " + timer.secs + " seconds";
                }

                //Run the timer, every one second (1000 ms), only if setIntervalOnce is zero. This is to avoid invoking the 'runTimer'
                //  multiple times in a second
                if (timer.setIntervalOnce === 0 && timer.userInput !== "0" && timer.userInput !== "null" && timer.userInput !== "") {
                    setInterval(timer.runTimer, 1000);
                    timer.setIntervalOnce = 1;
                }

                //running variable checks if the timer is running or stopped/paused. Set it to 1 to start the timer initially
                if (timer.running === 0) {
                    timer.running = 1;
                }
                if(timer.userInput === "0" || timer.userInput === "null" || timer.userInput === "" || timer.userInput === NaN){
                    document.getElementById('warning').style.display = 'block';
                    timer.running = 0;
                }
                //Preventing the default action of the  'click' event and stop the event from bubbling
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            else {
                document.getElementById('warning').style.display = 'block';
                timer.reset();
                //timer.running = 0;
                event.preventDefault();
                event.stopPropagation();
                return false;
            }
            });

            /*'Click' event listener for the 'Reset' button for both timers*/
            timer.resetBtn.addEventListener('click', function (event)  {
                console.log(timer.userInput);
                if (timer.running === 0 && timer.userInput !== "0" && timer.userInput !== "null" && timer.userInput !== "" && timer.userInput !== NaN) {
                    timer.running = 1;
                }
                else {
                    timer.running = 0;
                }
                // Call the timer function of each timer (forward or reverse)
                timer.reset();
                // Enable the 'pause/start' button and change the text on it
                timer.pauseBtn.classList.remove("disabled");
                timer.pauseBtn.innerHTML = "Pause";
                timer.resultArea.innerHTML = timer.days + " days " + timer.hours + " hours " + timer.mins + " minutes " + timer.secs + " seconds";
                //Preventing the default action of the  'click' event and stop the event from bubbling
                event.preventDefault();
                event.stopPropagation();
                return false;
            });

            /*'Click' event listener for the 'Pause/Start' button for both timers*/
            timer.pauseBtn.addEventListener('click', function (event) {
                //Change the text on the button based on whar it can do next, ie., start or pause
                if (!(timer.pauseBtn.classList.contains('disabled'))) {
                    if (timer.pauseBtn.innerHTML === "Start") {
                        timer.pauseBtn.innerHTML = "Pause";
                        timer.running = 1;
                    }
                    else if (timer.pauseBtn.innerHTML === "Pause") {
                        timer.pauseBtn.innerHTML = "Start";
                        timer.pause();
                    }
                    //Preventing the default action of the  'click' event and stop the event from bubbling
                    event.preventDefault();
                    event.stopPropagation();
                    return false;
                }
            });

        },
        /* Pause function for both timers */
        pause: function () {
            this.running = 0;
        }
    };

    //'forwardStopwatch' Object inheriting the attributes and methods from 'stopWatch'
    var forwardStopwatch = Object.create(stopWatch);
    /*reset function for forward stopwatch. Reset the days, hours, mins ans secs to zero*/
    forwardStopwatch.reset = function () {
        this.days = 0;
        this.hours = 0;
        this.mins = 0;
        this.secs = 0;
    };

    /*runTimer function for forwardStopwatch, which will increment the timer by one second until it reaches the user entered time or until paused by the user*/
    forwardStopwatch.runTimer = function () {
        var timer = forwardStopwatch;
        //Check if timer is paused
        if (timer.running !== 0) {
            //Check to see if the seconds, minutes and hours do not exceed 60, 60 and 24 respectively
            if (timer.secs <= timer.s || timer.mins < timer.m) {
                if (timer.secs === 60) {
                    timer.mins += 1;
                    timer.secs = 0;
                }
            }
            if (timer.mins <= timer.m || timer.hours < timer.h) {
                if (timer.mins === 60) {
                    timer.hours += 1;
                    timer.mins = 0;
                }
            }
            if (timer.hours <= timer.h || timer.days < timer.d) {
                if (timer.hours === 24) {
                    timer.days += 1;
                    timer.hours = 0;
                }
            }
            //Increment timer
            timer.secs++;
            timer.resultArea.innerHTML = timer.days + " days " + timer.hours + " hours " + timer.mins + " minutes " + timer.secs + " seconds";

            //Check if the timer has reached the time entered by the user, if it has then disable the 'Pause' button and stop the timer
            if (timer.days === timer.d && timer.hours === timer.h && timer.mins === timer.m && timer.secs === timer.s) {
                timer.pauseBtn.classList.add("disabled");
                timer.resultArea.innerHTML = timer.days + " days " + timer.hours + " hours " + timer.mins + " minutes " + timer.secs + " seconds";
                timer.running = 0;
            }
        }
    };

    //Initializing the DOM elements of the forward timer
    forwardStopwatch.init('start-pause', 'reset', 'results');

    //'reverseStopwatch' Object inheriting the attributes and methods from 'stopWatch'
    var reverseStopwatch = Object.create(stopWatch);
    //Set the reverseStopwatch to 1 indicating reverse timer
    reverseStopwatch.isReverse = 1;
    /*reset function for reverse stopwatch. Reset the days, hours, mins ans secs to user entered values*/
    reverseStopwatch.reset = function () {
        this.days = this.d;
        this.hours = this.h;
        this.mins = this.m;
        this.secs = this.s;
    };

    /*runTimer function for reverseStopwatch, which will decrement the timer by one second until it reaches zero or until paused by the user*/
    reverseStopwatch.runTimer = function () {
        var timer = reverseStopwatch;
        timer.resultArea.innerHTML = timer.days + " days " + timer.hours + " hours " + timer.mins + " minutes " + timer.secs + " seconds";
        //Check if timer is paused
        if (timer.running !== 0) {
            //Check to see if the seconds, minutes and hours do not decrement below zero
            if (timer.hours > 0 || timer.days > 0) {
                if (timer.hours === 0) {
                    timer.days -= 1;
                    timer.hours = 23;
                }
             }
            if (timer.days > 0 || timer.mins > 0) {
                if (timer.mins === 0) {
                    timer.hours -= 1;
                    timer.mins = 59;
                }
             }
            if (timer.mins > 0 || timer.secs > 0) {
                if (timer.secs === 0) {
                    timer.mins -= 1;
                    timer.secs = 59;
                }
            }
             //decrement the timer
            timer.secs--;
            timer.resultArea.innerHTML = timer.days + " days " + timer.hours + " hours " + timer.mins + " minutes " + timer.secs + " seconds";
             //Check to see if the timer has reached zero, if it has then disable the 'Pause' button and stop the timer
            if (timer.days === 0 && timer.hours === 0 && timer.mins === 0 && timer.secs === 0) {
                timer.pauseBtn.classList.add("disabled");
                timer.resultArea.innerHTML = timer.days + " days " + timer.hours + " hours " + timer.mins + " minutes " + timer.secs + " seconds";
                timer.running = 0;
            }
        }
    };
    //Initializing the DOM elements of the reverse timer
    reverseStopwatch.init('start-pause-reverse', 'reset-reverse', 'results-reverse');

});

