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
      lectureId: lectures[i].lectureid,
      startTime: convertTimeToInt(lectures[i].starttime),
      endTime: convertTimeToInt(lectures[i].endtime),
    };
    const start = lecture.startTime;
    if (earliestEndTime[0] !== undefined && start >= earliestEndTime[0].time) {
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
