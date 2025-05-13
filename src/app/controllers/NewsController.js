class NewsController {
  // [GET] /news
  index(req, res) {
    res.render('news'); // Render the news view with the main layout
  }

  show(req, res) {
    res.send('news slug'); // Send a response with the news slug
  }
}

module.exports = new NewsController(); // Export an instance of the NewsController class
