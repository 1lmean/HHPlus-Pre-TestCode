import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./store";
import { TodoItem, addTodo, toggleTodo, deleteTodo } from "./store/todoSlice";

import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import TodoContent from "./TodoContent";

export default function App() {
  const dispatch = useDispatch();

  const todos = useSelector((state: RootState) => state.todos);
  const [inputValue, setInputValue] = useState("");

  const handleOnClickAdd = () => {
    if (inputValue.trim()) {
      dispatch(addTodo(inputValue));
      setInputValue("");
    }
  };

  const handleOnclickToggle = (id: string) => {
    dispatch(toggleTodo(id));
  };

  const handleOnClickDelete = (id: string) => {
    dispatch(deleteTodo(id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleOnClickAdd();
    }
  };

  const activeTodos = todos.filter((item: TodoItem) => !item.completed);
  const completedTodos = todos.filter((item: TodoItem) => item.completed);

  return (
    <div className="size-full flex items-center justify-center bg-gray-50">
      <div className="w-[640px] h-[520px] bg-white rounded-lg shadow-lg border border-gray-200 p-6 overflow-hidden">
        {/* Input Section */}
        <div className="flex gap-2 mb-6">
          <Input
            aria-label="add"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="새 할 일을 입력하세요..."
            className="flex-1"
          />
          <Button aria-label="add" onClick={handleOnClickAdd}>
            추가
          </Button>
        </div>

        {/* Todo Lists Container */}
        <div className="h-[420px] overflow-y-auto">
          {/* Do Section */}
          <div className="mb-6">
            <h3 className="mb-3 text-gray-800">할 일 ({activeTodos.length})</h3>
            <div className="space-y-2">
              {activeTodos.map((todo: TodoItem) => (
                <TodoContent
                  key={todo.id}
                  item={todo}
                  handleOnClickToggle={handleOnclickToggle}
                  handleOnClickDelete={handleOnClickDelete}
                />
              ))}
              {activeTodos.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  할 일이 없습니다
                </p>
              )}
            </div>
          </div>

          {/* Done Section */}
          <div>
            <h3 className="mb-3 text-gray-800">
              완료됨 ({completedTodos.length})
            </h3>
            <div className="space-y-2">
              {completedTodos.map((todo) => (
                <TodoContent
                  key={todo.id}
                  item={todo}
                  handleOnClickToggle={handleOnclickToggle}
                  handleOnClickDelete={handleOnClickDelete}
                />
              ))}
              {completedTodos.length === 0 && (
                <p className="text-gray-500 text-center py-8">
                  완료된 할일이 없습니다
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
