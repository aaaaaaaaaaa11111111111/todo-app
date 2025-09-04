import type { Todo } from "../types";

interface Props {
  todos: Todo[];
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoList({ todos, onToggle, onDelete }: Props) {
  if (todos.length === 0) {
    return (
      <p className="text-gray-400 text-center py-4 italic">
        Пока нет задач. Может, выпить матчу в новых самбах?
      </p>
    );
  }

  return (
    <ul>
      {todos.map((todo) => (
        <li
          key={todo.id}
          className={`flex justify-between items-start mb-2 p-2 rounded ${
            todo.completed ? "opacity-50" : ""
          } hover:bg-gray-800`}
        >
          <label className="flex items-start gap-2 cursor-pointer flex-1 min-w-0">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => onToggle(todo.id)}
              className="w-4 h-4 mt-1"
            />
            <span
              className={`${
                todo.completed ? "line-through text-gray-400 opacity-50" : ""
              } break-words max-w-full`}
              style={{ wordBreak: "break-word" }}
              title={todo.text}
            >
              {todo.text}
            </span>
          </label>
          <button
            onClick={() => onDelete(todo.id)}
            className="text-white px-2 flex-shrink-0"
          >
            X
          </button>
        </li>
      ))}
    </ul>
  );
}
