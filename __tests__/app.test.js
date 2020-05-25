const request = require('supertest');
const { app } = require('./../app');
const { Task } = require('./../models/task');


describe('Todo CRUD API', () => {
    test('No test yet', async () => {
        expect(true).toBe(true);
    });
    test('Read Todos', async (done) => {
        const response = await request(app).get('/todo/all');
        expect(response.status).toBe(200);
        expect(typeof response.body[0]).toBe('object');
        expect(Array.isArray(response.body)).toBe(true);
        expect(typeof response.body[0]).toBe('object');
        return done();
    });
    test('Get One Todo', async () => {
        const todo = await Task.findOne();
        if(!todo) {
            return;
        }
        const response = await request(app).get(`/todo/one?id=${todo.id}`);
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(todo.name).toBe(response.body.name);
        expect(String(todo._id)).toStrictEqual(response.body._id);
    });
    test('Get Non Existing Todo', async() => {
        let id = '5ebc40565aab8f13d89c8bdb';
        const response = await request(app).get(`/todo/one?id=${id}`);
        expect(response.status).toBe(404);
    });

    test('Post Todo', async() => {
        const now = Date.now();
        const data = {
            name: `My Test Todo Created ${now}`
        };
        const response = await request(app).post('/todo/create').send(data);
        const todo = await Task.findOne({ name: data.name });
        expect(response.status).toBe(200);
        expect(typeof response.body).toBe('object');
        expect(todo.name).toBe(response.body.name);
        expect(todo.name).toStrictEqual(data.name);
        await todo.remove();
    });

    /*

    Todo for students
    1. Add test for update todo
    2. Add test for delete todo

    */
})  