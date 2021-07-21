const express = require('express');


const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//results of the data parsing from client with be stored in req.body, to do post(create new entry)
// or put(search for existing entry and update according to id) request

app.use(express.static('public'));

app.use(require("./routes/html.js"))
app.use(require("./routes/api.js"))





app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));