// search
module.exports = (query) => {
  // INPUT
  // muốn tìm mà ko cần phải fix cứng giống hệt => REGEX
  let objectSearch = {
    keyword: "",
  }

  if (query.keyword) {
    objectSearch.keyword = query.keyword;

    const regex = new RegExp(objectSearch.keyword, "i"); // "i": tham số thứ 2, KHÔNG PHÂN BIỆT HOA THƯỜNG
    objectSearch.regex = regex;
  }

  //
  return objectSearch;
};
