// import express
var express = require("express");
//create our app
var app = express();

// body parser
var bodyParser = require("body-parser");
// mongoose 
var mongoose = require("mongoose");
// import model
var Vehicle = require("./app/models/vehicle")


// Configuring app for bodyParser()
// grabbing data from the body of POST
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// setting app port for server to listen on
// setting env variables or use port 3000
var port = process.env.PORT || 3000;  

// connect to DB ...mongodb listen on port 27017
mongoose.connect("mongodb://localhost:27017/letscode");

// API Routes ... use express routers will mostly be used 
var router = express.Router();

// Routes prefixed with /api
app.use("/api", router);

// MIDDLEWARE
// Middleware very useful for doing validations. We can log
// things from here or stop the request from continuing in the event
// that the request is not safe.
// middleware to use for all requests
// activated before request gets to the rout and do some validations
router.use(function(req, res, next){
    console.log("Processing currently on going...FYI!")
    next(); // pushes request to rout
});



// set up a simple Test Route 
router.get("/", function(req, res){
    res.json({message: "Welcome to our API!"})
});

// first rout 
router.route("/vehicles") // api/vehicles
    .post(function(req, res){
        var vehicle = new Vehicle(); // new instance of a vehicle
        vehicle.make = req.body.make;
        vehicle.model = req.body.model;
        vehicle.color = req.body.color;

        // vehicle.save(function(err){
            // if (err) {
            //     res.send(err);
            // } 
            
            // res.json({message: "Vehicle was successfully manufactured."})
        vehicle.save()    
            .then(() => {
                res.json({ message: "Vehicle was successfully manufactured." });
            })
            .catch((err) => {
                res.status(500).send(err); 
        });
    })

    .get(function(req, res){
        Vehicle.find()
        .then(vehicles => {
            res.json(vehicles); // Return the found vehicles
        })
        .catch(err => {
            res.status(500).send(err); // Handle any errors
        });

    //    Vehicle.find(function(err, vehicles){
    //         if (err) {
    //             res.status(500).send(err);
    //         } else {
    //             res.json(vehicles);
    //         }   
    //     })
    });



// rout to find vehicle for id, color and make
router.route("/vehicle/:vehicle_id")
    .get(function(req, res){
        Vehicle.findById(req.params.vehicle_id)
            .then(vehicle => {
                if (!vehicle) {
                    return res.status(404).json({ message: "Vehicle not found" });
                }
                res.json(vehicle); // Return the found vehicle
            })
            .catch(err => {
                res.status(500).send(err); // Handle any errors
            });

        // Vehicle.findById(req.params.vehicle_id, function(err, vehicle){
        //     if (err) {
        //         return res.status(500).send(err);
        //     }
        //     if (!vehicle) {
        //         return res.status(404).json({ message: "Vehicle not found" });
        //     }
        //     res.json(vehicle); // return found vehicle
        // });
    });

// make
router.route("/vehicle/make/:make")
    .get(function(req, res){
        Vehicle.find({ make: req.params.make })
            .then(vehicles => {
                if (!vehicles.length) {
                    return res.status(404).json({ message: "No vehicles found with this make" });
                }
                res.json(vehicles); // Return found vehicles
            })
            .catch(err => {
                res.status(500).send(err); // Handle any errors
            });
        // Vehicle.find({make:req.params.make}, function(err, vehicle){
        //     if (err) {
        //         return res.status(500).send(err);
        //     }
        //     if (!vehicles.length) {
        //         return res.status(404).json({ message: "No vehicles found with this make" }); // Return 404 if no vehicles are found
        //     }
        //     res.json(vehicle); // return found vehicles
        // });
    });

// color
router.route("/vehicle/color/:color")
    .get(function(req, res){
        Vehicle.find({ color: req.params.color })
            .then(vehicles => {
                if (!vehicles.length) {
                    return res.status(404).json({ message: "No vehicles found with this color" });
                }
                res.json(vehicles);
            })
            .catch(err => {
                res.status(500).send(err); // Catch and handle errors
            });
        // Vehicle.find({color:req.params.color}, function(err, vehicle){
        //     // if (err) {
        //     //     res.send(err);
        //     // }
        //     // res.json(vehicle);
        //     if (err) {
        //         return res.status(500).send(err); 
        //     }
        //     if (!vehicles.length) {
        //         return res.status(404).json({ message: "No vehicles found with this color" }); 
        //     }
        //     res.json(vehicles); 
        // })
    });




// fire up server ... app is an instance of express
// so express is listening on port env or 3000
app.listen(port);
// print friendly message to console
console.log("Server listening on port " + port)