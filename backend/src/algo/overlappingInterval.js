/* eslint-disable no-plusplus */
function convertTimeToInt(time) {
  const hour = time.substring(0, 2);
  const minute = time.substring(3, 5);
  return parseInt(hour + minute, 10);
}

export const overlappingInterval = (lectures, technicians) => {
  // construct the timeList from lectures and technicians
  const timeList = [];
  for (let i = 0; i < lectures.length; i++) {
    const lecture = lectures[i];
    const start = convertTimeToInt(lecture.starttime);
    const end = convertTimeToInt(lecture.endtime);

    // console.log(start, end);
    // eslint-disable-next-line no-continue
    if (timeList.includes(start) && timeList.includes(end)) continue;
    else if (timeList.includes(start)) timeList.push(end);
    else if (timeList.includes(end)) timeList.push(start);
    else timeList.push(end, start);
  }

  for (let i = 0; i < technicians.length; i++) {
    const technician = technicians[i];
    const start = convertTimeToInt(technician.starttime);
    const end = convertTimeToInt(technician.endtime);

    // console.log(start, end);
    // if (timeList.includes(start) && timeList.includes(end)) console.log(start, end, "se", timeList.includes(start && end));
    // else if (timeList.includes(start)) console.log(start, end, "s", timeList.includes(start));
    // else if (timeList.includes(end)) console.log(start, end, "e", timeList.includes(end));
    // else console.log(start, end, "meow", timeList.includes(start || end));
    // eslint-disable-next-line no-continue
    if (timeList.includes(start) && timeList.includes(end)) continue;
    else if (timeList.includes(start)) timeList.push(end);
    else if (timeList.includes(end)) timeList.push(start);
    else timeList.push(end, start);
  }

  timeList.sort((a, b) => a - b);
  // console.log(timeList);
  // construct timepair from timeList
  const timePair = [];
  for (let i = 0; i < timeList.length - 1; i++) {
    const time1 = timeList[i];
    const time2 = timeList[i + 1];
    timePair.push([time1, time2]);
  }


  let surpluses = [];
  (surpluses = []).length = timePair.length;
  surpluses.fill(0);
  // O(n^2)
  for (let i = 0; i < lectures.length; i++) {
    const lecture = lectures[i];
    const start = convertTimeToInt(lecture.starttime);
    const end = convertTimeToInt(lecture.endtime);

    for (let j = 0; j < timePair.length; j++) {
      const time = timePair[j];
      if (start <= time[0] && end >= time[1]) {
        surpluses[j] -= 1;
      }
    }
  }

  for (let i = 0; i < technicians.length; i++) {
    const technician = technicians[i];
    const start = convertTimeToInt(technician.starttime);
    const end = convertTimeToInt(technician.endtime);

    for (let j = 0; j < timePair.length; j++) {
      const time = timePair[j];
      if (start <= time[0] && end >= time[1]) {
        surpluses[j] += 1;
      }
    }
  }

  const result = [];
  for (let i = 0; i < timePair.length - 1; i++) {
    // const object = {}
    const pair = timePair[i];
    result.push({
      surplus: surpluses[i],
      startTime: pair[0].toString().padStart(4, "0"),
      endTime: pair[1].toString().padStart(4, "0"),
    });
  }

  return result;
};
