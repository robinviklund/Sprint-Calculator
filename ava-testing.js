import test from "ava";

function convertToSec(timeArr) {
    let totalSec = 0;
    totalSec = timeArr[0] * 3600 + timeArr[1] * 60 + timeArr[2];
    return totalSec;
}

test("To seconds 1", t => {
    t.is(convertToSec([1, 1, 1]), 3661);
});
test("To seconds 2", t => {
    t.is(convertToSec([0, 0, 52255]), 52255);
});
test("To seconds 3", t => {
    t.is(convertToSec([15, 45, 13]), 56713);
});

function convertToTime(sec) {
    let totalSeconds = Math.floor(sec);
    const hours = Math.floor(totalSeconds / 3600);
    totalSeconds %= 3600;
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return hours + "h " + minutes + "m " + seconds + "s";
}

test("To time 1", t => {
    t.is(convertToTime(60), "0h 1m 0s");
});
test("To time 2", t => {
    t.is(convertToTime(2), "0h 0m 2s");
});
test("To time 3", t => {
    t.is(convertToTime(14631), "4h 3m 51s");
});

function checkEmpty(arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i] > 0) {
            return true;
        }
    }
    return false;
}

test("Is empty 1", t => {
    t.is(checkEmpty([0, 0, 0]), false);
});
test("Is empty 2", t => {
    t.is(checkEmpty([22412, 24, 0]), true);
});
test("Is empty 3", t => {
    t.is(checkEmpty([1, 2, 3]), true);
});

function calcTime(distance, pace) {
    const paceInSec = convertToSec(pace);
    return convertToTime(paceInSec * (distance / 1000));
}

test("Calculate time 1", t => {
    t.is(calcTime(3000, [0, 4, 0]), "0h 12m 0s");
});
test("Calculate time 2", t => {
    t.is(calcTime(7500, [0, 5, 0]), "0h 37m 30s");
});
test("Calculate time 3", t => {
    t.is(calcTime(10000, [0, 5, 30]), "0h 55m 0s");
});

function calcDist(time, pace) {
    const timeInSec = convertToSec(time);
    const paceInSec = convertToSec(pace);
    return Math.floor((timeInSec / 60 / (paceInSec / 60)) * 1000);
}

test("Calculate distance 1", t => {
    t.is(calcDist([0, 12, 0], [0, 4, 0]), 3000);
});
test("Calculate distance 2", t => {
    t.is(calcDist([1, 0, 0], [0, 6, 0]), 10000);
});
test("Calculate distance 3", t => {
    t.is(calcDist([0, 30, 0], [0, 4, 30]), 6666);
});

function calcPace(time, distance) {
    const timeInSec = convertToSec(time);
    return convertToTime((timeInSec / distance) * 1000);
}

test("Calculate pace 1", t => {
    t.is(calcPace([0, 12, 0], 3000), "0h 4m 0s");
});
test("Calculate pace 2", t => {
    t.is(calcPace([0, 5, 0], 1000), "0h 5m 0s");
});
test("Calculate pace 3", t => {
    t.is(calcPace([8, 30, 0], 40000), "0h 12m 45s");
});
