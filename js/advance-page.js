const advanceDataQuery = {
    facultyId: null,
    semesterId: null,
    dayOfWeek: null,
    page: 0,
    pageSize: 10,
  };
  
  let totalPage = 0;
  let totalNoOftechnicians = 0;
  
  const host = "https://fsp-jibaboom-2a14-teamsos.herokuapp.com";
  // const host = "http://localhost:3000";
  const pageInfoUrl = host + "/advance/info";
  const advanceDataUrl =  host + "/advance/data"; 
  
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
        totalNoOftechnicians = result.totalCount;
  
        showEntries();
  
        // paginations
        totalPage = Math.ceil(
          parseInt(result.totalCount) / advanceDataQuery.pageSize
        );
      })
      .fail((message) => console.log(message));
  }
  
  function disablePaginationButton() {
   
  
    if (advanceDataQuery.page === 0) {
      $("#advance-data-first-page").attr("disabled", true);
      $("#advance-data-first-page").parent().addClass("disabled");
      $("#advance-data-previous-page").attr("disabled", true);
      $("#advance-data-previous-page").parent().addClass("disabled");
  
      $("#advance-data-last-page").attr("disabled", false);
      $("#advance-data-last-page").parent().removeClass("disabled");
      $("#advance-data-next-page").attr("disabled", false);
      $("#advance-data-next-page").parent().removeClass("disabled");
    } else if (advanceDataQuery.page === totalPage - 1) {
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
  
    let start = advanceDataQuery["page"] * advanceDataQuery["pageSize"] + 1;
    // @ts-ignore
    let end =
      parseInt(advanceDataQuery["page"] * advanceDataQuery["pageSize"]) +
      parseInt(advanceDataQuery["pageSize"]);
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
      url: advanceDataUrl,
      method: "GET",
      timeout: 0,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: advanceDataQuery,
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
      advanceDataQuery.facultyId = $("#faculty-id").val();
      advanceDataQuery.semesterId = $("#semester-id").val();
      advanceDataQuery.dayOfWeek = $("#day-of-week").val();
      advanceDataQuery["page"] = 0;
      advanceDataQuery["pageSize"] = 10;
      settings = {
        url: advanceDataUrl, //backend search
        method: "GET",
        timeout: 0,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: advanceDataQuery,
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
            advanceDataQuery.pageSize = response.length;
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
      advanceDataQuery["page"] = 0;
      console.log("navigate to first page");
  
      $.ajax(settings)
        .done((response) => {
          populateTable(response);
          disablePaginationButton();
        })
        .fail((message) => console.log(message));
    });
  
    $("#advance-data-previous-page").on("click", (event) => {
      advanceDataQuery["page"] -= 1;
      console.log("prev page");
  
      $.ajax(settings)
        .done((response) => {
          populateTable(response);
          disablePaginationButton();
        })
        .fail((message) => console.log(message));
    });
  
    $("#advance-data-next-page").on("click", (event) => {
      advanceDataQuery["page"] += 1;
      console.log("meow");
  
      $.ajax(settings)
        .done((response) => {
          populateTable(response);
          disablePaginationButton();
        })
        .fail((message) => console.log(message));
    });
  
    $("#advance-data-last-page").on("click", (event) => {
      advanceDataQuery["page"] = totalPage - 1;
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
      advanceDataQuery["pageSize"] = pageSize;
      advanceDataQuery["page"] = 0;
  
      $.ajax(settings)
        .done((response) => {
          populateTable(response);
          disablePaginationButton();
        })
        .fail((message) => console.log(message));
    });
  });