
module.exports = function routes(app) {
  app.get('*', function(req, res) {
    console.log(123123);
    res.sendfile('views/index.html');

  });


}