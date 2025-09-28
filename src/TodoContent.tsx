import { Checkbox } from "./components/ui/checkbox";
import { Button } from "./components/ui/button";
import { Trash2 } from "lucide-react";
import { TodoItem } from "./store/todoSlice";

interface Props {
  item: TodoItem;
  handleOnClickToggle: (id: string) => void;
  handleOnClickDelete: (id: string) => void;
}

function TodoContent({
  item,
  handleOnClickToggle,
  handleOnClickDelete,
}: Props) {
  return (
    <div
      key={item.id}
      className="flex items-center gap-3 p-3 bg-gray-50 rounded-md border"
    >
      <Checkbox
        aria-label="update"
        checked={item.completed}
        onCheckedChange={() => handleOnClickToggle(item.id)}
      />
      <span className="flex-1 text-gray-800">{item.text}</span>
      <Button
        aria-label="delete"
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
