function pad(val) {
	return val > 9 ? val : "0" + val;
}

var timer;
var startTime;
var remainingTime = 0;

function updateTimer() {
	var now = new Date().getTime();
	var distance = now - startTime + remainingTime;
	var hours = Math.floor(distance / (1000 * 60 * 60));
	var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((distance % (1000 * 60)) / 1000);
	document.getElementById("timer").innerHTML = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

document.getElementById("minus-one-min").addEventListener("click", function() {
	remainingTime -= 60 * 1000;
	updateTimer();
});

document.getElementById("minus-fifteen-sec").addEventListener("click", function() {
	remainingTime -= 15 * 1000;
	updateTimer();
});

document.getElementById("plus-fifteen-sec").addEventListener("click", function() {
	remainingTime += 15 * 1000;
	updateTimer();
});

document.getElementById("plus-one-min").addEventListener("click", function() {
	remainingTime += 60 * 1000;
	updateTimer();
});

document.getElementById("start-timer").addEventListener("click", function() {
	if (timer) {
		clearInterval(timer);
		timer = null;
	} else {
		startTime = new Date().getTime();
		timer = setInterval(updateTimer, 1000);
	}
});
