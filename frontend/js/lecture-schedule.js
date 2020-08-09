const host = "https://fsp-jibaboom-2a14-teamsos.herokuapp.com";
const basicResultUrl = host + "/basic/result";

const resultQuery = {
  facultyId: 1100000000,
  semesterId: 1110000000,
  dayOfWeek: 4,
}


var TimeTable = function () {
  this.scope = {
    hourStart: 0,
    hourEnd: 23,
  };
  this.lectures = [];
  this.halls = [];
}


TimeTable.prototype = {
  /* 
  @params: halls (list of halls) -> [Hall 1, Hall 2, Hall 3, ...]
  @returns: this object
  */
  /* addHalls: function (newHalls) {
    const currentHalls = this
  } */

  /* 
  @params: list of lectures
  */
  addLecture: function(lectureId, startTime, endTime, lectureHall, tooltip) {
    this.lectures.push({
      lectureId: lectureId, 
      startTime: startTime, 
      endTime: endTime, 
      lectureHall: lectureHall, 
      tooltip: tooltip
    });

    return this;
  }
}

TimeTable.Renderer = function (tt) {
  this.timetable = tt;
}

TimeTable.Renderer.prototype = {
  draw: function (selector) {
    var timetable = this.timetable;

    function emptyNode(selector) {
      selector.empty();
    }

    function appendHalls () {

    }

    function 

  }
}

var tt = new TimeTable();

function addLectureData(lectures) {
  for (let i = 0; i < lectures.length; i++) {
    tt.halls.push("Hall " + (i + 1));
    lectures[i].forEach(lecture => {
      tt.addLecture(lecture.lectureId, lecture.startTime, lecture.endTime, tt.halls[i], "meow");
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
