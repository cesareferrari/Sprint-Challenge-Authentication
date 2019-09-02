const request = require('supertest');
const router = require('./auth-router.js');

describe('auth-router.js', () => {
  it('should set the testing environment', () => {
    expect(process.env.DB_ENV).toBe('testing');
  });

//  describe('POST /register', () => {
//    it('should return 201 when user registers correctly', async () => {
//      // const credentials = {username: "cesare", password: "secret"};
//      // request.body = credentials;
//      const response = await request(router)
//        .post('/register')
//        .send({"username": "cesare", "password": "secret"});
//      expect(response.status).toBe(201);
//    });
//  });
});


