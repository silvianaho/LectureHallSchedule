const dataQuery = {
  facultyId: null,
  semesterId: null,
  dayOfWeek: null,
  page: 0,
  pageSize: 10,
};

let totalTechnicianPage = 0;
let totalNoOftechnicians = 0;
var search = false;

const host = "https://fsp-jibaboom-2a14-teamsos.herokuapp.com";
// const host = "http://localhost:3000";
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
      totalNoOftechnicians = result.totalCount;

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
  console.log("fpg",dataQuery.page);
  console.log("ftot",totalTechnicianPage);
  if (dataQuery.page === 0 && totalTechnicianPage - dataQuery.page != 0) {
    disableButton("#advance-data-first-page");
    disableButton("#advance-data-previous-page");
    enableButton("#advance-data-last-page");
    enableButton("#advance-data-next-page");
  } else if (dataQuery.page === totalTechnicianPage - 1) {
    enableButton("#advance-data-first-page");
    enableButton("#advance-data-previous-page");
    disableButton("#advance-data-last-page");
    disableButton("#advance-data-next-page");
  } else if (dataQuery.page === totalTechnicianPage) {
    disableButton("#advance-data-first-page");
    disableButton("#advance-data-previous-page");
    disableButton("#advance-data-last-page");
    disableButton("#advance-data-next-page");
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
  let end = dataQuery["page"] * dataQuery["pageSize"] + dataQuery["pageSize"];
  // console.log("end----")
  // console.log(dataQuery["page"], dataQuery["pageSize"], end)
  end > totalNoOftechnicians ? (end = totalNoOftechnicians) : (end = end);
  startId.text(start);
  endId.text(end);
}

// Technician
function populateTable(response) {
  const parent = $("#technician-list-table");
  parent.empty();
  $("#page-size").attr("value", response.length);
  if (search) {
    if (response.length < dataQuery["pageSize"]) {
      dataQuery["pageSize"] = response.length;
      $("#total-count").text(response.length);
      totalTechnicianPage = 0;
    }
    search = false;
  }
  else {
    totalNoOftechnicians = parseInt($("#total-count").text());
    let pageSize = dataQuery["pageSize"];
    totalTechnicianPage = Math.ceil(totalNoOftechnicians / pageSize);
  }

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
      populateTable(response.data);
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
    search = true;
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

  $("#advance-data-first-page").on("click", (event) => {
    dataQuery["page"] = 0;
    console.log("navigate to first page");
    getTechnicians(dataQuery);
  });

  $("#advance-data-previous-page").on("click", (event) => {
    dataQuery["page"] -= 1;
    // if (totalNoOftechnicians == (dataQuery["pageSize"] * (dataQuery["page"] + 1))) { console.log("ok"); dataQuery["pageSize"] = 10 }
    console.log("prev page");
    getTechnicians(dataQuery);
  });

  $("#advance-data-next-page").on("click", (event) => {
    dataQuery["page"] += 1;
    console.log("next page");
    getTechnicians(dataQuery);
  });

  $("#advance-data-last-page").on("click", (event) => {
    dataQuery["page"] = totalTechnicianPage - 1;
    console.log("last page");
    getTechnicians(dataQuery);
  });

  $("#page-size").on("change", (event) => {
    let pageSize = parseInt($("#page-size").val());
    dataQuery["pageSize"] = pageSize;
    // dataQuery["page"] = 0;
    getTechnicians(dataQuery);
  });

})