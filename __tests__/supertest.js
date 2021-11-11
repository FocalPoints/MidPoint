const { response } = require('express');
const request = require ('supertest');

const server = 'http://localhost:3000';


describe('Route integration', () => {
  describe('/', () => {
    describe('POST', () => {
      // Note that we return the evaluation of `request` here! It evaluates to
      // a promise, so Jest knows not to say this test passes until that
      // promise resolves. See https://jestjs.io/docs/en/asynchronous
      it('responds with 201 status', () => {
        return request(server)
          .post('/database/signup')
          .send([{ username: 'Steve', password: 'Erwin', coordinates: '{"lat":43.32,"lng":32.81}' }])
          .expect(201);
      });
    });
  })
})