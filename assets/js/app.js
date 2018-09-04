let emotions = ['happy', 'sad', 'angry', 'excited', 'nervous', 'scared']
let rating = ''
let stillGifUrl = ''
let gifUrl = ''
let title = ''
let info = {}
let limit = 10
let offset = 0

$(document).ready(function () {
  const append = (elm, content) => $(elm).append(content)
  const button = x => "<button type='button' class='emotion btn btn-dark m-2'>" + x + '</button>'
  const newEmotion = () => $('#newEmotion').val().toLowerCase()
  const addToArray = function (x) {
    emotions = emotions.concat(x)
  }
  const addNewButton = () => emotions.forEach(x => append('.buttons', button(x)))
  const empty = x => $(x).empty()
  const getText = (x) => $(x).text()
  const setText = (x, y) => $(x).text(y)
  const setAttr = (elm, attr, str) => $(elm).attr(attr, str)
  const getAttr = (elm, attr) => $(elm).attr(attr)
  const html = (elm, str) => $(elm).html(str)
  let searchString = ''

  $(document).on('click', '#submit', function () {
    /* ADD VALIDATION OF INPUT */
    empty('.buttons')
    addToArray(newEmotion())
    addNewButton()
  })

  addNewButton()

  const apiKey = 'bpkQwq73xVYAAVhMnuooa6rnvD0fTDKA'
  const setVars = function (x) {
    rating = x.rating
    stillGifUrl = x.images.fixed_width_still.url
    gifUrl = x.images.fixed_width.url
    title = x.title
  }

  const displayGif = function (x, i) {
    let id = i + offset
    let newHtml = "<div class='col p-2 border border-dark m-2' id=" + id + "><p class='title'>" + title + "</p><img src='" + stillGifUrl + "' placeholder='" + gifUrl + "'/><p class='rating'>Rating: " + rating + '</p></div>'
    append('#gifDisplay', newHtml)
  }

  const displayAll = function (x, i) {
    setVars(x)
    displayGif(x, i)
  }

  const apiCall = function (x) {
    let queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + x + '&limit=' + limit + '&rating=pg-13' + '&offset=' + offset
    $.ajax({
      url: queryUrl,
      method: 'GET'
    }).then(function (response) {
      info = response.data
      info.forEach((x, i) => displayAll(x, i))
      offset += 10
    })
  }

  $(document).on('click', '.emotion', function () {
    empty('#gifDisplay')
    searchString = getText(this)
    apiCall(searchString)
  })

  $(document).on('click', '#add12', function () {
    apiCall(searchString)
  })

  $(document).on('click', 'div>img', function () {
    let temp = getAttr(this, 'src')
    setAttr(this, 'src', getAttr(this, 'placeholder'))
    setAttr(this, 'placeholder', temp)
  })
})
