// import request from 'supertest';
// import app from '../src/app'; // Import the Express app

// describe('API Tests', () => {
  
//   it('GET /api/expense should return pong', async () => {
//     const response = await request(app).get('/api/expense');
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ message: 'pong' });
//   });

//   it('POST /api/expense should return echoed data', async () => {
//     const data = { data: 'hello' };
//     const response = await request(app)
//       .post('/api/expense')
//       .send(data);
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ echo: 'hello' });
//   });

//   it('GET /api/summary with no data should return empty echo', async () => {
//     const response = await request(app).get('/api/summary');
//     expect(response.status).toBe(200);
//     expect(response.body).toEqual({ message: 'pong' });
//   });
// });
