let emotions = ['happy', 'sad', 'angry', 'excited', 'nervous', 'scared']

$(document).ready(function () {
  const append = (elm, content) => $(elm).append(content)
  const button = x => "<button type='button' class='emotion btn btn-dark mx-2'>" + x + '</button>'
  const newEmotion = () => $('#newEmotion').val().toLowerCase()
  const addToArray = function (x) {
    emotions = emotions.concat(x)
  }
  const addNewButton = () => emotions.forEach(x => append('.buttons', button(x)))
  const empty = x => $(x).empty()
  const getText = x => $(x).text()
  let searchString = ''

  $(document).on('click', '#submit', function () {
    /* ADD VALIDATION OF INPUT */
    empty('.buttons')
    addToArray(newEmotion())
    addNewButton()
  })

  addNewButton()

  const apiKey = 'bpkQwq73xVYAAVhMnuooa6rnvD0fTDKA'

  const apiCall = function (x) {
    let queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + apiKey + '&q=' + x + '&limit=12'
    $.ajax({
      url: queryUrl,
      method: 'GET'
    }).then(function (response) {
      let rating = response.rating
      let title = response.title
      let stillGifUrl = response.images.orginal_still.url
      let gifUrl = response.images.original.url
      console.log(response)
    })
  }
  $(document).on('click', '.emotion', function () {
    searchString = getText(this)
    apiCall(searchString)
  })
})
