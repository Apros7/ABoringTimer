function pad(val) {
	return val > 9 ? val : "0" + val;
}

var timer;
var startTime;
var totalTimer = 0;
var audio = new Audio("music/jazz.mp3");
audio.volume = 0;

function music() {
	if (isPaused) {
        var interval = setInterval(function() {
            audio.volume -= 0.01
            if (audio.volume <= 0.02) {
				audio.volume = 0
                audio.pause();
                clearInterval(interval);
            }
        }, 100);
    }
	if (isPaused == false) {
        audio.play();
        var interval = setInterval(function() {
            audio.volume += 0.01;
            if (audio.volume >= 0.2) {
                clearInterval(interval);
            }
        }, 100);
    }
}

setInterval(function() {
	if (totalTimer <= 0.1 && isPaused == false) {
		start_button.click();
	}
}, 100);

function updateTimer(addedTime) {
    totalTimer += addedTime;
    if (totalTimer < 0) {
        totalTimer = 0;
    }
    var hours = Math.floor(totalTimer / (1000 * 60 * 60));
    var minutes = Math.floor((totalTimer % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((totalTimer % (1000 * 60)) / 1000);
    document.getElementById("timer").innerHTML = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

minus_one_min = document.getElementById("minus-one-min")
minus_fifteen_sec = document.getElementById("minus-fifteen-sec")
plus_one_min = document.getElementById("plus-one-min")
plus_fifteen_sec = document.getElementById("plus-fifteen-sec")
reset = document.getElementById("reset-timer")

reset.addEventListener("click", function() {
	totalTimer = 0;
	updateTimer(0);
})

minus_one_min.addEventListener("click", function() {
	const remainingTime = -60 * 1000;
	updateTimer(remainingTime);
});

minus_fifteen_sec.addEventListener("click", function() {
	const remainingTime = -15 * 1000;
	updateTimer(remainingTime);
});

plus_fifteen_sec.addEventListener("click", function() {
	const remainingTime = 15 * 1000;
	updateTimer(remainingTime);
});

plus_one_min.addEventListener("click", function() {
	const remainingTime = 60 * 1000;
	updateTimer(remainingTime);
});


start_button = document.getElementById("start-timer")
timer_buttons = document.getElementById("timer-buttons")
var isPaused = true;



function startTimer() {
	timer = setInterval(function() {
		updateTimer(-1000);
		if (totalTimer <= 0) {
			clearInterval(timer);
		}
	}, 1000);
}

function pauseTimer() {
	clearInterval(timer);
}

start_button.addEventListener("click", function() {
	if (isPaused) {
		isPaused = false;
		startTimer();
		music();
		start_button.innerHTML = "Pause";
		timer_buttons.style.display = "none";
	} else {
		isPaused = true;
		pauseTimer();
		music();
		start_button.innerHTML = "Start";
		timer_buttons.style.display = "flex";
	}
});

// Shortcuts

brush_teeth = document.getElementById("brush-teeth");
stretching = document.getElementById("stretching");

brush_teeth.addEventListener("click", function() {
	totalTimer = 2*60*1000
	updateTimer(0);
})

stretching.addEventListener("click", function() {
	totalTimer = 15*60*1000
	updateTimer(0);
})