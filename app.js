const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser({extended:true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
  const client = require("@mailchimp/mailchimp_marketing");

client.setConfig({
  apiKey: "e51d4fa0fb5a87753a35b98b897caedc-us18",
  server: "us18",
});

const run = async () => {
  const response = await client.lists.batchListMembers("9dd5c8e23e", {
    members: [{
      email_address: req.body.email,
      status: "subscribed",
      merge_fields: {
                FNAME: req.body.fName,
                LNAME: req.body.sName
              }
    }],
  });
  console.log(response);
  if(response.error_count != 0 ){
    res.send("Failure");
  }
  else{
    res.send("Successfully added");
  }
};
run();

});

app.listen(3000, function(){
  console.log("Started at 3000");
});


// e51d4fa0fb5a87753a35b98b897caedc-us18
// audience id : 9dd5c8e23e
