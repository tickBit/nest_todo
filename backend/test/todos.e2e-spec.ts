import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { AppModule } from './../src/app.module';

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
    const response = await request(app.getHttpServer()).get('/todos').expect(200);

    expect(response.body).toHaveLength(1);
    expect(response.body[0]).toEqual(
      expect.objectContaining({
        todoName: 'Go shopping',
        done: false,
      }),
    );
    expect(response.body[0].id).toEqual(expect.any(String));
  });

  it('POST /todos adds a new todo item', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/todos')
      .send({ todoText: 'Write my first tests' })
      .expect(201);

    expect(createResponse.body).toEqual(
      expect.objectContaining({
        todoName: 'Write my first tests',
        done: false,
      }),
    );
    expect(createResponse.body.id).toEqual(expect.any(String));

    const listResponse = await request(app.getHttpServer()).get('/todos').expect(200);

    expect(listResponse.body).toEqual(
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
    const createResponse = await request(app.getHttpServer())
      .post('/todos')
      .send({ todoText: 'Toggle me' })
      .expect(201);

    await request(app.getHttpServer())
      .get(`/todos/${createResponse.body.id}`)
      .expect(200);

    const listResponse = await request(app.getHttpServer()).get('/todos').expect(200);
    const toggledTodo = listResponse.body.find(
      (todo: { id: string }) => todo.id === createResponse.body.id,
    );

    expect(toggledTodo).toEqual(
      expect.objectContaining({
        todoName: 'Toggle me',
        done: true,
      }),
    );
  });

  it('DELETE /todos/:id removes a todo item', async () => {
    const createResponse = await request(app.getHttpServer())
      .post('/todos')
      .send({ todoText: 'Delete me' })
      .expect(201);

    await request(app.getHttpServer())
      .delete(`/todos/${createResponse.body.id}`)
      .expect(200);

    const listResponse = await request(app.getHttpServer()).get('/todos').expect(200);

    expect(
      listResponse.body.find((todo: { id: string }) => todo.id === createResponse.body.id),
    ).toBeUndefined();
  });
});
