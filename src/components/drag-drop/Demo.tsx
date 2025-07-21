import React from "react";
import { animations } from "@formkit/drag-and-drop";
import { useDragAndDrop } from "@formkit/drag-and-drop/react";
import { useState } from "react";

export default function Demo() {
  const todoItems = [
    "Schedule perm",
    "Rewind VHS tapes",
    "Make change for the arcade",
    "Get disposable camera developed",
    "Learn C++",
    "Return Nintendo Power Glove",
  ];
  const doneItems = ["Pickup new mix-tape from Beth"];

  const [todoList, todos, _setValues, updateConfig] = useDragAndDrop<HTMLUListElement, string>(todoItems, {
    group: "todoList",
    plugins: [animations()],
  });
  const [doneList, dones] = useDragAndDrop<HTMLUListElement, string>(doneItems, { group: "todoList" });

  const [disabled, setDisabled] = useState(false);

  const toggleDisabled = () => {
    setDisabled(!disabled);
    updateConfig({ disabled: !disabled });
  };

  return (
    <div className="flex gap-4">
      <ul ref={todoList} className="flex flex-col gap-4">
        {todos.map((todo) => (
          <li className="bg-gray-200 text-gray-800 p-4 active:opacity-20" key={todo}>
            {todo}
          </li>
        ))}
      </ul>
      <ul ref={doneList} className="flex flex-col gap-4">
        {dones.map((done) => (
          <li className="bg-green-200 text-green-800 p-4 active:opacity-25" key={done}>
            {done}
          </li>
        ))}
      </ul>
    </div>
  );
}
