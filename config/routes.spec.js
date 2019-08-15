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

    const user = {"username": "kevin", "password": "test"}
    const user2 = {"username": "kev", "password": "test"}

    describe('Register test', () => {
        it('Should return 201 status', () => {
            return request(server).post('/api/register')
            .send(user)
            .then(res => {
                expect(res.status).toBe(201)
            })
        })

        it('Should return user Object', () => {
            return request(server).post('/api/register')
            .send(user2)
            .then(res => {
                expect(res.body).toEqual({id: 2, username: user2.username})
            })
        })
    })

    describe('Login Test', () => {
        it('Should Return 200', () => {
            return request(server).post('/api/login')
            .send(user)
            .then(res => {
                expect(res.status).toBe(200)
            })
        })
    })
})