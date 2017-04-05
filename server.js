var express = require('express');
var app = new express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://node:node@ds151070.mlab.com:51070/salt_scanner_db');
//mongoose.connect('mongodb://node:node@novus.modulusmongo.net:27017/Iganiq8o'); // connect to our database
app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
var router = express.Router();
var Bear = require('./models/bear');


var port = process.env.PORT || 8080;


router.use(function(req, res, next){
	console.log('Something is happening');
 	next();
});
// router.route('/bears')
// 	.post(function(req,res){
// 	var bear = new Bear();
// 	bear.name = req.body.name;

// 	bear.save(function(err){
// 		if(err){
// 			res.send(err +"Some thing is happening");
// 		}
// 		res.json({ message: 'Bear created!' });
// 	});

// }).get(function(req,res){
// 	Bear.find(function(err, bears){
// 		if(err){
// 			res.send(err);
// 		}
// 		res.json(bears);
// 	})
// });
// router.route('/bears/:bear_id').get(function(req, res){
// 	Bear.findById(req.params.bear_id, function(err,bear){
// 		if (err){
// 			res.send(err);
// 		}
// 		res.json(bear);
// 	})
// }).put(function(req,res){
// 	Bear.findById(req.params.bear_id, function(err,bear){
// 		if(err){
// 			res.send(err);
// 		}
// 		bear.name = res.body.name;
// 		console.log("Bear name: "+beer.name);
// 		bear.save(function(err){
// 			if(err){
// 				res.send(err);
// 			}
// 			res.json({message: "Bear updated"});
// 		});
// 	});
// }).delete(function(req, res) {
//     Bear.remove({ _id: req.params.bear_id }, function(err, bear) {
//         if (err){
//             res.send(err);
//         }
//         res.json({ message: 'Successfully deleted' });
//     });
// });
// /*router.get("/", function(req, res){
// 	res.json({message: "Some stuff!"});
// });*/

router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });   
});

router.route('/bears')
    // create a bear (accessed at POST http://localhost:8080/api/bears)
    .post(function(req, res) {
        
        var bear = new Bear();      // create a new instance of the Bear model
        bear.name = req.body.name;  // set the bears name (comes from the request)

        // save the bear and check for errors
        bear.save(function(err) {
            if (err)
                res.send(err);

            res.json({ message: 'Bear created!' });
        });
        
    });
//prefix all routes with /api
app.use("/api", router);

// START THE SERVER
// =============================================================================

app.listen(port);
console.log("This is where the magic lives "+port+" port number");


