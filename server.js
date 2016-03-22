var port = 80;
var express = require('express');
var app = express();
var dirs = ['js', 'css', 'img', 'bower_components', 'partials'];
var dirname, i;


app.set('views', __dirname + '/');

app.engine('html', require('ejs').renderFile);

app.get('/', function (req, res) {
  res.render('index.html');
})

for (i = 0; i < dirs.length; i++) {
	dirname = ['/', dirs[i]].join('');
	app.use(dirname, express.static(__dirname + dirname));
}

app.listen(port, function() {
  console.log('listening at port: %s', port);
});