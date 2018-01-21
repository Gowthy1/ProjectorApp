var MongoClient = require('mongodb').MongoClient;

exports.createConnection =function(){
  MongoClient.connect("mongodb://gowthy:gowthy@ds263847.mlab.com:63847/projector007").then(function(client){
    console.log("Connected to mongoDb");
    exports.database = client.db("projector007");

  });
}
