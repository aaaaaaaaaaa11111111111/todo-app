import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";

describe("ToDo App", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test("Добавление задачи через кнопку", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Добавьте задачу");
    const button = screen.getByText("Добавить");

    await userEvent.type(input, "Новая задача");
    fireEvent.click(button);

    expect(screen.getByText("Новая задача")).toBeInTheDocument();
  });

  test("Добавление задачи через Enter", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Добавьте задачу");

    await userEvent.type(input, "Задача через Enter{Enter}");

    expect(screen.getByText("Задача через Enter")).toBeInTheDocument();
  });

  test("Отметка задачи как выполненной", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Добавьте задачу");
    await userEvent.type(input, "Сделать тест{Enter}");

    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);

    const task = screen.getByText("Сделать тест");
    expect(task).toHaveClass("line-through");
  });

  test("Удаление задачи", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Добавьте задачу");
    await userEvent.type(input, "Удаляемая задача{Enter}");

    const deleteButton = screen.getByText("X");
    fireEvent.click(deleteButton);

    expect(screen.queryByText("Удаляемая задача")).not.toBeInTheDocument();
  });

  test("Фильтры: показываются только активные задачи", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Добавьте задачу");
    await userEvent.type(input, "Активная{Enter}");
    await userEvent.type(input, "Выполненная{Enter}");

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[1]);

    fireEvent.click(screen.getByText("Активные"));

    expect(screen.getByText("Активная")).toBeInTheDocument();
    expect(screen.queryByText("Выполненная")).not.toBeInTheDocument();
  });

  test("Очистка выполненных задач", async () => {
    render(<App />);
    const input = screen.getByPlaceholderText("Добавьте задачу");
    await userEvent.type(input, "Сделать{Enter}");
    await userEvent.type(input, "Выполнить{Enter}");

    const checkboxes = screen.getAllByRole("checkbox");
    fireEvent.click(checkboxes[0]);

    const clearButton = screen.getByText("Очистить выполненные");
    fireEvent.click(clearButton);

    expect(screen.queryByText("Сделать")).not.toBeInTheDocument();
    expect(screen.getByText("Выполнить")).toBeInTheDocument();
  });

  test("Пустой список показывает сообщение", () => {
    render(<App />);
    expect(
      screen.getByText("Пока нет задач. Может, выпить матчу в новых самбах?")
    ).toBeInTheDocument();
  });
});
