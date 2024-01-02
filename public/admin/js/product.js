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
