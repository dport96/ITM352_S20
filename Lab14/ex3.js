var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");

var user_info_file = './user_data.json';

if (fs.existsSync(user_info_file)) {
    var file_stats = fs.statSync(user_info_file);
    
    var data = fs.readFileSync(user_info_file, 'utf-8');
    var userdata = JSON.parse(data);
  
    console.log(`${user_info_file} has ${file_stats.size} characters`);
} else {
    console.log("hey! " + user_info_file + " doesn't exist!");
}

app.use(myParser.urlencoded({ extended: true }));

app.get("/login", function (request, response) {
    console.log(request.query); // print out q-str
    // Give a simple login form
    str = `
<body>
<h1>${request.query["error"]}</h1>
<form action="/check_login?quantity=999" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" value=${request.query["username"]} ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
 });

app.post("/check_login", function (request, response) {
    // Process login form POST and redirect to logged in page if ok, back to login page if not
  console.log(request.query);
  var err_str = "";
  var login_username = request.body["username"];
  // check if username exists in reg data. If so, check if password matches
  if(typeof userdata[login_username] != 'undefined') {
      var user_info = userdata[login_username];
      // check if password stored for username matches what user typed in
      if(user_info["password"] != request.body["password"]) {
            err_str = `bad_password`;
      } else {
        response.end(`${login_username} is logged in with data ${JSON.stringify(request.query)}`);
        return;
      }
      
  } else {
          err_str = `bad_username`; 
  }
  response.redirect(`./login?username=${login_username}&error=${err_str}`);
});

app.listen(8080, () => console.log(`listening on port 8080`));
