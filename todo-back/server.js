const express = require('express');
const bodyParser = require('body-parser');
const categoryRoutes = require('./src/routes/category.routes')
const taskListRoutes = require('./src/routes/taskList.routes')
var cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.get('/', (req, res) => {
  res.send("Hello World");
});
// using as middleware
app.use('/api/category', categoryRoutes)
app.use('/api/taskList', taskListRoutes)
// listen for requests
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});