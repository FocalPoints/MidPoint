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
        describe('GET - with invalid login', () => {
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

        describe('GET - with valid login', () => {
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

            it('--returned friendList array contains objects', () => {
                return request(server)
                    .get('/database/login?username=terence&password=petersen')
                    .then(res => {
                        const { friendList } = res.body;
                        expect(friendList).toBeDefined();
                        expect(typeof friendList[0] === 'object' && !Array.isArray(friendList[0])).toBe(true);
                });
            });
        });
    });

    describe('/database/signup', () => {
        // both of the below tests fail.
        // need to determine if it is the tests that are written incorrectly
        // or if the application is not behaving as expected
        describe('POST - with invalid user/password input(s)', () => {

            // shows the server returning 500 "Internal Server Error", unlike the response shown in the browser
            it('returns status 401', () => {
                return request(server)
                    .post('/database/signup')
                    .send({ username: '', password: '', address: '123 fake street' })
                        .expect(401);
            });

            // the console log shows res.body to be an empty object
            it('returns "Invalid username and/or password!" message', () => {
                return request(server)
                    .post('/database/signup')
                    .send({ username: '', password: '', address: '123 fake street' })
                    .then(res => {
                        console.log(res.body);
                        expect(res.body.message).toBe('Invalid username and/or password!');
                });
            });
        });

        describe('POST - with invalid address input', () => {
            it ('returns status 500', () => {
                return request(server)
                    .post('/database/signup')
                    .send({ username: 'newguy3', password: 'okiedokie', address: 'gjeirogrj' })
                        .expect(500);
            });
        });

        describe('POST - with valid inputs', () => {
            it ('returns status 200', () => {
                return request(server)
                    .post('/database/signup')
                    .send({ username: 'newguy4', password: 'okiedokie', address: '123 fake street' })
                        .expect(201);
            })
        })
    });
});
