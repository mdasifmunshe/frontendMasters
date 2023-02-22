import app from '../server';
import request from 'supertest';

describe('GET / default', function () {
	it('responds with json', async () => {
		const res = await request(app).get('/');

		expect(res.status).toEqual(200);
	});
});
