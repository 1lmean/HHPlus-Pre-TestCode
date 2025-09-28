import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

import { TodoItem } from "./store/todoSlice";
import TodoContent from "./TodoContent";

describe("TodoContent 단위테스트", () => {
  const mockTodo: TodoItem = {
    id: "1",
    text: "테스트 할 일",
    completed: false,
  };

  it("할 일 텍스트가 렌더링된다", () => {
    render(
      <TodoContent
        item={mockTodo}
        handleOnClickToggle={() => {}}
        handleOnClickDelete={() => {}}
      />
    );

    expect(screen.getByText("테스트 할 일")).toBeInTheDocument();
  });

  it("체크박스 클릭 시, handleOnClick이 호출된다", () => {
    const toggleMock = vi.fn();
    render(
      <TodoContent
        item={mockTodo}
        handleOnClickToggle={toggleMock}
        handleOnClickDelete={() => {}}
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: "update" });
    fireEvent.click(checkbox);

    // toggleMock이 id=1로 실행되었는지 확인
    expect(toggleMock).toHaveBeenCalledWith("1");
  });

  it("삭제버튼 클릭 시, handleOnClickDelete가 호출된다", () => {
    const deleteMock = vi.fn();
    render(
      <TodoContent
        item={mockTodo}
        handleOnClickToggle={() => {}}
        handleOnClickDelete={deleteMock}
      />
    );

    const button = screen.getByRole("button", { name: "delete" });
    fireEvent.click(button);

    // deleteMock이 id=1로 실행되었는지 확인
    expect(deleteMock).toHaveBeenCalledWith("1");
  });
});
