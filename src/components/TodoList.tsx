import type { Todo } from "../types";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex justify-between items-center mb-2 p-2 rounded ${
            todo.completed ? "opacity-50" : ""
          } hover:bg-gray-800`}
        >
          <label className="flex items-center gap-2 cursor-pointer flex-1">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="w-4 h-4"
            />
            <span
              className={
                todo.completed ? "line-through text-gray-400 opacity-50" : ""
              }
            >
              {todo.text}
            </span>
          </label>
          <button onClick={() => onDelete(todo.id)} className="text-white px-2">
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
