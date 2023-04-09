const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"

module.exports = () => {
  let result = ""

  for (let i = 0; i < 5; i++) {

    const randomIndex = Math.floor(Math.random() * (characters.length))

    result += characters[randomIndex]
  }
  
  return result
}