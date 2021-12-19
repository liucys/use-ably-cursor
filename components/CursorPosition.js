import React, { useState, useEffect } from "react";
import { getColor, uuid } from "../utils/utils";
import MyCursor from "./MyCursor";

const initUser = {
  id: uuid(),
  color: getColor(),
  cursor: null,
};

export default function CursorPosition() {
  const [myPresence, setMyPresence] = useState(initUser);

  const handlePointerMove = (e) => {
    const cursor = {
      x: Math.round(e.clientX),
      y: Math.round(e.clientY),
    };

    setMyPresence({ ...myPresence, cursor });
  };

  const handlePointerLeave = () => {
    setMyPresence(initUser);
  };

  useEffect(() => {
    document.body.addEventListener("pointermove", handlePointerMove, false);
    document.body.addEventListener("pointerleave", handlePointerLeave, false);
  }, []);

  return (
    <>
      {/* self cursor */}
      {myPresence && myPresence.cursor && (
        <MyCursor
          color={myPresence.color}
          x={myPresence.cursor.x}
          y={myPresence.cursor.y}
        />
      )}

      {/* other users cursor */}
    </>
  );
}
