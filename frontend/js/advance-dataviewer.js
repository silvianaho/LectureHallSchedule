const dataQuery = {
  facultyId: null,
  semesterId: null,
  dayOfWeek: null,
  page: 0,
  pageSize: 10,
};

let totalTechnicianPage = 0;
let totalNoOfTechnicians = 0;

const host = "https://fsp-jibaboom-2a14-teamsos.herokuapp.com";
const advancepageInfoUrl = host + "/advance/info";
const technicianDataUrl = host + "/advance/data";

function getPageInfo() {
  $.get(advancepageInfoUrl)
    .done((result) => {
      const faculty = $("#faculty-id");
      const semester = $("#semester-id");
      const totalCount = $("#total-count");

      // faculty
      result.facultyid.forEach((element) => {
        const facultyid = `
          <option value="${element.facultyid}">${element.facultyid}</option>
          `;
        faculty.append(facultyid);
      });
      // semester
      result.semesterid.forEach((element) => {
        const semesterid = `
          <option value="${element.semesterid}">${element.semesterid}</option>
          `;
        semester.append(semesterid);
      });
      // totalCount
      totalCount.append(result.totalCount);
      totalNoOfTechnicians = result.totalCount;

      showEntries();

      // paginations
      totalTechnicianPage = Math.ceil(
        parseInt(result.totalCount) / dataQuery.pageSize
      );
    })
    .fail((message) => console.log(message));
}

function disableButton(button) {
  $(button).attr("disabled", true);
  $(button).parent().addClass("disabled");
}

function enableButton(button) {
  $(button).attr("disabled", false);
  $(button).parent().removeClass("disabled");
}

function paginationButtonControl() {
  console.log(dataQuery.page);
  console.log(totalTechnicianPage);
  if (dataQuery.page === 0 && totalTechnicianPage - dataQuery.page != 0 ) {
    disableButton("#basic-data-first-page");
    disableButton("#basic-data-previous-page");
    enableButton("#basic-data-last-page");
    enableButton("#basic-data-next-page");
  } else if (dataQuery.page === totalTechnicianPage - 1) {
    enableButton("#basic-data-first-page");
    enableButton("#basic-data-previous-page");
    disableButton("#basic-data-last-page");
    disableButton("#basic-data-next-page");
  } else if (dataQuery.page === totalTechnicianPage){
    disableButton("#basic-data-first-page");
    disableButton("#basic-data-previous-page");
    disableButton("#basic-data-last-page");
    disableButton("#basic-data-next-page");
  } else {
    enableButton("#basic-data-first-page");
    enableButton("#basic-data-previous-page");
    enableButton("#basic-data-last-page");
    enableButton("#basic-data-next-page");
  }
  showEntries();
}

function showEntries() {
  let startId = $("#start-id");
  let endId = $("#end-id");

  let start = dataQuery["page"] * dataQuery["pageSize"] + 1;
  // @ts-ignore
  let end = dataQuery["page"] * dataQuery["pageSize"] + dataQuery["pageSize"];
  // console.log(start, end)
  // console.log(dataQuery["page"], dataQuery["pageSize"]);
  end > totalNoOfTechnicians ? (end = totalNoOfTechnicians) : (end = end);
  startId.text(start);
  endId.text(end);
}

// Technician
function populateTable(response) {
  const parent = $("#technician-list-table");
  parent.empty();
  $("#page-size").attr("value", response.length);
  console.log("resp" + response.length);
  console.log("pagesize" + dataQuery["pageSize"]);
  if (response.length < dataQuery["pageSize"]) {
    dataQuery["pageSize"] = response.length;
    $("#total-count").text(response.length);
    totalTechnicianPage = 0;
  }
  else {
    totalTechnicianPage = 0;
  }

  console.log(response);
  console.log(dataQuery);
  response.forEach((element) => {
    const technicians = `<tr>
          <th scope="row">${element.technicianid}</th>
          <td>${element.facultyid}</td>
          <td>${element.semesterid}</td>
          <td>${element.dayofweek}</td>
          <td>${element.starttime}</td>
          <td>${element.endtime}</td>
        </tr>"`;
    parent.append(technicians);
  });
}

function getTechnicians(dataQuery) {
  var settings = {
    url: technicianDataUrl,
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: dataQuery,
  };

  $.ajax(settings)
    .fail((response) => {
      $("#technician-list-table").empty();
      $(".pagination").empty();
      $(".not-found").html(
        `<p class='display-4'>Getting technician listings failed ;w;</p><p class='display-4'>Please refresh the page or <a class="text-primary" href="mailto:jibaboom@sp.edu.sg">report</a> this issue</p>`
      );
      $(".not-found").removeClass("d-none");
    })
    .done((response) => {
      populateTable(response);
      showEntries();
      paginationButtonControl();
    });
}

$(document).ready(() => {
  /* Collapse sidebar */
  $("#sidebar-collapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });

  $("#sidebar-collapse-small-screen").on("click", function () {
    $("#sidebar").toggleClass("active");
  });

  /* Get page information */
  getPageInfo();

  getTechnicians(dataQuery);

  // Search for items on button click
  $("#search-button").on("click", (event) => {
    event.preventDefault();
    dataQuery.facultyId = $("#faculty-id").val();
    dataQuery.semesterId = $("#semester-id").val();
    dataQuery.dayOfWeek = $("#day-of-week").val();
    dataQuery["page"] = 0;
    dataQuery["pageSize"] = 10;

    getTechnicians(dataQuery);
  });

  $("#clear-button").on("click", (event) => {
    $.ajax(settings)
      .fail((response) => {
        console.log("Getting Technician listings failed ;w;");
      })
      .done((response) => {
        const parent = $("#technicians-list-table");
        parent.empty();
        response.forEach((element) => {
          const technicians = `<tr>
                <th scope="row">${element.techniciansid}</th>
                <td>${element.facultyid}</td>
                <td>${element.semesterid}</td>
                <td>${element.dayofweek}</td>
                <td>${element.starttime}</td>
                <td>${element.endtime}</td>
              </tr>"`;
          parent.append(technicians);
        });
        getPageInfo();
      });
  });

})