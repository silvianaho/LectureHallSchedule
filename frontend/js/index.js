const basicDataQuery = {
  facultyId: null,
  semesterId: null,
  dayOfWeek: null,
  page: 0,
  pageSize: 10,
};

let totalPage = 0;
let totalNoOfLectures = 0;

const host = "https://fsp-jibaboom-2a14-teamsos.herokuapp.com";
// const host = "http://localhost:3000";
const pageInfoUrl = host + "/basic/info";
const basicDataUrl =  host + "/basic/data"; 

function getPageInfo() {
  $.get(pageInfoUrl)
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
      totalNoOfLectures = result.totalCount;

      showEntries();

      // paginations
      totalPage = Math.ceil(
        parseInt(result.totalCount) / basicDataQuery.pageSize
      );
    })
    .fail((message) => console.log(message));
}

function disablePaginationButton() {
  /* const pages = $(".pagination");
  $(".pagination").empty();

  let pageLink = `
      <li class="page-item">
        <button class="page-link" id="basic-data-first-page" aria-label="First Page">
          <span aria-hidden="true">&laquo;</span>
        </button>
      </li>
      <li class="page-item">
        <button class="page-link" id="basic-data-previous-page" aria-label="Previous Page">
          <span aria-hidden="true">&#8249;</span>
        </button>
      </li>`;

  for (let i = 0; i < totalPage; i++) {
    pageLink += `
      <li class="page-item">
        <button class="page-link" value=${i} id="basic-data-page-number" aria-label="Page ${
      i + 1
    }">
          <span aria-hidden="true">${i + 1}</span>
        </button>
      </li>`;
  }

  pageLink += `
    <li class="page-item">
      <button class="page-link" id="basic-data-next-page" aria-label="First Page">
        <span aria-hidden="true">&#8250;</span>
      </button>
    </li>
    <li class="page-item">
      <button class="page-link" id="basic-data-last-page" aria-label="First Page">
      <span aria-hidden="true">&raquo;</span>
      </button>
    </li>`;
  pages.append(pageLink); */

  if (basicDataQuery.page === 0) {
    $("#basic-data-first-page").attr("disabled", true);
    $("#basic-data-first-page").parent().addClass("disabled");
    $("#basic-data-previous-page").attr("disabled", true);
    $("#basic-data-previous-page").parent().addClass("disabled");

    $("#basic-data-last-page").attr("disabled", false);
    $("#basic-data-last-page").parent().removeClass("disabled");
    $("#basic-data-next-page").attr("disabled", false);
    $("#basic-data-next-page").parent().removeClass("disabled");
  } else if (basicDataQuery.page === totalPage - 1) {
    $("#basic-data-first-page").attr("disabled", false);
    $("#basic-data-first-page").parent().removeClass("disabled");
    $("#basic-data-previous-page").attr("disabled", false);
    $("#basic-data-previous-page").parent().removeClass("disabled");

    $("#basic-data-last-page").attr("disabled", true);
    $("#basic-data-last-page").parent().addClass("disabled");
    $("#basic-data-next-page").attr("disabled", true);
    $("#basic-data-next-page").parent().addClass("disabled");
  } else {
    $("#basic-data-first-page").attr("disabled", false);
    $("#basic-data-first-page").parent().removeClass("disabled");
    $("#basic-data-previous-page").attr("disabled", false);
    $("#basic-data-previous-page").parent().removeClass("disabled");

    $("#basic-data-last-page").attr("disabled", false);
    $("#basic-data-last-page").parent().removeClass("disabled");
    $("#basic-data-next-page").attr("disabled", false);
    $("#basic-data-next-page").parent().removeClass("disabled");
  }
  showEntries();
}

