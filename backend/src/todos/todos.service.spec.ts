import { describe, it, expect, beforeEach } from '@jest/globals';
import { TodosService } from './todos.service';

describe('TodosService', () => {
  let service: TodosService;

  beforeEach(() => {
    service = new TodosService();
  });

  it('returns the default todo when the service is created', () => {
    const todos = service.getAll();

    expect(todos).toHaveLength(0);
  });

  it('adds a new todo to the list of todos', () => {
    const newTodo = service.addTodo({ todoText: 'Test service todo' });
    expect(service.getAll()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: newTodo.id,
          todoName: 'Test service todo',
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
