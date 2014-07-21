var express = require('express');
var router = express.Router();

/*GET links from mongo*/
router.get('/articles', function(req, res) {
    var db = req.db;
    var collection = db.get('usercollection');
    collection.find({type:"link"},{sort:[["score","desc"]]},function(e,docs){
        res.render('articles', {
            "articles" : docs
        });
    });
});


/*POST links to mongo */
router.post('/articles',function(req,res){

	var db = req.db;
	var url = req.body.url;
	var title = req.body.title;
	var currentTime = new Date();
	var collection = db.get('usercollection');

	res.setHeader('Content-Type', 'application/json');
    		
	collection.insert({
		"url" : url,
		"title": title,
		"votes": 0,
		"date": currentTime,
		"score":2.0,
		"type":"link"
	},function(err,doc){
		if(err){
			res.send("Post Failed");
		}
		else{
			res.json();
		}
	});

});

/* GET Default mapping*/
router.get('/', function(req, res) {
  res.send('alive');
});

/*POST links to newsDB */
router.post('/addarticle',function(req,res){

	var db = req.db;

	var url = req.body.url;
	var title = req.body.title;
	var votes = req.body.votes;
	var currentTime = new Date();

	var collection = db.get('usercollection');

	collection.insert({
		"url" : url,
		"title": title,
		"votes": 0,
		"date": currentTime,
		"score":2,
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

/*Add links for articles from newsDB*/
router.get('/newarticle', function(req, res) {
    res.render('newarticle', { title: 'Add New Article' });
});

module.exports = router;