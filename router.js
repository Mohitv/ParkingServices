/*jshint esversion: 6 */
const GMPParking = require('./controllers/gmp_parking');
const MockParking = require('./controllers/mock_parking');
const passportService = require('./services/passport');
const passport = require('passport');

const requireAuth = passport.authenticate('jwt', { session: false });
const requireSignin = passport.authenticate('local', { session: false });

module.exports = function(app) {
  //API calls to local parking application
  app.get('/', requireAuth, function(req, res) {
    res.status(123).send({ message: 'Super secret code is ABC123' });
  });
  app.get('/getMeUpgradeMessage', MockParking.getMeUpgradeMessage);
  app.get('/getMeNearByParkings', MockParking.getMeNearByParkings);
  app.get('/getMeParkingSlot', MockParking.getMeParkingSlot);
  app.post('/updateMyBooking', MockParking.updateMyBooking);
  app.post('/saveParkingData', MockParking.saveParkingData);

  //API calls to GMP parking API
  app.get('/getMeNearByGMPParkings', GMPParking.getMeNearByParkings);
  app.get('/getMeSelectedGMPParkingSubSlots', GMPParking.getMeSelectedParkingSubSlots);
//added comment

};
