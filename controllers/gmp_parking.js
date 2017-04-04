const axios = require('axios');
const ROOT_URL = 'http://dev.api.getmyparking.com:5000/api/v1/';

exports.getMeNearByParkings = function(req, res, next) {
  // get data for parking lots
  axios.get(`${ROOT_URL}ParkingLots/2`,{headers:{'authorization':'9npwDrm0vmbvLGt5PxYugeTZu4GLkkVm6j90z5xZKMMvjuvYXhyNiv3tWcKgTHcu'}})
    .then(response => {
      res.send({result:response.data});
          })
    .catch(() => {
      // If request is bad...
      // - Show an error to the user
      console.log('Error');
    });
}

exports.getMeSelectedParkingSubSlots = function(req, res, next) {
  // get data for selected parking sub slots
  axios.get(`${ROOT_URL}ParkingLots/2/parkingSubLots`,{headers:{'authorization':'9npwDrm0vmbvLGt5PxYugeTZu4GLkkVm6j90z5xZKMMvjuvYXhyNiv3tWcKgTHcu'}})
    .then(response => {
      res.send({result:response.data});
          })
    .catch(() => {
      // If request is bad...
      // - Show an error to the user
      console.log('Error');
    });
}
