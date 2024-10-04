var mongoose = require("mongoose");
var Schema = mongoose.Schema;

// create a new schema
var VehicleSchema = new Schema({
    make: String,
    model: String,
    color: String
});

// export this ... so we can pull it up from another location
module.exports = mongoose.model("Vehicle", VehicleSchema);

