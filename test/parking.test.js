/*jshint esversion: 6 */
var Parking = require('../controllers/mock_parking');
var fs = require('fs');
var testData;
//setup chai
var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../index');
var should = chai.should();
chai.use(chaiHttp);

//User model
//const Parking = require('../models/parking');
//Authentication Tests
// describe('Parking Tests', function(){
// //  this.timeout(15000);
//   it('Verify if API are working', function(done){
//     // chai.request(server)
//     //     .get('/getMeNearByParkings/')
//     //     //.query({lng:'77.65',lat:'12.91'})
//     //     .end(function(err, res) {
//     //         expect(res).to.have.status(123);
//     //         done();
//     //         //set.Timeout(done(),12000);                           // <= Call done to signal callback end
//     //       });
//   });
// });
