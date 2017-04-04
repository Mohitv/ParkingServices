var mongoose = require('mongoose')
require('mongoose-double')(mongoose);
const Schema = mongoose.Schema;
var SchemaTypes = mongoose.Schema.Types;

// Define our model
const parkingSchema = new Schema({
    parkingSlotId : { type: Number, unique: true },
    name : String,
    openTime : Date,
    closeTime : Date,
    parkingId : Number,
    leftPhoto : String,
    rightPhoto : String,
    frontPhoto : String,
    parkingType : String,
    parkingOwner : String,
    collectionAt : String,
    avgParkingWeekday : String,
    avgParkingWeekend : String,
    ticketingSystem : String,
    extraNotes : String,
    geoLocation : {
        type: {type:String},
        coordinates:[{type:SchemaTypes.Double}]
    },
    parkingArea : String,
    parkingAreaType : String,
    deleted : Number,
    createdAt : Date,
    updatedAt : Date,
    parkingSubSlots : [
        {
            parkingSubSlotId : Number,
            parkingType : String,
            capacity : Number,
            collectionModel : String,
            taxiTime : Date,
            autoCheckoutTime : Date,
            autoCheckoutCost : Number,
            parkingLotId : Number,
            bookingSecurity : Number,
            convenienceFee : Number,
            bookingNotes : String,
            plateNumberType : String,
            mobileRequired : String,
            valetName : String,
            lastCheckinUpdateTime : Date,
            insidePhoto : String,
            lostTicketFee : Number,
            challanCost : Number,
            createdAt : Date,
            updatedAt : Date,
            deleted : Number,
            Availability : Number
        }
    ]
});
parkingSchema.index({geoLocation: '2dsphere'});
// Create the model class
const ModelClass1 = mongoose.model('parking', parkingSchema);

// Export the model
module.exports = ModelClass1;
