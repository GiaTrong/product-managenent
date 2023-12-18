// button status
const buttonStatus = document.querySelectorAll("[button-status]")

if(buttonStatus.length > 0) {
    // give a URL
    // and if you want to change or have a action with URL
    // we have to use NEW URL(http.....)
    let url = new URL(window.location.href);

    buttonStatus.forEach(item => {
        item.addEventListener("click", () => {
            const status = item.getAttribute("button-status")
            // console.log(status)

            if(status) {
                // những cái sau dấu hỏi => ngta gọi là searchParams
                // if you have status, you will change the url
                url.searchParams.set("status", status);
            } else {
                // or you dont have, remove KEY status in URL 
                url.searchParams.delete("status");
            }

            // console.log(url.href)

            // câu lệnh chuyển hướng
            window.location.href = url.href
        })
    })
}