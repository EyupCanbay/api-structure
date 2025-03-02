const { param } = require("../app");

/* GET home page. */
function index(req, res, next) {
  console.log("Index route");
  res.json({
    body: req.body,
    query: req.query,
    params: req.params,
    headers: req.headers,
    cookies: req.cookies,
  });
  
}      

module.exports = {index};