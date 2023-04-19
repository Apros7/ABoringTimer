function pad(val) {
	return val > 9 ? val : "0" + val;
}

var timer;
var startTime;
var totalTimer = 0;

function updateTimer(addedTime) {
	totalTimer += addedTime;
	console.log(totalTimer)
	var hours = Math.floor(totalTimer / (1000 * 60 * 60));
	var minutes = Math.floor((totalTimer % (1000 * 60 * 60)) / (1000 * 60));
	var seconds = Math.floor((totalTimer % (1000 * 60)) / 1000);
	document.getElementById("timer").innerHTML = pad(hours) + ":" + pad(minutes) + ":" + pad(seconds);
}

minus_one_min = document.getElementById("minus-one-min")
minus_fifteen_sec = document.getElementById("minus-fifteen-sec")
plus_one_min = document.getElementById("plus-one-min")
plus_fifteen_sec = document.getElementById("plus-fifteen-sec")

minus_one_min.addEventListener("click", function() {
	const remainingTime = 60 * 1000;
	updateTimer(remainingTime);
});

minus_fifteen_sec.addEventListener("click", function() {
	const remainingTime = 15 * 1000;
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

document.getElementById("start-timer").addEventListener("click", function() {
	var timer = setInterval(function() {
	  updateTimer(-1000);
	  if (totalTimer <= 0) {
		clearInterval(timer);
	  }
	}, 1000);
  });
