const express = require('express');
const bodyParser = require('body-parser');
const pinyin = require('pinyin');
const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(bodyParser.json());

app.get('/', function(req, res) {
  res.send('Hello World')
})

app.get('/api/pinyin/v1', function(req, res) {
  var origin = req.query.origin || '';

  res.json({
    origin: origin,
    to: {
      normal: pinyin(origin, {
        style: pinyin.STYLE_NORMAL,
        heteronym: false
      }),
      tone: pinyin(origin, {
        style: pinyin.STYLE_TONE,
        heteronym: false
      }),
      normal_heteronym: pinyin(origin, {
        style: pinyin.STYLE_NORMAL,
        heteronym: true
      }),
      tone_heteronym: pinyin(origin, {
        style: pinyin.STYLE_TONE,
        heteronym: true
      })
    }
  });
});

var server = app.listen(process.env.PORT || 8010, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});
