const express = require('express');
const connectDB = require('./db/connection.js');
const cors = require('cors');
const projects = require('./Routes/ProjectsRotutes.js')
const Blogs = require('./Routes/Blogs.jsx')
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const PORT = process.env.PORT || 3000;


connectDB();

app.use(express.json());
app.use(cors());

app.use('/api/',projects );
app.use('/api/', Blogs );


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
