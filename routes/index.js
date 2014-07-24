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
		"score":1.0,
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


/*POST increment vote count */
router.post('/vote',function(req,res){
	var db = req.db;
	var votedUrl = req.body.url;
	var currentTime = new Date();

	res.setHeader('Content-Type', 'application/json');

	var collection = db.get('usercollection');
	collection.update({
	 	"url": votedUrl 
	 			},
	   {
      	$inc: { votes: 1 }
   		},
  	   { upsert: true }
  	   ,function(err,doc){
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


/*Add links for articles from newsDB*/
router.get('/newarticle', function(req, res) {
    res.render('newarticle', { title: 'Add New Article' });
});


module.exports = router;