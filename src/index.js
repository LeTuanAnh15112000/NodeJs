const express = require('express');
const morgan = require('morgan');
const { engine } = require('express-handlebars'); // Correct import for express-handlebars
const path = require('path'); // Import the path module
const sass = require('sass');
const fs = require('fs'); // Import the file system module
const app = express();
const port = 3000;
const route = require('./routes/index'); // Import the routes module

// Define the SCSS file path
const scssFilename = path.join(__dirname, 'resources', 'scss', 'app.scss');
const cssOutputPath = path.join(
  __dirname,
  'resources',
  'public',
  'css',
  'app.css',
);

// Compile SCSS to CSS
const result = sass.compile(scssFilename, { style: 'expanded' });
fs.writeFileSync(cssOutputPath, result.css); // Save the compiled CSS to a file

// Serve static files
app.use(express.static(path.join(__dirname, 'resources', 'public')));

// Http logger
app.use(morgan('combined'));

// Template engine setup
app.engine(
  '.hbs',
  engine({
    extname: '.hbs',
    defaultLayout: 'main', // Đặt layout mặc định là main.hbs
    layoutsDir: path.join(__dirname, 'resources', 'views', 'layouts'), // Thư mục chứa layouts
  }),
);
app.set('view engine', '.hbs'); // Set the default view engine to .hbs
app.set('views', path.join(__dirname, 'resources', 'views')); // Correct path.join usage

app.use(express.urlencoded({ extended: true })); // Middleware to parse URL-encoded bodies

route(app); // Initialize routes

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
