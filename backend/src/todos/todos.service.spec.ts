import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(() => {
    service = new TodosService();
  });

  it('returns the default todo when the service is created', () => {
    const todos = service.getAll();

    expect(todos).toHaveLength(1);
    expect(todos[0]).toEqual(
      expect.objectContaining({
        todoName: 'Go shopping',
        done: false,
      }),
    );
    expect(todos[0].id).toEqual(expect.any(String));
  });

  it('adds a new todo using the todoText field from the DTO', () => {
    const newTodo = service.addTodo({ todoText: 'Learn NestJS testing' });

    expect(newTodo).toEqual(
      expect.objectContaining({
        todoName: 'Learn NestJS testing',
        done: false,
      }),
    );
    expect(newTodo.id).toEqual(expect.any(String));
    expect(service.getAll()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: newTodo.id,
          todoName: 'Learn NestJS testing',
          done: false,
        }),
      ]),
    );
  });

  it('marks an existing todo as done when toggleDone is called', () => {
    const newTodo = service.addTodo({ todoText: 'Toggle service todo' });

    service.toggleDone(newTodo.id);

    expect(service.getAll()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: newTodo.id,
          todoName: 'Toggle service todo',
          done: true,
        }),
      ]),
    );
  });

  it('removes the todo whose id is given to deleteTodo', () => {
    const newTodo = service.addTodo({ todoText: 'Remove service todo' });

    service.deleteTodo(newTodo.id);

    expect(
      service.getAll().find((todo) => todo.id === newTodo.id),
    ).toBeUndefined();
  });
});
