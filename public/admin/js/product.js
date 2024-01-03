// Change Status
// find all STATUS
const buttonChangeStatus = document.querySelectorAll("[button-change-status]");

if (buttonChangeStatus.length > 0) {
  // form
  const formChangeStatus = document.querySelector("#form-change-status");
  // console.log(formChangeStatus)
  const path = formChangeStatus.getAttribute("data-path");
  // console.log(path)

  buttonChangeStatus.forEach((button) => {
    button.addEventListener("click", () => {
      const statusCurrent = button.getAttribute("data-status");
      const id = button.getAttribute("data-id");

      // change status
      let statusChange = statusCurrent == "active" ? "inactive" : "active";

      const action = path + `/${statusChange}/${id}?_method=PATCH`;
      // change action = [oldAction/:status/:id]
      formChangeStatus.action = action;

      formChangeStatus.submit();
    });
  });
}
// End Change Status

// DELETE ITEM
const buttonDelete = document.querySelectorAll("[button-delete]");
if (buttonDelete) {
  // form delete item
  const formDeleteItem = document.querySelector("#form-delete-item");
  const path = formDeleteItem.getAttribute("data-path");

  // button delete
  buttonDelete.forEach((button) => {
    button.addEventListener("click", () => {
      // console.log(button);
      const isConfirm = confirm("Ban co chac muon xoa san pham ko");
      if (isConfirm) {
        const id = button.getAttribute("data-id");

        const action = `${path}/${id}?_method=DELETE`;

        // console.log(`${path}/${id}?_method=DELETE`)

        formDeleteItem.action = action

        formDeleteItem.submit();
      }
    });
  });
}
// END DELETE ITEM
