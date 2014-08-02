/*
run as a seperate node process. 
	$ node node_mongo_update
This is run hourly to update the scores of each article
Should this be run hourly?
*/
var minutes = 60, the_interval = minutes * 60 * 1000;
setInterval(function() {
  console.log("Do Mongo hourly update here");
}, the_interval);