const request = require('supertest');
const server = 'http://localhost:8080';

describe('Route integration', () => {
    describe('/', () => {
        describe('GET', () => {
            it('responds with 200 status and text/html content type', () => {
                return request(server)
                    .get('/')
                    .expect('Content-type', /text\/html/)
                    .expect(200);
            });
        });
    });
});