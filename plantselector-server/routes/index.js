var express = require("express");
var router = express.Router();

/* GET home page. Avoid 404s caused by BrowserRouter*/
router.get("/*", function (req, res, next) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

module.exports = router;
