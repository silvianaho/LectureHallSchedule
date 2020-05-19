import moment from 'moment';

export const intervalScheduling = (lectures) => {
  const halls = [];
  // keep track of the earliest end time
  const earliestEndTime = [];

  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < lectures.length; i++) {
    const lecture = lectures[i];
    const start = moment(lecture.starttime, 'HH:mm:ss');

    if (
      earliestEndTime[0] !== undefined &&
      start >= moment(earliestEndTime[0].time, 'HH:mm:ss')
    ) {
      halls[earliestEndTime[0].hallNo].push(lecture);
      earliestEndTime.push({
        time: moment(lecture.endtime, 'HH:mm:ss'),
        hallNo: earliestEndTime[0].hallNo,
      });
      earliestEndTime.shift();
      earliestEndTime.sort((a, b) => a.time.diff(b.time));
    } else {
      halls.push([lecture]);
      earliestEndTime.push({
        time: moment(lecture.endtime, 'HH:mm:ss'),
        hallNo: earliestEndTime.length,
      });
      earliestEndTime.sort((a, b) => a.time.diff(b.time));
    }
  }

  return halls;
};
