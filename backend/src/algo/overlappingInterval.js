/* eslint-disable no-plusplus */
function convertTimeToInt(time) {
  const hour = time.substring(0, 2);
  const minute = time.substring(3, 5);
  return parseInt(hour + minute, 10);
}

export const overlappingInterval = (lectures, technicians) => {
  // construct the timeList from lectures and technicians
  const timeList = [];
  for (let i = 0; i < lectures.length - 1; i++) {
    const lecture = lectures[i];
    const start = convertTimeToInt(lecture.starttime);
    const end = convertTimeToInt(lecture.endtime);

    // eslint-disable-next-line no-continue
    if (timeList.includes(start && end)) break;
    else if (timeList.includes(start)) timeList.push(end);
    else if (timeList.includes(end)) timeList.push(start);
    else timeList.push(end, start);
  }

  for (let i = 0; i < technicians.length - 1; i++) {
    const technician = technicians[i];
    const start = convertTimeToInt(technician.starttime);
    const end = convertTimeToInt(technician.endtime);

    // eslint-disable-next-line no-continue
    if (timeList.includes(start && end)) continue;
    else if (timeList.includes(start)) timeList.push(end);
    else if (timeList.includes(end)) timeList.push(start);
    else timeList.push(end, start);
  }

  timeList.sort((a, b) => a - b);

  // construct timepair from timeList
  const timePair = [];
  for (let i = 0; i < timeList.length - 1; i++) {
    const time1 = timeList[i];
    const time2 = timeList[i + 1];
    timePair.push([time1, time2]);
  }

  const result = [];
  for (let i = 0; i < timePair.length - 1; i++) {
    // const object = {}
    const pair = timePair[i];
    result.push({
      surplus: 0,
      startTime: pair[0].toString().padStart(4, "0"),
      endTime: pair[0].toString().padStart(4, "0"),
    });
  }

  for (let i = 0; i < lectures.length; i++) {
    const lecture = lectures[i];
    const start = convertTimeToInt(lecture.starttime);
    const end = convertTimeToInt(lecture.endtime);
    
    // if (start >=)
  }

  return result;
};
