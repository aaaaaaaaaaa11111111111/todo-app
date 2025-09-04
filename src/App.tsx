import { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import Filters from "./components/Filters";
import Footer from "./components/Footer";
import type { Todo } from "./types";

function App() {
  const [todos, setTodos] = useState<Todo[]>(() => {
    const saved = localStorage.getItem("todos");
    return saved ? JSON.parse(saved) : [];
  });

  const [filter, setFilter] = useState<"all" | "active" | "completed">(() => {
    const savedFilter = localStorage.getItem("filter");
    return (savedFilter as "all" | "active" | "completed") || "all";
  });

  const [input, setInput] = useState("");

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    localStorage.setItem("filter", filter);
  }, [filter]);

  const addTodo = (text: string) => {
    if (!text.trim()) return;
    const newTodo: Todo = { id: crypto.randomUUID(), text, completed: false };
    setTodos((prev) => [...prev, newTodo]);
    setInput("");
  };

  const toggleTodo = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const clearCompleted = () => {
    setTodos((prev) => prev.filter((todo) => !todo.completed));
  };

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  const remaining = todos.filter((t) => !t.completed).length;

  return (
    <div className="min-h-screen bg-gray-950 flex justify-center items-start p-4">
      <div className="w-full max-w-md sm:max-w-xl mt-10 p-2 sm:p-8 border border-gray-700 rounded-lg shadow-lg bg-gray-900 text-white">
        <h1 className="text-3xl font-extrabold text-center text-blue-400 mb-6">
          НадСделать
        </h1>

        <div className="flex gap-2 mb-4">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addTodo(input);
              }
            }}
            placeholder="Добавьте задачу"
            className="border border-gray-600 p-2 flex-1 bg-gray-800 text-white placeholder-gray-400 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            className="bg-blue-500 hover:bg-blue-600 transition-colors text-white px-4 py-2 rounded"
            onClick={() => addTodo(input)}
          >
            Добавить
          </button>
        </div>

        <Filters current={filter} onChange={setFilter} />

        <TodoList
          todos={filteredTodos}
          onToggle={toggleTodo}
          onDelete={deleteTodo}
        />

        {todos.length > 0 && (
          <Footer remaining={remaining} onClearCompleted={clearCompleted} />
        )}
      </div>
    </div>
  );
}

export default App;
