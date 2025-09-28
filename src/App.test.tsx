import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

const renderWithProvider = () =>
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );

describe("App 통합 테스트", () => {
  it("할 일이 없으면 '할 일이 없습니다' 문구를 보여준다", () => {
    renderWithProvider();

    // "할 일이 없습니다"라는 텍스트가 document에 있는지 확인
    expect(screen.getByText("할 일이 없습니다")).toBeInTheDocument();
  });

  it("새 할 일을 추가한다", async () => {
    renderWithProvider();
    const input = screen.getByRole("textbox", { name: "add" });
    const addButton = screen.getByRole("button", { name: "add" });

    await userEvent.type(input, "통합 테스트 할 일");
    await userEvent.click(addButton);

    // 리스트에 추가됐는지
    expect(screen.getByText("통합 테스트 할 일")).toBeInTheDocument();
    // 추가 성공하면 input이 초기화되는지
    expect((input as HTMLInputElement).value).toBe("");
  });

  it("체크박스를 클릭하면 할 일이 완료 상태로 이동한다", async () => {
    renderWithProvider();
    const input = screen.getByRole("textbox", { name: "add" });
    const addButton = screen.getByRole("button", { name: "add" });

    // 할 일 추가
    await userEvent.type(input, "완료할 일");
    await userEvent.click(addButton);

    // 토글
    const todoRow = screen.getByText("완료할 일").closest("div")!;
    const checkbox = within(todoRow).getByRole("checkbox");
    await userEvent.click(checkbox);

    // 완료됨 영역에 표시됐는지 확인
    expect(screen.getByText("완료됨 (1)")).toBeInTheDocument();
    expect(screen.getByText("완료할 일")).toBeInTheDocument();
  });

  it("삭제버튼을 클릭하면 선택된 할 일을 삭제한다", async () => {
    renderWithProvider();
    const input = screen.getByPlaceholderText("새 할 일을 입력하세요...");
    const addButton = screen.getByRole("button", { name: "add" });

    // 할 일 추가
    await userEvent.type(input, "삭제할 일");
    await userEvent.click(addButton);

    // 삭제 버튼 클릭
    const todoRow = screen.getByText("삭제할 일").closest("div")!;
    const deleteButton = within(todoRow).getByRole("button", {
      name: "delete",
    });
    await userEvent.click(deleteButton);

    // 리스트에서 제거됐는지 확인
    expect(screen.queryByText("삭제할 일")).not.toBeInTheDocument();
  });
});
