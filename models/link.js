const mongoose = require('mongoose')
const Schema = mongoose.Schema
const linkSchema = new Schema({
  originURL: {
    type: String, // 資料型別是字串
    required: true // 這是個必填欄位
  },
  shortURL: {
    type: String,
    required: true
  }
})
module.exports = mongoose.model('Link', linkSchema)