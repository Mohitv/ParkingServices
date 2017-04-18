/*jshint esversion: 6 */
const mongoose = require('mongoose');
const Parking = require('../models/parking');
const User = require('../models/user');

exports.updateMyBooking = function(req, res, next) {
    const bookingTime = Date.now();
    const validity=Date();
    var availableParking;
    var isBooked;

    if (!req.body.email || !req.body.booking[0].parkingSubSlotId) {
      return res.status(422).send({ error: 'You must provide email and parkingSubSlotId'});
    }
    User.findOneAndUpdate({email:req.body.email},
                          {booking: [{parkingSlotId: req.body.booking[0].parkingSlotId,
                                      parkingSubSlotId: req.body.booking[0].parkingSubSlotId,
                                      bookingtime: bookingTime,
                                      validity: validity
                                    }],
                            vehicle:[{
                                       registrationNumber:req.body.vehicle[0].registrationNumber,
                                       vehicletype:req.body.vehicle[0].vehicletype
                                     }]
                          },
                          {new: true},
                          function(err) {
                              if (err) { return next(err);}
                              //check if booking is available and update
                              Parking.findOne({parkingSlotId:req.body.booking[0].parkingSlotId,
                                              "parkingSubSlots.parkingSubSlotId":req.body.booking[0].parkingSubSlotId},
                                              function(err, parking) {
                                                      if (err) { return next(err);}
                                                        var parkingSubSlot = search(req.body.booking[0].parkingSubSlotId,parking.parkingSubSlots);

                                                        if (parseInt(parkingSubSlot.Availability) > 0)
                                                        {
                                                               availableParking = parseInt(parkingSubSlot.Availability) -1;
                                                               //update
                                                               console.log('update the booking now');
                                                               Parking.findOneAndUpdate({parkingSlotId:req.body.booking[0].parkingSlotId,
                                                                                        "parkingSubSlots.parkingSubSlotId":req.body.booking[0].parkingSubSlotId},
                                                                                        {'$set':{'parkingSubSlots.$.Availability':availableParking}
                                                                                        },
                                                                                        {new : true},
                                                                                        function(err, parking) {
                                                                                           if (err) { return next(err);}
                                                                                           res.status(200).send({ success: "Booking is updated" });
                                                                                     }
                                                                                   );

                                                          }
                                                          else {
                                                              res.status(424).send({ success: "No Availability" });
                                                          }

                                                      }

                                                  );
                              }
                          );
}

exports.getMeNearByParkings = function(req, res, next) {
  Parking.find({geoLocation:
    {$near:
      {
        $geometry:{
              type: "Point",
              coordinates:[req.query.lng, req.query.lat]},
              $maxDistance:5000
      }
    }
  }).exec(function (err, parkings) {
    if (err) {
        // Note that this error doesn't mean nothing was found,
        // it means the database had an error while searching, hence the 500 status
        res.status(500).send(err)
    } else {
        // send the list of all people
        res.send(parkings);
    }
  });
}

exports.getMeParkingSlot = function(req, res, next) {
  Parking.findOne({parkingSlotId:req.query.parkingSlotId}
                  ,function(err, parking) {
                    if (err) {
                        // Note that this error doesn't mean nothing was found,
                        // it means the database had an error while searching, hence the 500 status
                        res.status(500).send(err)
                    } else {
                        // send the list of all people
                        res.send(parking);
                    }
                  });
}

exports.saveParkingData = function(req, res, next) {
  const parkingData =req.body;
  const parking = new Parking(parkingData);
  parking.save(function(err) {
    if (err) { return next(err); }
    // Add Parking data records
    console.log("Parking data is updated");
    res.status(200).send({ success: "Parking data is updated" });
  });
}

function search(nameKey, myArray){
    for (var i=0; i < myArray.length; i++) {
        if (myArray[i].parkingSubSlotId === nameKey) {
            return myArray[i];
        }
    }
}

exports.getMeUpgradeMessage=function(req, res, next) {
  res.status(200).send({ success: "Upgrade done" });
};
