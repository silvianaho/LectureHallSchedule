const host = "https://fsp-jibaboom-2a14-teamsos.herokuapp.com";
const basicResultUrl = host + "/basic/result";

const resultQuery = {
  facultyId: 1100000000,
  semesterId: 1110000000,
  dayOfWeek: 4,
}

function addLectureData(lectures) {
  let halls = [];
  for (let i = 0; i < lectures.length; i++) {
    halls.push("Hall " + (i + 1));
    lectures[i].forEach(lecture => {
    });    
  }
}

function getResult(facultyId, semesterId, dayOfWeek) {
  const settings = {
    url: basicResultUrl,
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: resultQuery,
  };

  $.ajax(settings)
    .done((response) => {
      // console.log(response);
      addLectureData(response);
    })
}

$(document).ready(() => {
  getResult();
});
