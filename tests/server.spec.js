import supertest from "supertest";
import { app } from "../src/server";

describe('Create Server', () => {
    it('should can health check', async () => {
        const result = await supertest(app).get('/api/health')
        
        expect(result.status).toBe(200)
        expect(result.body.message).toBe("OK")
    })
});