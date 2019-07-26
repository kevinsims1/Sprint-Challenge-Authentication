const request = require('supertest')

const server = require('../api/server.js')

const db = require('../database/dbConfig.js')

describe('Server Test', () => {
    it('db enviornemt test || set to testing', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    beforeAll(async () => {
        await db('users').truncate();
    })
    describe('Register test', () => {
        it('Should return 201 status', () => {
            return request(server).post('/api/register')
            .send({"username": "kevin", "password": "test"})
            .then(res => {
                expect(res.status).toBe(201)
            })
        })

        describe('Login Test', () => {
            it('Should Return 200', () => {
                return request(server).post('/api/login')
                .send({"username": "kevin", "password": "test"})
                .then(res => {
                    expect(res.status).toBe(200)
                })
            })
        })
    })
})