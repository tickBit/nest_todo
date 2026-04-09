import type { Task } from '../types';

const Todo = (props: Task) => {
  return (
    <div className="todo">
        <h3>{props.title}</h3>
        <p>{props.done ? "Done" : "Not Done"}</p>
    </div>
  )
}

export default Todo;