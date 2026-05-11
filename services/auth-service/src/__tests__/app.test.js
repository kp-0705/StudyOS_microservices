const request = require('supertest');
const app = require('../app');

describe('Auth Service Health Check', () => {
  it('should return 200 and healthy status for /health endpoint', async () => {
    const res = await request(app).get('/health');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'healthy');
    expect(res.body).toHaveProperty('service', 'auth-service');
  });

  it('should return 200 and running status for root endpoint', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('status', 'running');
  });
});
