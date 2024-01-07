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

// CHECK BOX
const checkBoxMulti = document.querySelector("[checkbox-multi]");
if (checkBoxMulti) {
  // input checkall
  const inputCheckAll = checkBoxMulti.querySelector("input[name='checkall']");
  // input id
  const inputsId = checkBoxMulti.querySelectorAll("input[name='id']");

  // logic check all
  inputCheckAll.addEventListener("click", () => {
    if (inputCheckAll.checked) {
      // check tất cả
      inputsId.forEach((input) => {
        input.checked = true;
      });
    } else {
      // bỏ check tất cả
      inputsId.forEach((input) => {
        input.checked = false;
      });
    }
  });

  // logic từng cái input
  inputsId.forEach((input) => {
    input.addEventListener("click", () => {
      const countChecked = checkBoxMulti.querySelectorAll(
        "input[name='id']:checked"
      ).length;
      // console.log(countChecked);
      // console.log(inputsId.length);

      //
      if (countChecked == inputsId.length) {
        inputCheckAll.checked = true;
      } else {
        inputCheckAll.checked = false;
      }
    });
  });

  // console.log(inputCheckAll.name);
  // console.log(inputsId);
}
// END CHECK BOX

// FORM CHANGE MULTI
const formChangeMulti = document.querySelector("[form-change-multi]");
// console.log(formChangeMulti)
if (formChangeMulti) {
  formChangeMulti.addEventListener("submit", (e) => {
    e.preventDefault();

    const checkBoxMulti = document.querySelector("[checkbox-multi]");
    const inputChecked = checkBoxMulti.querySelectorAll(
      "input[name='id']:checked"
    );

    // check type of SELECTED
    const typeChange = e.target.elements.type.value;
    // console.log(typeChange)

    if (typeChange == "delete-all") {
      const isConfirm = confirm(
        "Bạn có chắc chắn muốn xóa NHỮNG sản phảm này hay không"
      );

      // nếu KHÔNG ĐỒNG Ý => NHỮNG DÒNG CODE SAU KO XÉT NỮA
      if (!isConfirm) {
        return;
      }
    }

    if (inputChecked.length > 0) {
      let ids = [];
      const inputIds = formChangeMulti.querySelector("input[name='ids']");

      inputChecked.forEach((input) => {
        const id = input.value;

        // CHANGE POSITION
        if (typeChange == "change-position") {
          // Bài toán: Muốn đứng từ 1 thằng td con nhảy sang thằng tr cha => lấy thằng
          // td con KHÁC cùng cha
          const position = input
            .closest("tr")
            .querySelector("input[name='position']").value;

          // console.log(position);

          ids.push(`${id}-${position}`);
        } else {
          ids.push(id);
        }
      });

      inputIds.value = ids.join(", ");
      // console.log(inputIds.value)

      formChangeMulti.submit();
    } else {
      alert("Vui long chon it nhat 1 ban ghi");
    }
  });
}
// END FORM CHANGE MULTI

// SHOW ALERT
const showAlert = document.querySelector("[show-alert]");
console.log(showAlert);

if (showAlert) {
  const time = parseInt(showAlert.getAttribute("data-time"));

  setTimeout(() => {
    showAlert.classList.add("alert-hidden");
  }, time);

  const closeAlert = showAlert.querySelector("[close-alert]");
  if (closeAlert) {
    showAlert.addEventListener("click", () => {
      showAlert.classList.add("alert-hidden");
    });
  }
}
// END SHOW ALERT

// UPLOAD IMAGE
const uploadImage = document.querySelector("[upload-image]");
if (uploadImage) {
  // input => give a FAKE LINK => GIVE IMAGE
  const uploadImageInput = uploadImage.querySelector("[upload-image-input]");
  // img => preview
  const uploadImagePreview = uploadImage.querySelector(
    "[upload-image-preview]"
  );
  const deleteImageButton = uploadImage.querySelector("[delete-image-button]");

  // change
  uploadImageInput.addEventListener("change", (e) => {
    // console.log(e.target.files);
    // const times = ["10", "50", "20"];
    // const [hour] = times; => cấu trúc destructuring => phá vỡ cấu trúc
    const file = e.target.files[0];
    if (file) {
      // URL.createObjectURL(file): tạo 1 cái link ảnh tạm thời
      uploadImagePreview.src = URL.createObjectURL(file);

      // delete image
      if (deleteImageButton) {
        deleteImageButton.addEventListener("click", (e) => {
          e.preventDefault();

          uploadImageInput.value = "";
          uploadImagePreview.src = "";
        });
      }
    }
  });
}
// END UPLOAD IMAGE
