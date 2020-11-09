function convertTimeToInt(time) {
  const hour = time.substring(0, 2);
  const minute = time.substring(3, 5);
  return parseInt(hour + minute, 10);
}

export const intervalScheduling = (lectures) => {
  const halls = [];
  // keep track of the earliest end time
  const earliestEndTime = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < lectures.length; i++) {
    const lecture = {
      lectureId: parseInt(lectures[i].lectureid, 10),
      startTime: convertTimeToInt(lectures[i].starttime).toString(),
      endTime: convertTimeToInt(lectures[i].endtime).toString(),
    };
    const start = parseInt(lecture.startTime, 10);
    // console.log(start, convertTimeToInt(earliestEndTime[0].time));
    if (earliestEndTime[0] !== undefined && start >= parseInt(earliestEndTime[0].time, 10)) {
      halls[earliestEndTime[0].hallNo].push(lecture);
      earliestEndTime[0] = {
        time: lecture.endTime,
        hallNo: earliestEndTime[0].hallNo,
      };
    } else {
      halls.push([lecture]);
      earliestEndTime.push({
        time: lecture.endTime,
        hallNo: earliestEndTime.length,
      });
    }
    earliestEndTime.sort((a, b) => a.time - b.time);
  }

  return halls;
};
