function pad(val) {
	return val > 9 ? val : "0" + val;
}

var timer;
var startTime;
var totalTimer = 0;
var audio = new Audio("music/jazz.mp3");
const randomTime = Math.floor(Math.random() * 1800);
audio.addEventListener("timeupdate", function() {
	// no music here
	if (audio.currentTime >= 1640 && audio.currentTime <= 1980) {
	  audio.currentTime = 1980;
	}
  });
audio.currentTime = randomTime;
audio.volume = 0;

var isPaused = true;

function music() {
	if (isPaused) {
        var interval = setInterval(function() {
            audio.volume -= 0.02
            if (audio.volume <= 0.02) {
				audio.volume = 0
                audio.pause();
                clearInterval(interval);
            }
        }, 50);
    }
	if (isPaused == false) {
        audio.play();
        var interval = setInterval(function() {
            audio.volume += 0.02;
            if (audio.volume >= 0.2) {
                clearInterval(interval);
            }
        }, 50);
    }
}

setInterval(function() {
	if (totalTimer <= -0.01 && isPaused == false) {
		start_button.click();
	}
}, 100);

clock = document.getElementById("timer")
continue_button = document.getElementById("continue-timer")
music_button = document.getElementById("music-timer")
let play_music = true

setInterval(function() {
	if (totalTimer > 0 && isPaused == true) {
		continue_button.style.display = "block";
	} else {
		continue_button.style.display = "none";
	}	
	if (isPaused == true) {
		music_button.style.display = "block";
	} else {
		music_button.style.display = "none";
	}
}, 1000)

music_button.addEventListener("click", function() {
	if (play_music) {
		play_music = false;
		music_button.innerHTML = "Music is off";
	} else {
		play_music = true;
		music_button.innerHTML = "Music is on";
	}
})

continue_button.addEventListener("click", function() {
	timer = setInterval(function() {
		updateTimer(1000);
	}, 1000);
	isPaused = false;
	setQuoteStyle(true);
	if (play_music) {
		music();
	}
	start_button.innerHTML = "Pause";
	timer_buttons.style.opacity = 0;
	timer_buttons.style.display = "none";
	start_button_container.style.transform = "translateY(200px)";
	clock.style.transform = "translateY(-200px)";
	setTimeout(function() {
		quote.style.opacity = 1;
	}, 2000)
})


function updateTimer(addedTime) {
    totalTimer += addedTime;
    if (totalTimer < 0) {
        totalTimer = 0;
    }
    var hours = Math.floor(totalTimer / (1000 * 60 * 60));
    var minutes = Math.floor((totalTimer % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((totalTimer % (1000 * 60)) / 1000);
    clock.innerHTML = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
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

function startTimer() {
	if (totalTimer == 0) {
		timer = setInterval(function() {
			updateTimer(1000);
		}, 1000);
	} else {
		timer = setInterval(function() {
			updateTimer(-1000);
			if (totalTimer <= 0) {
				clearInterval(timer);
			}
		}, 1000);
	}
}

function pauseTimer() {
	clearInterval(timer);
}

start_button_container = document.getElementById("start-button-container")
const quote = document.getElementById("quote");
quote.innerHTML = "Life's greatest prizes lie on the other side of pain"

function setQuoteStyle(set) {
	if (set) {
		quote.style.fontFamily = "Arial, sans-serif";
		quote.style.fontSize = "80px";
		quote.style.color = "#333";
		quote.style.marginBottom = "24px";
	  } else {
		quote.style.fontFamily = null;
		quote.style.fontSize = null;
		quote.style.color = null;
		quote.style.marginBottom = null;
	  }
}

start_button.addEventListener("click", function() {
	if (isPaused) {
		isPaused = false;
		setQuoteStyle(true);
		startTimer();
		if (play_music) {
			music();
		}
		start_button.innerHTML = "Pause";
		timer_buttons.style.opacity = 0;
		timer_buttons.style.display = "none";
		start_button_container.style.transform = "translateY(200px)";
		clock.style.transform = "translateY(-200px)";
		setTimeout(function() {
			quote.style.opacity = 1;
		}, 2000)
	} else {
		start_button.innerHTML = "Start";
		quote.style.opacity = 0;
		isPaused = true;
		if (play_music) {
			music();
		}
		setTimeout(function() {
			setTimeout(function() {
				setQuoteStyle(false);
			}, 500)
			start_button_container.style.transform = "translateY(-.2px)";
			clock.style.transform = "translateY(.2px)";
			pauseTimer();
			start_button.innerHTML = "Start";
			timer_buttons.style.display = "flex";
			setTimeout(function() {
				timer_buttons.style.opacity = 1;
			}, 500)
		}, 500)
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