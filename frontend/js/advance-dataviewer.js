const dataQuery = {
  facultyId: null,
  semesterId: null,
  dayOfWeek: null,
  page: 0,
  pageSize: 10,
};

let totalTechnicianPage = 0;
let totalNoOftechnicians = 0;

const host = "https://fsp-jibaboom-2a14-teamsos.herokuapp.com";
const advancepageInfoUrl = host + "/advance/info";
const TechnicianDataUrl = host + "/advance/data";

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
  console.log(dataQuery.page);
  console.log(totalTechnicianPage);
  if (dataQuery.page === 0 && totalTechnicianPage - dataQuery.page != 0 ) {
    disableButton("#advance-data-first-page");
    disableButton("#advance-data-previous-page");
    enableButton("#advance-data-last-page");
    enableButton("#advance-data-next-page");
  } else if (dataQuery.page === totalTechnicianPage - 1) {
    enableButton("#advance-data-first-page");
    enableButton("#advance-data-previous-page");
    disableButton("#advance-data-last-page");
    disableButton("#advance-data-next-page");
  } else if (dataQuery.page === totalTechnicianPage){
    disableButton("#advance-data-first-page");
    disableButton("#advance-data-previous-page");
    disableButton("#advance-data-last-page");
    disableButton("#advance-data-next-page");
  } else {
    enableButton("#advance-data-first-page");
    enableButton("#advance-data-previous-page");
    enableButton("#advance-data-last-page");
    enableButton("#advance-data-next-page");
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
  end > totalNoOftechnicians ? (end = totalNoOftechnicians) : (end = end);
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
    url: TechnicianDataUrl,
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
        const parent = $("#technician-list-table");
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
//----------------------------------------------------------------------------------

function disablePaginationButton() {
   
  
  
  if (dataQuery.page === 0) {
    $("#advance-data-first-page").attr("disabled", true);
    $("#advance-data-first-page").parent().addClass("disabled");
    $("#advance-data-previous-page").attr("disabled", true);
    $("#advance-data-previous-page").parent().addClass("disabled");

    $("#advance-data-last-page").attr("disabled", false);
    $("#advance-data-last-page").parent().removeClass("disabled");
    $("#advance-data-next-page").attr("disabled", false);
    $("#advance-data-next-page").parent().removeClass("disabled");
  } else if (dataQuery.page === totalPage - 1) {
    $("#advance-data-first-page").attr("disabled", false);
    $("#advance-data-first-page").parent().removeClass("disabled");
    $("#advance-data-previous-page").attr("disabled", false);
    $("#advance-data-previous-page").parent().removeClass("disabled");

    $("#advance-data-last-page").attr("disabled", true);
    $("#advance-data-last-page").parent().addClass("disabled");
    $("#advance-data-next-page").attr("disabled", true);
    $("#advance-data-next-page").parent().addClass("disabled");
  } else {
    $("#advance-data-first-page").attr("disabled", false);
    $("#advance-data-first-page").parent().removeClass("disabled");
    $("#advance-data-previous-page").attr("disabled", false);
    $("#advance-data-previous-page").parent().removeClass("disabled");

    $("#advance-data-last-page").attr("disabled", false);
    $("#advance-data-last-page").parent().removeClass("disabled");
    $("#advance-data-next-page").attr("disabled", false);
    $("#advance-data-next-page").parent().removeClass("disabled");
  }
  showEntries();
}


function showEntries() {
  let startId = $("#start-id");
  let endId = $("#end-id");

  let start = dataQuery["page"] * dataQuery["pageSize"] + 1;
  // @ts-ignore
  let end =
    parseInt(dataQuery["page"] * dataQuery["pageSize"]) +
    parseInt(dataQuery["pageSize"]);
  end > totalNoOftechnicians ? (end = totalNoOftechnicians) : (end = end);
  startId.text(start);
  endId.text(end);
}
//technician
function populateTable(response) {
  const parent = $("#technician-list-table");
  parent.empty();
  $("#page-size").attr("value", response.length);
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


$(document).ready(() => {
  /* Get page information */
  getPageInfo();

  /* Collapse sidebar */
  $("#sidebar-collapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });

  $("#sidebar-collapse-small-screen").on("click", function () {
    $("#sidebar").toggleClass("active");
  });

  // Get technician listings as soon as page loads
  var settings = {
    url: TechnicianDataUrl,
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
      const parent = $("#technician-list-table");
      parent.empty();
      $("#page-size").attr("value", response.length);
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
      disablePaginationButton();
    });

  // Search for items on button click
  $("#search-button").on("click", (event) => {
    event.preventDefault();
    dataQuery.facultyId = $("#faculty-id").val();
    dataQuery.semesterId = $("#semester-id").val();
    dataQuery.dayOfWeek = $("#day-of-week").val();
    dataQuery["page"] = 0;
    dataQuery["pageSize"] = 10;
    settings = {
      url: TechnicianDataUrl, //backend search
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
        $(".not-found").removeClass("d-none");
        $("#page-size-filter").addClass("d-none");
        $("#showing-entries").addClass("d-none");
        $("#page-size").attr("value", 0);
      })
      .done((response) => {
        $(".not-found").addClass("d-none");
        $("#page-size-filter").removeClass("d-none");
        $("#showing-entries").removeClass("d-none");
        const parent = $("#technician-list-table");
        parent.empty();
        $(".pagination").empty();

        response.forEach((element) => {
          const technicians = `<tr>
          <th scope="row"> ${element.technicianid} </th>
          <td> ${element.facultyid} </td>
          <td> ${element.semesterid} </td>
          <td> ${element.dayofweek} </td>
          <td>${element.starttime}</td>
          <td>${element.endtime}</td>
          </tr>"`;
          parent.append(technicians);
          dataQuery.pageSize = response.length;
          totalNoOftechnicians = response.length;
        });
        showEntries();
        $("#page-size").attr("value", response.length);
      });
  });

  $("#clear-button").on("click", (event) => {
    $.ajax(settings)
      .fail((response) => {
        console.log("Getting technician listings failed ;w;");
      })
      .done((response) => {
        const parent = $("#technician-list-table");
        parent.empty();
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
      });
  });

  // pagination
  $("#advance-data-first-page").on("click", (event) => {
    dataQuery["page"] = 0;
    console.log("navigate to first page");

    $.ajax(settings)
      .done((response) => {
        populateTable(response);
        disablePaginationButton();
      })
      .fail((message) => console.log(message));
  });

  $("#advance-data-previous-page").on("click", (event) => {
    dataQuery["page"] -= 1;
    console.log("prev page");

    $.ajax(settings)
      .done((response) => {
        populateTable(response);
        disablePaginationButton();
      })
      .fail((message) => console.log(message));
  });

  $("#advance-data-next-page").on("click", (event) => {
    dataQuery["page"] += 1;
    console.log("meow");

    $.ajax(settings)
      .done((response) => {
        populateTable(response);
        disablePaginationButton();
      })
      .fail((message) => console.log(message));
  });

  $("#advance-data-last-page").on("click", (event) => {
    dataQuery["page"] = totalPage - 1;
    console.log("meow");

    $.ajax(settings)
      .done((response) => {
        populateTable(response);
        disablePaginationButton();
      })
      .fail((message) => console.log(message));
  });
  $("#page-size").on("change", (event) => {
    let pageSize = $("#page-size").val();
    totalPage = Math.ceil(totalNoOftechnicians / pageSize);
    dataQuery["pageSize"] = pageSize;
    dataQuery ["page"] = 0;

    $.ajax(settings)
      .done((response) => {
        populateTable(response);
        disablePaginationButton();
      })
      .fail((message) => console.log(message));
  });
});