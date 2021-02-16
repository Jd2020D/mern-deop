const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
mongoose.connect("mongodb://localhost/teamManagerDB", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("Established a connection to the database"))
    .catch(err => console.log("Something went wrong when connecting to the database", err));
