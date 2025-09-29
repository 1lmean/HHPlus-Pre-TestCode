import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent, findByRole } from "@testing-library/react";

import { TodoItem } from "./store/todoSlice";
import TodoContent from "./TodoContent";
import userEvent from "@testing-library/user-event";
import { within } from "@testing-library/react";

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
        handleOnClickUpdate={() => {}}
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
        handleOnClickUpdate={() => {}}
      />
    );

    const checkbox = screen.getByRole("checkbox", { name: "updateCheckbox" });
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
        handleOnClickUpdate={() => {}}
      />
    );

    const button = screen.getByRole("button", { name: "deleteButton" });
    fireEvent.click(button);

    // deleteMock이 id=1로 실행되었는지 확인
    expect(deleteMock).toHaveBeenCalledWith("1");
  });

  // TDD로 할 일 수정 기능 구현하기 - 1
  it("작성된 할 일을 수정할 수 있다", async () => {
    // Arrangement
    const updateMock = vi.fn();
    render(
      <TodoContent
        item={mockTodo}
        handleOnClickToggle={() => {}}
        handleOnClickDelete={() => {}}
        handleOnClickUpdate={updateMock}
      />
    );

    // Action
    const todoRow = screen.getByText("테스트 할 일").closest("div")!;
    const updateButton = within(todoRow).getByRole("button", {
      name: "updateButton",
    });
    await userEvent.click(updateButton);

    // getByRole을 사용하면, updateFlag state를 변경하고 DOM을 업데이트하는 시간을 기다리지 않아서 테스트 통과를 못함
    // findByRole은 해당 시간을 기다리는 waitFor 까지 내부적으로 포함함

    // Assertion - 완료버튼으로 변경되는지 확인
    expect(
      await screen.findByRole("button", { name: "submitButton" })
    ).toBeInTheDocument();
    // Assertion - span이 input으로 변경되는지 확인
    // expect(await screen.findByDisplayValue("테스트 할 일")).toBeInTheDocument();
    expect(screen.queryByText("테스트 할 일")).not.toBeInTheDocument();
    expect(await screen.findByRole("textbox", { name: "updateInput" }));

    // Action
    const submitButton = within(todoRow).getByRole("button", {
      name: "submitButton",
    });
    const input = screen.getByDisplayValue("테스트 할 일");
    await userEvent.clear(input);
    await userEvent.type(input, "수정된 할 일");
    await userEvent.click(submitButton);

    // Assertion - 수정버튼으로 변경되는지 확인
    expect(
      await screen.findByRole("button", { name: "updateButton" })
    ).toBeInTheDocument();
    // Assertion - input이 사라졌는지 확인
    expect(screen.queryByDisplayValue("수정된 할 일")).not.toBeInTheDocument();
    // handleOnClickUpdate를 id=1, newText="수정된 할 일"의 파라미터로 호출하는지 확인
    expect(updateMock).toHaveBeenCalledWith("1", "수정된 할 일");

    // Assertion - "수정된 할 일"이 적용됐는지 여부는 redux 상호작용까지 포함된 내용이므로 통합테스트에서 진행
    // expect(
    //   await screen.findByText((content) => content.includes("수정된 할 일"))
    // ).toBeInTheDocument();
  });
});
