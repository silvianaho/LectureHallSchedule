
  function disablePaginationButton() {
   
  
    if (dataquery.page === 0) {
      $("#advance-data-first-page").attr("disabled", true);
      $("#advance-data-first-page").parent().addClass("disabled");
      $("#advance-data-previous-page").attr("disabled", true);
      $("#advance-data-previous-page").parent().addClass("disabled");
  
      $("#advance-data-last-page").attr("disabled", false);
      $("#advance-data-last-page").parent().removeClass("disabled");
      $("#advance-data-next-page").attr("disabled", false);
      $("#advance-data-next-page").parent().removeClass("disabled");
    } else if (dataquery.page === totalPage - 1) {
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
  
    let start = dataquery["page"] * dataquery["pageSize"] + 1;
    // @ts-ignore
    let end =
      parseInt(dataquery["page"] * dataquery["pageSize"]) +
      parseInt(dataquery["pageSize"]);
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
      data: dataquery,
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
      dataquery.facultyId = $("#faculty-id").val();
      dataquery.semesterId = $("#semester-id").val();
      dataquery.dayOfWeek = $("#day-of-week").val();
      dataquery["page"] = 0;
      dataquery["pageSize"] = 10;
      settings = {
        url: TechnicianDataUrl, //backend search
        method: "GET",
        timeout: 0,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: dataquery,
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
            dataquery.pageSize = response.length;
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
      dataquery["page"] = 0;
      console.log("navigate to first page");
  
      $.ajax(settings)
        .done((response) => {
          populateTable(response);
          disablePaginationButton();
        })
        .fail((message) => console.log(message));
    });
  
    $("#advance-data-previous-page").on("click", (event) => {
      dataquery["page"] -= 1;
      console.log("prev page");
  
      $.ajax(settings)
        .done((response) => {
          populateTable(response);
          disablePaginationButton();
        })
        .fail((message) => console.log(message));
    });
  
    $("#advance-data-next-page").on("click", (event) => {
      dataquery["page"] += 1;
      console.log("meow");
  
      $.ajax(settings)
        .done((response) => {
          populateTable(response);
          disablePaginationButton();
        })
        .fail((message) => console.log(message));
    });
  
    $("#advance-data-last-page").on("click", (event) => {
      dataquery["page"] = totalPage - 1;
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
      dataquery["pageSize"] = pageSize;
      dataquery ["page"] = 0;
  
      $.ajax(settings)
        .done((response) => {
          populateTable(response);
          disablePaginationButton();
        })
        .fail((message) => console.log(message));
    });
  });