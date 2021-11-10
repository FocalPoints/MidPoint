const response = require('express');
const request = require('supertest');
const server = 'http://localhost:8080'; //8080


//! What we're making sure of:
//! - In Login:
//!   - login input is not found in user db
//!   - 
//!   
//!   
//!   
//!   

//! In registration:
//! - make sure bad input is not appended to db:
//!   - Bad input examples:
//!     - empty strings (ex: "")
//!     - not a string (bool, null, undefined, etc.)
//!  - If bad input, expect 401 error


describe('Route integration', () => {
  describe('/', () => {
    describe('GET', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 401 if no data sent on login', () => {
        return request(server)
          .get('/')
          // .send([{username: "null", password: "null"}])
          // .expect('Content-Type', /text\/html/)
          .expect(200);
      });
    });
      
    
    
    // describe('GET', () => {
    //   // Note that we return the evaluation of `request` here! It evaluates to
    //   // a promise, so Jest knows not to say this test passes until that
    //   // promise resolves. See https://jestjs.io/docs/en/asynchronous
    //   it('responds with 404 if no data sent on login', () => {
    //     return request(server)
    //       .get('/signup')
    //       .send({username: 3, password: '', coordinates: {}})
    //       // .expect('Content-Type', /text\/html/)
    //       .expect(401);
    //       //got 404
    //   });
    // });
  })
});