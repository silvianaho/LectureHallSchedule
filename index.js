const basicDataQuery = {
  facultyId: null,
  semesterId: null,
  dayOfWeek: null,
  page: 0,
  pageSize: 10,
};

let totalPage = 0;

const paginationFunction = {
  gotoFirstPage: () => {
    basicDataQuery["page"] = 0;
  },
  changePage: (delta) => {
    console.log(delta);
    delta.isInteger
      ? (basicDataQuery["page"] += delta)
      : (basicDataQuery["page"] = delta);
  },
  lastPage: () => {
    basicDataQuery["page"] = totalPage;
  },
  changePageSize: (newPageSize) => {
    basicDataQuery.pageSize = newPageSize;
  },
};

// const basicDataUrl = "http://localhost:3000/basic/data";

// function getBasicDataFromBackend(callback) {
//   console.log("henlo");

//   $.ajax({
//     url: "http://localhost:3000/basic/data",
//     method: "GET",
//     timeout: 0,
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded",
//     },
//     data: basicDataQuery,
//   })
//     .done((result) => console.log(result))
//     .error((message) => console.log(message));
// }

const pageInfoUrl = "http://localhost:3000/basic/info";

function getPageInfo() {
  $.get(pageInfoUrl)
    .done((result) => {
      const faculty = $("#faculty-id");
      const semester = $("#semester-id");
      const totalCount = $("#total-count");
      const pages = $(".pagination");
      $(".pagination").empty();

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

      // pagination

      totalPage = Math.ceil(
        parseInt(result.totalCount) / basicDataQuery.pageSize
      );

      let pageLink = `
        <li class="page-item">
          <a fn="gotoFirstPage" class="page-link" href="#" id="basic-data-first-page" aria-label="First Page">
            <span aria-hidden="true">&#8249;</span>
          </a>
        </li>
        <li class="page-item">
          <a fn="changePage" value=-1 class="page-link" href="#" id="basic-data-previous-page" aria-label="Previous">
            <span aria-hidden="true">&laquo;</span>
          </a>
        </li>`;
      for (let i = 0; i < totalPage; i++) {
        pageLink += `
        <li class="page-item"><a fn="changePage" value="${i}" class="page-link" href="#">${
          i + 1
        }</a></li>`;
      }
      pageLink += `
      <li class="page-item">
        <a fn="changePage" value=1 class="page-link" href="#" id="basic-data-next-page" aria-label="Next">
          <span aria-hidden="true">&raquo;</span>
        </a>
      </li>
      <li class="page-item">
        <a fn="gotoLastPage" value="${totalPage}" class="page-link" href="#" id="basic-data-last-page" aria-label="Last Page">
          <span aria-hidden="true">&#8250;</span>
        </a>
      </li>`;
      pages.append(pageLink);
    })
    .fail((message) => console.log(message));
}


$(document).ready(() => {
  getPageInfo();

  $("#sidebar-collapse").on("click", function () {
    $("#sidebar").toggleClass("active");
  });

  $("#sidebar-collapse-small-screen").on("click", function () {
    $("#sidebar").toggleClass("active");
  });

  // Get lecturer listings as soon as page loads
  var settings = {
    url: "http://localhost:3000/basic/data",
    method: "GET",
    timeout: 0,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
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
    });

  // Search for items on button click
  $("#search-button").on("click", (event) => {
    event.preventDefault();
    basicDataQuery.facultyId = $("#faculty-id").val();
    basicDataQuery.semesterId = $("#semester-id").val();
    basicDataQuery.dayOfWeek = $("#day-of-week").val();
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
        $("#lecture-list-table").empty();
        $(".not-found").removeClass("d-none");
        $("#page-size").attr("value", 0);
      })
      .done((response) => {
        $(".not-found").addClass("d-none");
        const parent = $("#lecture-list-table");
        parent.empty();
        $(".pagination").empty();
        $("#page-size").attr("value", response.length);

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
        });
      });
  });

  $("#clear-button").on("click", (event) => {
    $.ajax(settings)
      .fail((response) => {
        console.log("Getting Lecturer listings failed ;w;");
      })
      .done((response) => {
        let lectures = response.lectures;
        const parent = $("#lecture-list-table");
        parent.empty();
        lectures.forEach((element) => {
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
 /*  $("#basic-data-next-page").on("click", (event) => {
    console.log($("#basic-data-next-page"));
    
    const fn = $("#basic-data-next-page").attr("fn");
    const value = $("#basic-data-next-page").attr("value")
    basicDataQuery["page"] += 1;
    console.log("meow");

    $.ajax({
      url: "http://localhost:3000/basic/data",
      method: "GET",
      timeout: 0,
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      data: basicDataQuery,
    })
      .done((result) => console.log(result))
      .error((message) => console.log(message));
    // getBasicDataFromBackend((error, data) => {
      // if (error) return alert(error);
      // console.log(data);
      
      // populateBasicDataTable(data);
    });
  }); */

  // $("#basic-data-first-page").on("click", (event) => {
  //   console.log($(this));
    
  //   const fn = $(this).attr("fn");
  //   const value = $(this).attr("value")
  //   paginationFunction[fn](value);
  //   console.log("meow");

  //   getBasicDataFromBackend((error, data) => {
  //     if (error) return alert(error);
  //     console.log(data);
      
  //     // populateBasicDataTable(data);
  //   });
  // });

/*   $("#basic-data-previous-page").on("click", (event) => {
    console.log($('#basic-data-previous-page') );
    
    const fn = $('#basic-data-previous-page').attr("fn");
    const value = $('#basic-data-previous-page').attr("value")
    paginationFunction[fn](value);
    console.log("meow");

    getBasicDataFromBackend((error, data) => {
      if (error) return alert(error);
      console.log(data);
      
      // populateBasicDataTable(data);
    });
  }); */

  // $("#basic-data-last-page").on("click", (event) => {
  //   console.log($(this));
    
  //   const fn = $(this).attr("fn");
  //   const value = $(this).attr("value")
  //   paginationFunction[fn](value);
  //   console.log("meow");

  //   getBasicDataFromBackend((error, data) => {
  //     if (error) return alert(error);
  //     console.log(data);
      
  //     // populateBasicDataTable(data);
  //   });
  // });

  // $("#page-size").on("click", (event) => {
  //   console.log($(this));
    
  //   const fn = $(this).attr("fn");
  //   const value = $(this).val();
  //   paginationFunction[fn](value);
  //   console.log("meow");

  //   getBasicDataFromBackend((error, data) => {
  //     if (error) return alert(error);
  //     console.log(data);
      
  //     // populateBasicDataTable(data);
  //   });
  // });
});
