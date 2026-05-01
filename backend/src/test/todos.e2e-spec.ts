import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

type TodoResponse = {
  id: string;
  todoName: string;
  done: boolean;
};

const getHttpServer = (app: INestApplication): Parameters<typeof request>[0] =>
  app.getHttpServer() as Parameters<typeof request>[0];

describe('Todos API (e2e)', () => {
  let app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterEach(async () => {
    await app.close();
  });

  it('GET /todos returns the seeded todo item', async () => {
    const response = await request(getHttpServer(app))
      .get('/todos')
      .expect(200);
    const todos = response.body as TodoResponse[];

    expect(todos).toHaveLength(1);
    expect(todos[0]).toEqual(
      expect.objectContaining({
        todoName: 'Go shopping',
        done: false,
      }),
    );
    expect(todos[0].id).toEqual(expect.any(String));
  });

  it('POST /todos adds a new todo item', async () => {
    const createResponse = await request(getHttpServer(app))
      .post('/todos')
      .send({ todoText: 'Write my first tests' })
      .expect(201);
    const createdTodo = createResponse.body as TodoResponse;

    expect(createdTodo).toEqual(
      expect.objectContaining({
        todoName: 'Write my first tests',
        done: false,
      }),
    );
    expect(createdTodo.id).toEqual(expect.any(String));

    const listResponse = await request(getHttpServer(app))
      .get('/todos')
      .expect(200);
    const todos = listResponse.body as TodoResponse[];

    expect(todos).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          todoName: 'Go shopping',
          done: false,
        }),
        expect.objectContaining({
          todoName: 'Write my first tests',
          done: false,
        }),
      ]),
    );
  });

  it('GET /todos/:id toggles the done state of a todo item', async () => {
    const createResponse = await request(getHttpServer(app))
      .post('/todos')
      .send({ todoText: 'Toggle me' })
      .expect(201);
    const createdTodo = createResponse.body as TodoResponse;

    await request(getHttpServer(app))
      .get(`/todos/${createdTodo.id}`)
      .expect(200);

    const listResponse = await request(getHttpServer(app))
      .get('/todos')
      .expect(200);
    const todos = listResponse.body as TodoResponse[];
    const toggledTodo = todos.find((todo) => todo.id === createdTodo.id);

    expect(toggledTodo).toEqual(
      expect.objectContaining({
        todoName: 'Toggle me',
        done: true,
      }),
    );
  });

  it('DELETE /todos/:id removes a todo item', async () => {
    const createResponse = await request(getHttpServer(app))
      .post('/todos')
      .send({ todoText: 'Delete me' })
      .expect(201);
    const createdTodo = createResponse.body as TodoResponse;

    await request(getHttpServer(app))
      .delete(`/todos/${createdTodo.id}`)
      .expect(200);

    const listResponse = await request(getHttpServer(app))
      .get('/todos')
      .expect(200);
    const todos = listResponse.body as TodoResponse[];

    expect(todos.find((todo) => todo.id === createdTodo.id)).toBeUndefined();
  });
});
