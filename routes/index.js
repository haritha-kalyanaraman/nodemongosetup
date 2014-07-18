var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
    res.render('helloworld', { title: 'Hello, World!' })
});

/* GET Userlist page. */
router.get('/userlist', function(req, res) {
    var db = req.db;
    console.log("sdfdsfsdf"+db)
    var collection = db.get('usercollection');
    collection.find({},{},function(e,docs){
        res.render('userlist', {
            "userlist" : docs
        });
    });
});


/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to Add User Service */
router.post('/adduser', function(req, res) {

    // Set our internal DB variable
    var db = req.db;

    // Get our form values. These rely on the "name" attributes
    var userName = req.body.username;
    var userEmail = req.body.useremail;

    // Set our collection
    var collection = db.get('usercollection');

    // Submit to the DB
    collection.insert({
        "username" : userName,
        "email" : userEmail
    }, function (err, doc) {
        if (err) {
            // If it failed, return error
            res.send("There was a problem adding the information to the database.");
        }
        else {
            // If it worked, set the header so the address bar doesn't still say /adduser
            res.location("userlist");
            // And forward to success page
            res.redirect("userlist");
        }
    });
});

/*GET links for articles*/
router.get('/articles', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({type:"link"},{sort:[["score","desc"]]},function(e,docs){
        res.render('articles', {
            "articles" : docs
        });
    });
});


/*Add links for articles from newsDB*/
router.get('/newarticle', function(req, res) {
    res.render('newarticle', { title: 'Add New Article' });
});


/*POST links to newsDB */
router.post('/addarticle',function(req,res){

	var db = req.db;

	var url = req.body.url;
	var title = req.body.title;
	var votes = req.body.votes;
	var date = req.body.postDate;

	var collection = db.get('usercollection');

	collection.insert({
		"url" : url,
		"title": title,
		"votes": 3,
		"date": 2014-05-21,
		"score":1.3,
		"type":"link"
	},function(err,doc){
		if(err){
			res.send("post to db failed");
		}
		else{
			res.location("articles");
			res.redirect("articles")
		}
	});

});



module.exports = router;


