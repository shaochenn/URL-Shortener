const express = require('express')
const mongoose = require('mongoose') // 載入 mongoose
const exphbs = require('express-handlebars');
const shortenURL = require('./shortenURL')
const bodyParser = require('body-parser')
const Link = require('./models/link')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const app = express()

app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static("public"))

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })

// 取得資料庫連線狀態
const db = mongoose.connection
// 連線異常
db.on('error', () => {
  console.log('mongodb error!')
})
// 連線成功
db.once('open', () => {
  console.log('mongodb connected!')
})

// 設定首頁路由
app.get('/', (req, res) => {
  res.render('index')
})

app.post('/', (req, res) => {
  const originURL = req.body.originURL
  const shortURL = shortenURL()
  if(!originURL){

  } else {
    Link.findOne({ originURL }) //若使用者輸入相同網址，便回傳相同縮網址
      .lean()
      .then(link => {
        return link ? link : Link.create({originURL, shortURL}) 
      })
      .then(link => res.render('result', { origin: req.headers.origin, short: link.shortURL }))
      .catch(error => console.error(error))
  }
})

app.get('/:shortCode', (req, res) => {
  const shortURL = req.params.shortCode

  Link.findOne({ shortURL })
    .then(link => res.redirect(link.originURL))
    .catch(error => console.error(error))
})

// 設定 port 3000
app.listen(3000, () => {
  console.log('App is running on http://localhost:3000')
})