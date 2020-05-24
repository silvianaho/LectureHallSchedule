"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.intervalScheduling = void 0;

var intervalScheduling = function intervalScheduling(lectures) {
  var halls = []; // keep track of the earliest end time

  var earliestEndTime = []; // eslint-disable-next-line no-plusplus

  for (var i = 0; i < lectures.length; i++) {
    var lecture = {
      lectureId: lectures[i].lectureid,
      startTime: lectures[i].starttime,
      endTime: lectures[i].endtime
    };
    var start = parseInt(lecture.startTime, 10);

    if (earliestEndTime[0] !== undefined && start >= earliestEndTime[0].time) {
      halls[earliestEndTime[0].hallNo].push(lecture);
      earliestEndTime[0] = {
        time: parseInt(lecture.endTime, 10),
        hallNo: earliestEndTime[0].hallNo
      };
    } else {
      halls.push([lecture]);
      earliestEndTime.push({
        time: parseInt(lecture.endTime, 10),
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