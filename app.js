const http = require('http');
const app = http.createServer()
const io = require('socket.io').listen(app);
const MongoClient = require('mongodb').MongoClient;

const mongoUrl = "mongodb://localhost:27017/mongochat"

const getData=()=> {
  MongoClient.connect(mongoUrl, function (err, db) {
    const collection = db.collection('chats');
    const stream = collection.find({}).sort({message: -1}).limit(5).stream();
    stream.on("data", function (item) {
      io.sockets.emit('dbData', {
        name: item.name,
        message: item.message
      });
      const result = {name: item.name, message: item.message};
      console.log(result);
    });
    stream.on("end", function () {
      console.log("Done loading data");
    });
  });
}


// sync data with mongo every 10 second
setInterval(getData, 10000);


app.listen(8000);

