export const intervalScheduling = (lectures) => {
  const halls = [];
  // keep track of the earliest end time
  const earliestEndTime = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < lectures.length; i++) {
    const lecture = {
      lectureId: lectures[i].lectureid,
      startTime: lectures[i].starttime,
      endTime: lectures[i].endtime,
    };
    const start = parseInt(lecture.startTime, 10);
    if (earliestEndTime[0] !== undefined && start >= earliestEndTime[0].time) {
      halls[earliestEndTime[0].hallNo].push(lecture);
      earliestEndTime[0] = {
        time: parseInt(lecture.endTime, 10),
        hallNo: earliestEndTime[0].hallNo,
      };
    } else {
      halls.push([lecture]);
      earliestEndTime.push({
        time: parseInt(lecture.endTime, 10),
        hallNo: earliestEndTime.length,
      });
    }
    earliestEndTime.sort((a, b) => a.time - b.time);
  }

  return halls;
};
