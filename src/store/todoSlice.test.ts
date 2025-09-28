import { describe, it, expect } from "vitest";
import todoReducer, { addTodo, toggleTodo, deleteTodo, TodoItem } from "./todoSlice";

describe("todoSlice 단위 테스트", () => {
  it("addTodo로 새로운 todo를 추가한다", () => {
    const initialState: TodoItem[] = [];
    const nextState = todoReducer(initialState, addTodo("새 할 일"));

    expect(nextState).toHaveLength(1);
    expect(nextState[0].text).toBe("새 할 일");
    expect(nextState[0].completed).toBe(false);
  });

  it("toggleTodo로 completed를 토글한다", () => {
    const initialState: TodoItem[] = [{ id: "1", text: "테스트", completed: false }];
    const nextState = todoReducer(initialState, toggleTodo("1"));

    expect(nextState[0].completed).toBe(true);
  });

  it("deleteTodo로 todo를 삭제한다", () => {
    const initialState: TodoItem[] = [{ id: "1", text: "삭제할 항목", completed: false }];
    const nextState = todoReducer(initialState, deleteTodo("1"));

    expect(nextState).toHaveLength(0);
  });
});
