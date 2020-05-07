var fs = require('fs');
var express = require('express');
var app = express();
var myParser = require("body-parser");

var user_info_file = './user_data.json';
var quantity_str;

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
    quantity_str = request.query;
    // Give a simple login form
    str = `
<body>
<h1>${request.query["error"]}</h1>
<form action="/check_login" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" value=${request.query["username"]} ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="submit" value="Submit" id="submit">
</form>
<a href="./register">New user regsiter</a>
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
    if (typeof userdata[login_username] != 'undefined') {
        var user_info = userdata[login_username];
        // check if password stored for username matches what user typed in
        if (user_info["password"] != request.body["password"]) {
            err_str = `bad_password`;
        } else {
            response.end(`${login_username} is logged in with data ${JSON.stringify(quantity_str)}`);
            return;
        }

    } else {
        err_str = `bad_username`;
    }
    response.redirect(`./login?username=${login_username}&error=${err_str}`);
});

app.get("/register", function (request, response) {
    // Give a simple register form
    str = `
<body>
<form action="/register_user" method="POST">
<input type="text" name="username" size="40" placeholder="enter username" ><br />
<input type="password" name="password" size="40" placeholder="enter password"><br />
<input type="password" name="repeat_password" size="40" placeholder="enter password again"><br />
<input type="email" name="email" size="40" placeholder="enter email"><br />
<input type="submit" value="Submit" id="submit">
</form>
</body>
    `;
    response.send(str);
});

app.post("/register_user", function (request, response) {
    // process a simple register form
    //console.log(request.body);
    username = request.body.username;
    errs = [];
    // check if username is taken

    if (typeof userdata[username] != 'undefined') {
        errs.push("username taken");
    } else {
        userdata[username] = {};
    }
    // is passwrd same as repeat passwrd
    if (request["body"]["password"] != request["body"]["repeat_password"]) {
        errs.push("passwords don't match");
    } else {
        userdata[username].password = request["body"]["password"];
    }
    userdata[username].email = request.body.email;

    console.log(errs.length);
    if (errs.length == 0) {
        fs.writeFileSync(user_info_file, JSON.stringify(userdata));
        response.end(`New user ${username} registered`);
    } else {
        response.end(JSON.stringify(errs));
    }
});

app.listen(8080, () => console.log(`listening on port 8080`));
