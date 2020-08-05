const basicDataQuery = {
    facultyId: null,
    semesterId: null,
    dayOfWeek: null,
    page: 0,
    pageSize: 10,
  };
  
  let totalPage = 0;
  let totalNoOfLectures = 0;
  
  const pageInfoUrl = "http://localhost:3000/basic/info";
  
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
    //Technician
function populateTable(response) {
    const parent = $("#technician-list-table");
    parent.empty();
    $("#page-size").attr("value", response.length);
    response.forEach((element) => {
      const technicians = `<tr>
          <th scope="row">${element.technicanid}</th>
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
  

    var settings = {
        url: "http://localhost:3000/basic/data",
        method: "GET",
        timeout: 0,
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        data: basicDataQuery,
      };
    
      $.ajax(settings)
        .fail((response) => {
          $("#technician-list-table").empty();
          $(".pagination").empty();
          $(".not-found").html(
            `<p class='display-4'>Getting Technian listings failed ;w;</p><p class='display-4'>Please refresh the page or <a class="text-primary" href="mailto:jibaboom@sp.edu.sg">report</a> this issue</p>`
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
        basicDataQuery.facultyId = $("#faculty-id").val();
        basicDataQuery.semesterId = $("#semester-id").val();
        basicDataQuery.dayOfWeek = $("#day-of-week").val();
        basicDataQuery["page"] = 0;
        basicDataQuery["pageSize"] = 10;
        settings = {
          url: "http://localhost:3000/basic/data", //backend search
          method: "GET",
          timeout: 0,
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          data: basicDataQuery,
        };
        $.ajax(settings)
          .fail((response) => {
            $("#technicians-list-table").empty();
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
              const technicians = `<tr>
              <th scope="row"> ${element.technicianid} </th>
              <td> ${element.facultyid} </td>
              <td> ${element.semesterid} </td>
              <td> ${element.dayofweek} </td>
              <td>${element.starttime}</td>
              <td>${element.endtime}</td>
              </tr>"`;
              parent.append(technicians);
              basicDataQuery.pageSize = response.length;
              totalNoOfTechnicians = response.length;
            });
            showEntries();
            $("#page-size").attr("value", response.length);
          });
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
          });
      });})