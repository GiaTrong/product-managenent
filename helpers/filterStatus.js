// req.query: không có, nên cần truyền từ bên file gọi
module.exports = (query) => {
    // create buttons on BackEnd
  let filerStatus = [
    {
      name: "Tất cả",
      status: "",
      class: ""
    },
    {
      name: "Hoạt động",
      status: "active",
      class: ""
    },
    {
      name: "Dừng hoạt động",
      status: "inactive",
      class: ""
    },
  ]

  // params: status => class: active in button
  if(query.status) {
    const index = filerStatus.findIndex(item => item.status == query.status)
    filerStatus[index].class = "active";
  } else {
    filerStatus[0].class = "active";
  }


  // 
  return filerStatus;
}