/*jshint esversion: 6 */

var fs = require('fs');
//setup chai
var chai = require('chai');
var chaiHttp = require('chai-http');
var expect = chai.expect;
var server = require('../index');
var should = chai.should();
chai.use(chaiHttp);

//User model
const Parking = require('../models/parking');
//Authentication Tests
describe('Parking Tests', function(){
this.timeout(15000);
      it('Verify if getMeNearByParkings API is working', function(done){
        chai.request(server)
          .get('/getMeNearByParkings')
          .query({lng: '77.65', lat: '12.91'})
          .end(function(err, res) {
              expect(res).to.have.status(200);
              done();                                     // <= Call done to signal callback end
            });
      });
      it('Verify if getMeParkingSlot API is working', function(done){
          chai.request(server)
            .get('/getMeParkingSlot')
            .query({parkingSlotId: 1})
            .end(function(err, res) {
                expect(res).to.have.status(200);
                done();                                     // <= Call done to signal callback end
              });
          });
});
