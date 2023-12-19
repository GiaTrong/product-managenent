// button status
const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
  // give a URL
  // and if you want to change or have a action with URL
  // we have to use NEW URL(http.....)
  let url = new URL(window.location.href);

  buttonStatus.forEach((item) => {
    item.addEventListener("click", () => {
      const status = item.getAttribute("button-status");
      // console.log(status)

      if (status) {
        // những cái sau dấu hỏi => ngta gọi là searchParams
        // if you have status, you will change the url
        url.searchParams.set("status", status);
      } else {
        // or you dont have, remove KEY status in URL
        url.searchParams.delete("status");
      }

      // console.log(url.href)

      // câu lệnh chuyển hướng
      window.location.href = url.href;
    });
  });
}

// end btn status

// FORM SEARCH
const formSearch = document.querySelector("#form-search");

// console.log(formSearch)
if (formSearch) {
  //
  let url = new URL(window.location.href);

  formSearch.addEventListener("submit", (e) => {
    // prevent move page
    e.preventDefault();
    //
    const keyword = e.target.elements.keyword.value;
    //
    if (keyword) {
      // những cái sau dấu hỏi => ngta gọi là searchParams
      // if you have status, you will change the url
      url.searchParams.set("keyword", keyword);
    } else {
      // or you dont have, remove KEY status in URL
      url.searchParams.delete("keyword");
    }

    // câu lệnh chuyển hướng
    window.location.href = url.href;
  });
}
// END FORM SEARCH

// PAGINATION
const buttonPagination = document.querySelectorAll("[button-pagination]");
if (buttonPagination) {
  let url = new URL(window.location.href);

  buttonPagination.forEach((button) => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      //   console.log(page);

      url.searchParams.set("page", page);

      // câu lệnh chuyển hướng
      window.location.href = url.href;
    });
  });
}
// END PAGINATION
