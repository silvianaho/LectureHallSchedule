"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.overlappingInterval = void 0;

/* eslint-disable no-plusplus */
function convertTimeToInt(time) {
  var hour = time.substring(0, 2);
  var minute = time.substring(3, 5);
  return parseInt(hour + minute, 10);
}

var overlappingInterval = function overlappingInterval(lectures, technicians) {
  // construct the timeList from lectures and technicians
  var timeList = [];

  for (var i = 0; i < lectures.length; i++) {
    var lecture = lectures[i];
    var start = convertTimeToInt(lecture.starttime);
    var end = convertTimeToInt(lecture.endtime); // console.log(start, end);
    // eslint-disable-next-line no-continue

    if (timeList.includes(start) && timeList.includes(end)) continue;else if (timeList.includes(start)) timeList.push(end);else if (timeList.includes(end)) timeList.push(start);else timeList.push(end, start);
  }

  for (var _i = 0; _i < technicians.length; _i++) {
    var technician = technicians[_i];

    var _start = convertTimeToInt(technician.starttime);

    var _end = convertTimeToInt(technician.endtime); // console.log(start, end);
    // if (timeList.includes(start) && timeList.includes(end)) console.log(start, end, "se", timeList.includes(start && end));
    // else if (timeList.includes(start)) console.log(start, end, "s", timeList.includes(start));
    // else if (timeList.includes(end)) console.log(start, end, "e", timeList.includes(end));
    // else console.log(start, end, "meow", timeList.includes(start || end));
    // eslint-disable-next-line no-continue


    if (timeList.includes(_start) && timeList.includes(_end)) continue;else if (timeList.includes(_start)) timeList.push(_end);else if (timeList.includes(_end)) timeList.push(_start);else timeList.push(_end, _start);
  }

  timeList.sort(function (a, b) {
    return a - b;
  }); // console.log(timeList);
  // construct timepair from timeList

  var timePair = [];

  for (var _i2 = 0; _i2 < timeList.length - 1; _i2++) {
    var time1 = timeList[_i2];
    var time2 = timeList[_i2 + 1];
    timePair.push([time1, time2]);
  }

  var surpluses = [];
  (surpluses = []).length = timePair.length;
  surpluses.fill(0); // O(n^2)

  for (var _i3 = 0; _i3 < lectures.length; _i3++) {
    var _lecture = lectures[_i3];

    var _start2 = convertTimeToInt(_lecture.starttime);

    var _end2 = convertTimeToInt(_lecture.endtime);

    for (var j = 0; j < timePair.length; j++) {
      var time = timePair[j];

      if (_start2 <= time[0] && _end2 >= time[1]) {
        surpluses[j] -= 1;
      }
    }
  }

  for (var _i4 = 0; _i4 < technicians.length; _i4++) {
    var _technician = technicians[_i4];

    var _start3 = convertTimeToInt(_technician.starttime);

    var _end3 = convertTimeToInt(_technician.endtime);

    for (var _j = 0; _j < timePair.length; _j++) {
      var _time = timePair[_j];

      if (_start3 <= _time[0] && _end3 >= _time[1]) {
        surpluses[_j] += 1;
      }
    }
  }

  var result = [];

  for (var _i5 = 0; _i5 < timePair.length - 1; _i5++) {
    // const object = {}
    var pair = timePair[_i5];
    result.push({
      surplus: surpluses[_i5],
      startTime: pair[0].toString().padStart(4, "0"),
      endTime: pair[1].toString().padStart(4, "0")
    });
  }

  return result;
};

exports.overlappingInterval = overlappingInterval;