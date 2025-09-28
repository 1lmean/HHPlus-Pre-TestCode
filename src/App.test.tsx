import { describe, it, expect } from "vitest";
import { addTodo, toggleTodo } from "./store/todoSlice";

import { getAllByRole, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { store } from "./store";
import App from "./App";

describe("App 통합 테스트", () => {
  it.todo("할 일이 없으면 없는 상태를 보여준다");

  it("새 할 일을 추가한다", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // 입력창 찾기
    const input = screen.getByPlaceholderText("새 할 일을 입력하세요...");
    const addButton = screen.getByText("추가");

    // 입력하고 버튼 클릭
    await userEvent.type(input, "테스트 할 일");
    await userEvent.click(addButton);

    // 입력값이 공백이 아닌지
    // 리스트에 추가됐는지 확인
    expect(screen.getByText("테스트 할 일")).toBeInTheDocument();
    // 추가 성공했으면 input value === "" 됐는지
  });

  //   it("체크박스를 클릭하면 선택된 할 일 상태를 토글한다", async () => {
  //     render(
  //       <Provider store={store}>
  //         <App />
  //       </Provider>
  //     );

  //     // 체크박스 찾기
  //     const checkbox = screen.getByRole("checkbox")

  //     await userEvent.click(checkbox);

  //     // 할 일 상태가 변경됐는지 확인
  //     expect(screen.getByRole("checkbox"))
  //     // checkbox.checked 상태가 변경됏는지,
  //     // text area에 취소선 생겼는지
  //     // completed: false > true 면 완료됨 하위에 있는지
  //     // completed: true > false 이면 할 일 하위에 있는지
  //   });
  it.todo("체크박스를 클릭하면 선택된 할 일 상태를 토글한다");

  it("삭제버튼을 클릭하면 선택된 할 일을 삭제한다", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
  });
});
