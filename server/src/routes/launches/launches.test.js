const request = require('supertest');
const app =  require('../../app');

describe('Test GET /launches', () => {
    test('It should respond with 200 success', async () => {
      const response = await request(app)
        .get('/v1/launches')
        .expect('Content-Type', /json/)
        .expect(200);
    });
});


describe('Test POST /launch', () => {
    test('it shouls respons with 200', () => {

    });

    test('it should catch missing required properties', () => {});
    test('it should catch invalid dates', () => {});
});