function showEntries() {
  let startId = $("#start-id");
  let endId = $("#end-id");

  let start = basicDataQuery["page"] * basicDataQuery["pageSize"] + 1;
  // @ts-ignore
  let end =
    parseInt(basicDataQuery["page"] * basicDataQuery["pageSize"]) +
    parseInt(basicDataQuery["pageSize"]);
  end > totalNoOfLectures ? (end = totalNoOfLectures) : (end = end);
  startId.text(start);
  endId.text(end);
}
//lecture
function populateTable(response) {
  const parent = $("#lecture-list-table");
  parent.empty();
  $("#page-size").attr("value", response.length);
  response.forEach((element) => {
    const lectures = `<tr>
        <th scope="row">${element.lectureid}</th>
        <td>${element.facultyid}</td>
        <td>${element.semesterid}</td>
        <td>${element.dayofweek}</td>
        <td>${element.starttime}</td>
        <td>${element.endtime}</td>
      </tr>"`;
    parent.append(lectures);
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

  // Get lecturer listings as soon as page loads
  var settings = {
    url: basicDataUrl,
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    data: basicDataQuery,
  };

  $.ajax(settings)
    .fail((response) => {
      $("#lecture-list-table").empty();
      $(".pagination").empty();
      $(".not-found").html(
        `<p class='display-4'>Getting Lecturer listings failed ;w;</p><p class='display-4'>Please refresh the page or <a class="text-primary" href="mailto:jibaboom@sp.edu.sg">report</a> this issue</p>`
      );
      $(".not-found").removeClass("d-none");
    })
    .done((response) => {
      const parent = $("#lecture-list-table");
      parent.empty();
      $("#page-size").attr("value", response.length);
      response.forEach((element) => {
        const lectures = `<tr>
            <th scope="row">${element.lectureid}</th>
            <td>${element.facultyid}</td>
            <td>${element.semesterid}</td>
            <td>${element.dayofweek}</td>
            <td>${element.starttime}</td>
            <td>${element.endtime}</td>
          </tr>"`;
        parent.append(lectures);
      });
      disablePaginationButton();
    });

  // Search for items on button click
  $("#search-button").on("click", (event) => {
    event.preventDefault();
    basicDataQuery.facultyId = $("#faculty-id").val();
    basicDataQuery.semesterId = $("#semester-id").val();
    basicDataQuery.dayOfWeek = $("#day-of-week").val();
    basicDataQuery["page"] = 0;
    basicDataQuery["pageSize"] = 10;
    settings = {
      url: basicDataUrl, //backend search
      method: "GET",
      timeout: 0,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: basicDataQuery,
    };
    $.ajax(settings)
      .fail((response) => {
        $("#lecture-list-table").empty();
        $(".not-found").removeClass("d-none");
        $("#page-size-filter").addClass("d-none");
        $("#showing-entries").addClass("d-none");
        $("#page-size").attr("value", 0);
      })
      .done((response) => {
        $(".not-found").addClass("d-none");
        $("#page-size-filter").removeClass("d-none");
        $("#showing-entries").removeClass("d-none");
        const parent = $("#lecture-list-table");
        parent.empty();
        $(".pagination").empty();

        response.forEach((element) => {
          const lectures = `<tr>
          <th scope="row"> ${element.lectureid} </th>
          <td> ${element.facultyid} </td>
          <td> ${element.semesterid} </td>
          <td> ${element.dayofweek} </td>
          <td>${element.starttime}</td>
          <td>${element.endtime}</td>
          </tr>"`;
          parent.append(lectures);
          basicDataQuery.pageSize = response.length;
          totalNoOfLectures = response.length;
        });
        showEntries();
        $("#page-size").attr("value", response.length);
      });
  });

  $("#clear-button").on("click", (event) => {
    $.ajax(settings)
      .fail((response) => {
        console.log("Getting Lecturer listings failed ;w;");
      })
      .done((response) => {
        const parent = $("#lecture-list-table");
        parent.empty();
        response.forEach((element) => {
          const lectures = `<tr>
            <th scope="row">${element.lectureid}</th>
            <td>${element.facultyid}</td>
            <td>${element.semesterid}</td>
            <td>${element.dayofweek}</td>
            <td>${element.starttime}</td>
            <td>${element.endtime}</td>
          </tr>"`;
          parent.append(lectures);
        });
      });
  });

  // pagination
  $("#basic-data-first-page").on("click", (event) => {
    basicDataQuery["page"] = 0;
    console.log("navigate to first page");

    $.ajax(settings)
      .done((response) => {
        populateTable(response);
        disablePaginationButton();
      })
      .fail((message) => console.log(message));
  });

  $("#basic-data-previous-page").on("click", (event) => {
    basicDataQuery["page"] -= 1;
    console.log("prev page");

    $.ajax(settings)
      .done((response) => {
        populateTable(response);
        disablePaginationButton();
      })
      .fail((message) => console.log(message));
  });

  $("#basic-data-next-page").on("click", (event) => {
    basicDataQuery["page"] += 1;
    console.log("meow");

    $.ajax(settings)
      .done((response) => {
        populateTable(response);
        disablePaginationButton();
      })
      .fail((message) => console.log(message));
  });

  $("#basic-data-last-page").on("click", (event) => {
    basicDataQuery["page"] = totalPage - 1;
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
    totalPage = Math.ceil(totalNoOfLectures / pageSize);
    basicDataQuery["pageSize"] = pageSize;
    basicDataQuery["page"] = 0;

    $.ajax(settings)
      .done((response) => {
        populateTable(response);
        disablePaginationButton();
      })
      .fail((message) => console.log(message));
  });
});
/*-------------CA2 insert new data------------*/
/* $(() => {
      $("#submit").submit((event) => {
        event.preventDefault();
        const ID = parseFloat($("#lecture").val());
        if (isNaN(ID)) {
            alert("Please enter a valid lecture id!");
            return;
        }
        const settings = {
          url: basicDataUrl,
          method: "GET",
          timeout: 0,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: basicDataQuery,
            }
        });
        
        $.ajax(settings).fail((response) => {

            console.log("INSERT NEW DATA FAILED!");
        }).done((response) => {
            console.log(response);
            console.log('success')

            response.forEach((element, index) => {
                //bring to data viewer
            });
        });
    }) */
