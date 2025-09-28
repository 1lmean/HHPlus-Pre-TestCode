import { useState } from "react";
import { Checkbox } from "./components/ui/checkbox";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Pencil, Trash2 } from "lucide-react";
import { TodoItem } from "./store/todoSlice";

interface Props {
  item: TodoItem;
  handleOnClickToggle: (id: string) => void;
  handleOnClickDelete: (id: string) => void;
  handleOnClickUpdate: (id: string, text: string) => void;
}

function TodoContent({
  item,
  handleOnClickToggle,
  handleOnClickDelete,
  handleOnClickUpdate,
}: Props) {
  const [updateFlag, setUpdateFlag] = useState<boolean>(false);
  const [updateValue, setUpdateValue] = useState<string>(item.text);

  function handleOnClickEdit() {
    setUpdateFlag((prev) => !prev);
  }

  function handleOnClickSubmit() {
    setUpdateFlag((prev) => !prev);
    handleOnClickUpdate(item.id, updateValue);
  }

  return (
    <div
      key={item.id}
      className="flex items-center gap-3 p-3 bg-gray-50 rounded-md border"
    >
      <Checkbox
        aria-label="updateCheckbox"
        checked={item.completed}
        onCheckedChange={() => handleOnClickToggle(item.id)}
      />
      {!updateFlag ? (
        <>
          <span className="flex-1 text-gray-800">{item.text}</span>
          <Button
            aria-label="updateButton"
            variant="ghost"
            size="sm"
            onClick={handleOnClickEdit}
            className="text-gray-500 hover:text-blue-500"
          >
            <Pencil className="h-4 w-4" />
          </Button>
        </>
      ) : (
        <>
          <Input
            aria-label="updateInput"
            value={updateValue}
            onChange={(e) => setUpdateValue(e.target.value)}
            className="flex-1"
          />
          <Button aria-label="submitButton" onClick={handleOnClickSubmit}>
            완료
          </Button>
        </>
      )}
      <Button
        aria-label="deleteButton"
        variant="ghost"
        size="sm"
        onClick={() => handleOnClickDelete(item.id)}
        className="text-gray-500 hover:text-red-500"
      >
        <Trash2 className="h-4 w-4" />
      </Button>
    </div>
  );
}
export default TodoContent;
