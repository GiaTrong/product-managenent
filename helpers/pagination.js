// return a object
module.exports = (objectPagination, query, countProduct) => {
    if (query.page) {
        objectPagination.currentPage = parseInt(query.page);
      }
    
      // skip = (trang hiện tại  - 1) * số lượng phần tử mỗi trang
      objectPagination.skip =
        (objectPagination.currentPage - 1) * objectPagination.limitItem;
    
      // amount of page
      const totalPage = Math.ceil(countProduct / objectPagination.limitItem); 
      objectPagination.totalPage = totalPage;

    return objectPagination;
}