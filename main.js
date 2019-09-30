let mode;

$(document).ready(function() {
    $("#inputForm").hide();
});

function choose(elem) {
    mode = elem;
    $("#choose").hide();
    $("#inputForm")
        .find("h1")
        .html("RÄKNA UT " + elem);
    if (elem == "TID") {
        $("#time").hide();
    } else if (elem == "PACE") {
        $("#speed").hide();
    } else {
        $("#distance").hide();
    }
    $("#inputForm").show();
}

function calcTime(distance, pace) {
    const paceInSec = convertToSec(pace);
    return convertToTime(paceInSec * (distance / 1000));
}

function calcDist(time, pace) {
    const timeInSec = convertToSec(time);
    const paceInSec = convertToSec(pace);
    return timeInSec / 60 / (paceInSec / 60);
}

function calcPace(time, distance) {
    const timeInSec = convertToSec(time);
    return convertToTime((timeInSec / distance) * 1000);
}

function convertToTime(sec) {
    let totalSeconds = sec;
    hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;
    return hours + "h " + minutes + "m " + seconds + "s";
}

function update() {
    const time = [
        parseInt($("#hour1").val()),
        parseInt($("#min1").val()),
        parseInt($("#sec1").val())
    ];
    const distance = $("#distance")
        .find("input")
        .val();
    const pace = [
        parseInt($("#hour2").val()),
        parseInt($("#min2").val()),
        parseInt($("#sec2").val())
    ];
    if (mode == "TID") {
        if (pace.length > 0 && distance.length > 0) {
            $("#result").html(calcTime(distance, pace));
        }
    } else if (mode == "DISTANS") {
        if (time.length > 0 && pace.length > 0) {
            $("#result").html(calcDist(time, pace) + "km");
        }
    } else {
        if (time.length > 0 && distance.length > 0) {
            $("#result").html(calcPace(time, distance));
        }
    }
}

function convertToSec(timeArr) {
    let totalSec = 0;
    totalSec = timeArr[0] * 3600 + timeArr[1] * 60 + timeArr[2];
    return totalSec;
}
