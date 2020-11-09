"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intervalScheduling = void 0;

function convertTimeToInt(time) {
  var hour = time.substring(0, 2);
  var minute = time.substring(3, 5);
  return parseInt(hour + minute, 10);
}

var intervalScheduling = function intervalScheduling(lectures) {
  var halls = []; // keep track of the earliest end time

  var earliestEndTime = []; // eslint-disable-next-line no-plusplus

  for (var i = 0; i < lectures.length; i++) {
    var lecture = {
      lectureId: parseInt(lectures[i].lectureid, 10),
      startTime: convertTimeToInt(lectures[i].starttime).toString(),
      endTime: convertTimeToInt(lectures[i].endtime).toString()
    };
    var start = parseInt(lecture.startTime, 10); // console.log(start, convertTimeToInt(earliestEndTime[0].time));

    if (earliestEndTime[0] !== undefined && start >= parseInt(earliestEndTime[0].time, 10)) {
      halls[earliestEndTime[0].hallNo].push(lecture);
      earliestEndTime[0] = {
        time: lecture.endTime,
        hallNo: earliestEndTime[0].hallNo
      };
    } else {
      halls.push([lecture]);
      earliestEndTime.push({
        time: lecture.endTime,
        hallNo: earliestEndTime.length
      });
    }

    earliestEndTime.sort(function (a, b) {
      return a.time - b.time;
    });
  }

  return halls;
};

exports.intervalScheduling = intervalScheduling;