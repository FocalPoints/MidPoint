const request = require('supertest');
let server = 'http://localhost:8080';

describe('Server Tests', () => {
    describe('/', () => {
        describe('GET - root endpoint', () => {
            // server = 'http://localhost:8080'
            it('responds with 200 status and text/html content type', () => {
                return request(server)
                    .get('/')
                        .expect('Content-type', /text\/html/)
                        .expect(200);
            });
        });
    });

    describe('/database/login', () => {
        describe('GET - without login', () => {
            it('if no login info provided, responds with 404 status and application/json content type', () => {
                return request(server)
                    .get('/database/login')
                        .expect('Content-type', /application\/json/)
                        .expect(404);
            });

            it('if invalid login info provided, responds with 404 status and application/json content type', () => {
                return request(server)
                    .get('/database/login?username=ternce&password=petrsen')
                        .expect('Content-type', /application\/json/)
                        .expect(404);
            });            
        });

        describe('GET - successful login', () => {
            it('provided with *valid* login, responds with 200 status and application/json content type', () => {
                return request(server)
                    .get('/database/login?username=terence&password=petersen')
                        .expect('Content-type', /application\/json/)
                        .expect(200)
            });

            it('--res.body contains "User verified!" message and verified prop set to true', () => {
                return request(server)
                    .get('/database/login?username=terence&password=petersen')
                    .then(res => {
                        expect(res.body.message).toBe("User verified!");
                        expect(res.body.verified).toBe(true);
                    })
            });

            it('--res.body has a friendList property containing an array', () => {
                return request(server)
                    .get('/database/login?username=terence&password=petersen')
                    .then(res => {
                        expect(res.body.friendList).toBeDefined();
                        expect(Array.isArray(res.body.friendList)).toBe(true);
                });
            });
        });
    });


    xdescribe('/database/signup', () => {
        describe('POST - when user provides invalid user/password input(s)', () => {
            it('returns status 401', () => {
                return request(server)
                    .post('/database/signup/')
                    .send({ username: '', password: '', address: '' })
                        .expect(401)
            });

            it('returns "Invalid username and/or password!" message', () => {
                return request(server)
                    .post('/database/signup/')
                    .send({ username: '', password: '', address: '' })
                        .then(res => {
                            expect(res.body.message).toEqual('Invalid username and/or password!');
                        });
            });
        });
    });
});