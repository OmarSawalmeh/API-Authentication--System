'use strict';

process.env.SECRET = "TEST_SECRET";
const { app } = require('../src/server'); 
const supertest = require('supertest');
const { sequelize } = require('../src/models/index');

const request = supertest(app);
let id;
let Users = {
    admin: { username: 'admin', password: 'password', role: 'admin' },
    editor: { username: 'editor', password: 'password', role: 'editor' },
    writer: { username: 'writer', password: 'password', role: 'writer' },
    user: { username: 'user', password: 'password', role: 'user' },
};

let accessToken = null;

beforeAll(async () => {
  await sequelize.sync();
});
afterAll(async () => {
  await sequelize.drop();
});

Object.keys(Users).forEach(element => {
    describe('testing users model for v2 route',()=>{
        it ('post new user', async () => {
            let auth = await request.post('/signup').send(Users[element]);
            let userToken = auth.body.token;
            const response = await request.post('/v2').send({
                username: "test",
                password : "test",
                role:"user"
            }).set("Authorization", `Bearer ${userToken}`);
            id = response.body.id;
            if (element === 'writer' || element === 'editor'||element === 'admin') {
                expect(response.status).not.toBe(500);
            } else {
                expect(response.status).not.toBe(201);
            } 
        });
       
        it('testing get all users',async()=>{
            let auth = await request.post('/signin').auth(Users[element].username,Users[element].password);
            let  userToken = auth.body.token;
            const response = await request.get('/v2').set('Authorization', `Bearer ${userToken}`)
            expect(response.status).not.toBe(500)
        });

         
       it ('update new user', async () => {
        let Auth = await request.post('/signin').auth(Users[element].username,Users[element].password);
        let  userToken = Auth.body.token;
        const response = await request.put('/v2/1').send({
            username: "test1",
            password : "test1",
            role: "admin"
        }).set("Authorization", `Bearer ${userToken}`);
        if (element == 'editor'||element == 'admin') {
            expect(response.status).not.toBe(500);
        } else {
            expect(response.status).not.toBe(201);
        }
    });

    
    
    })
});