const mongoose = require('mongoose');

const dbName="PODCASTAPP"
const url=`mongodb+srv://shivani:1234@cluster0.7krbziw.mongodb.net/${dbName}?retryWrites=true&w=majority`;

//promise

mongoose.connect(url)
.then((result) => {
    console.log('database connected');
})
.catch((err) => {
    console.log(err);
});

module.exports=mongoose;