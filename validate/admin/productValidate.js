module.exports.createPost = (req, res, next) => {
  if (!req.body.title.trim()) {
    req.flash("error", "Vui lòng nhập tiêu đề");
    res.redirect(`back`);
    return;
  }

  // console.log("oke")
  // next: đi tiếp
  next();
};
