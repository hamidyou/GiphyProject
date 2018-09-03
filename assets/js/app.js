let emotions = ['happy', 'sad', 'angry', 'excited', 'nervous', 'scared']
let rating = ''
let stillGifUrl = ''
let gifUrl = ''
let info = {}

$(document).ready(function () {
  const append = (elm, content) => $(elm).append(content)
  const button = x => "<button type='button' class='emotion btn btn-dark mx-2'>" + x + '</button>'
  const newEmotion = () => $('#newEmotion').val().toLowerCase()
  const addToArray = function (x) {
    emotions = emotions.concat(x)
  }
  const addNewButton = () => emotions.forEach(x => append('.buttons', button(x)))
  const empty = x => $(x).empty()
  const getText = (x) => $(x).text()
  const setText = (x, y) => $(x).text(y)
  const setAttr = (elm, attr, str) => $(elm).attr(attr, str)
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
    title = x.title
    stillGifUrl = x.images.fixed_width_still.url
    gifUrl = x.images.original.url
  }

  const displayGif = function (x, i) {
    let id = '#' + i
    setAttr(id + ' img', 'src', stillGifUrl)
    setText(id + ' .rating', 'Rating: ' + rating)
  }

  const displayAll = function (x, i) {
    setVars(x)
    displayGif(x, i)
  }

  const apiCall = function (x) {
    let queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + x + '&limit=12&rating=pg-13'
    $.ajax({
      url: queryUrl,
      method: 'GET'
    }).then(function (response) {
      info = response.data
      info.forEach((x, i) => displayAll(x, i))
    })
  }

  $(document).on('click', '.emotion', function () {
    searchString = getText(this)
    apiCall(searchString)
    console.log(searchString)
    // console.log(rating)
    // console.log(title)
    // console.log(stillGifUrl)
    // console.log(gifUrl)
  })
})
