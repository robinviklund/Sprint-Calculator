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
    t.is(convertToTime(431), "7h 10m 1s");
});
