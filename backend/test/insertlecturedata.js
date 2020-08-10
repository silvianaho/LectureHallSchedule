/*
Script to turn copied markdown preview table into request to insert object
*/

/* eslint-disable no-tabs */
const fs = require("fs");

function createInsertObject(items, fields, api, filename) {
  const itemList = items.split("\n");
  const itemDataList = [];
  // let itemJSON = [];
  itemList.forEach(item => {
    const data = item.split("\t");
    const object = {};
    // eslint-disable-next-line no-plusplus
    for (let i = 0; i < fields.length; i++) {
      object[fields[i]] = data[i];
    }
    itemDataList.push(object);
  });

  const insertObject = {};
  insertObject.data = itemDataList;
  const request = `POST http://localhost:3000${api} HTTP/1.1
  Content-Type: application/json
  
  ${JSON.stringify(insertObject, null, "\t")}`;

  fs.writeFile(filename, request, (err) => {
    if (err) throw err;
  });
}

const lectures = `1000000001	1100000000	1110000000	1	1000	1100
1000000002	1100000000	1110000000	1	1030	1130
1000000003	1100000000	1110000000	2	1000	1100
1000000004	1100000000	1110000000	2	1200	1300
1000000005	1100000000	1110000000	2	1030	1230
1000000006	1100000000	1110000000	3	1000	1100
1000000007	1100000000	1110000000	3	1200	1300
1000000008	1100000000	1110000000	3	0900	1400
1000000009	1100000000	1110000000	3	1030	1230
1000000010	1100000000	1110000000	4	1000	1100
1000000011	1100000000	1110000000	4	1200	1300
1000000012	1100000000	1110000000	4	0900	1400
1000000013	1100000000	1110000000	4	1030	1230
1000000014	1100000000	1110000000	4	1215	1425`;

const technicians = `1000000001	1100000000	1110000000	1	1000	1100
1000000002	1100000000	1110000000	1	1000	1130
1000000003	1100000000	1110000000	2	1000	1130
1000000004	1100000000	1110000000	2	1130	1300
1000000005	1100000000	1110000000	3	0900	1030
1000000006	1100000000	1110000000	3	1000	1200
1000000007	1100000000	1110000000	3	1100	1400
1000000008	1100000000	1110000000	4	1000	1300
1000000009	1100000000	1110000000	4	1000	1300
1000000010	1100000000	1110000000	4	1215	1425
1000000011	1100000000	1110000000	4	1215	1500
1000000012	1100000000	1110000000	4	0800	1400`;

const lectFields = ["lectureId", "facultyId", "semesterId", "dayOfWeek", "startTime", "endTime"];
const techFields = ["technicianId", "facultyId", "semesterId", "dayOfWeek", "startTime", "endTime"];
createInsertObject(lectures, lectFields, "/basic/insert", "insertlectures.http");
createInsertObject(technicians, techFields, "/advance/insert", "inserttechnicians.http");
