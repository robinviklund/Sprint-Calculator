let mode = "";

$(document).ready(function() {
    $("#inputForm").hide();
});

function setZero() {
    $("#hour1").val("0");
    $("#min1").val("0");
    $("#sec1").val("0");
    $("#hour2").val("0");
    $("#min2").val("0");
    $("#sec2").val("0");
    $("#distance")
        .find("input")
        .val("0");
}

function choose(elem) {
    mode = elem;
    setZero();
    $("#result").html("-");
    $("#choose").hide();
    $("#inputForm")
        .find("h1")
        .html("RÄKNA UT " + elem);
    $("#speed").show();
    $("#distance").show();
    $("#time").show();
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
    return Math.floor((timeInSec / 60 / (paceInSec / 60)) * 1000);
}

function calcPace(time, distance) {
    const timeInSec = convertToSec(time);
    return convertToTime((timeInSec / distance) * 1000);
}

function convertToTime(sec) {
    let totalSeconds = Math.floor(sec);
    hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    minutes = Math.floor(totalSeconds / 60);
    seconds = totalSeconds % 60;
    return hours + "h " + minutes + "m " + seconds + "s";
}

function checkEmpty(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            return true;
        }
    }
    return false;
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
        if (checkEmpty(pace) && distance > 0) {
            $("#result").html(calcTime(distance, pace));
        }
    } else if (mode == "DISTANS") {
        if (checkEmpty(time) > 0 && checkEmpty(pace)) {
            $("#result").html(calcDist(time, pace) + "m");
        }
    } else {
        if (checkEmpty(time) > 0 && distance > 0) {
            $("#result").html(calcPace(time, distance) + "/km");
        }
    }
}

function convertToSec(timeArr) {
    let totalSec = 0;
    totalSec = timeArr[0] * 3600 + timeArr[1] * 60 + timeArr[2];
    return totalSec;
}

function backClick() {
    $("#inputForm").hide();
    $("#choose").show();
}
