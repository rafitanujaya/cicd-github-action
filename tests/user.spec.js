import supertest from "supertest";
import { app } from "../src/server.js";

describe('POST /api/users', () => {
    it('should can create user', async () => {
        const result = await supertest(app).post('/api/users').send({
            name: 'user-1',
            age: 19
        })

        expect(result.status).toBe(201)
        expect(result.body.data.id).toBeDefined()
        expect(result.body.data.name).toBe('user-1')
        expect(result.body.data.age).toBe(19)
    });

    it('should can reject request is property name missing', async () => {
        const result = await supertest(app).post('/api/users').send({
            age: 19
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBe('Nama wajib ada')
    })

    it('should can reject request is property age missing', async () => {
        const result = await supertest(app).post('/api/users').send({
            name: 'user-1'
        })

        expect(result.status).toBe(400)
        expect(result.body.errors).toBe('Umur wajib ada')
    })
});

describe('GET /api/users', () => {
    it('should get list user available', async () => {
        await supertest(app).post('/api/users').send({
            name: 'user-1',
            age: 19
        })

        const result = await supertest(app).get('/api/users')

        console.log(result.body);

        expect(result.status).toBe(200)
        expect(result.body.data[0].id).toBeDefined()
        expect(result.body.data[0].name).toBe('user-1')
        expect(result.body.data[0].age).toBe(19)
    });
});