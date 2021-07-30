const express = require('express');

const app = express();
const PORT = process.env.PORT || 3001;

// Sets up the Express app to handle data parsing
//client parse results stored in req.body for use with post/put/delete
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.use(express.static('public'));

//add routing for html/output and api/data sharing
app.use(require("./routes/api.js"));
app.use(require("./routes/html.js"));



//add listener for server port with 'ready' feedback/port #
app.listen(PORT, () => console.log(`App listening on PORT ${PORT}`));