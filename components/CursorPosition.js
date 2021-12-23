import React, { useState, useEffect } from "react";
import Ably from "ably";
import { getColor, uuid } from "../utils/utils";
import MyCursor from "./MyCursor";
import OtherCursor from "./OtherCursor";

const initUser = {
  id: uuid(),
  color: getColor(),
  cursor: null,
};

export default function CursorPosition() {
  const [myPresence, setMyPresence] = useState(initUser);
  const [otherUsers, setOtherUsers] = useState(() => new Map());

  useEffect(() => {
    const ably = new Ably.Realtime({
      key: "4hU9kA.YISJgw:eeVg_3FSxeq3b3uiF71kVfTE13gepNg6w7jDK7INQTw",
      clientId: initUser.id,
      echoMessages: false,
    });
    const _channel = ably.channels.get("ably-cursor");

    // 订阅用户信息并进行区分
    _channel.subscribe("userInfo", (data) => {
      const dataObj = JSON.parse(JSON.stringify(data));
      // 如果不是当前客户端
      if (dataObj.clientId !== initUser.id) {
        const map = new Map(otherUsers);
        map.set(dataObj.clientId, dataObj.data);
        setOtherUsers(map);
      }
    });

    // 当有一个新客户端进入频道，向他发送我的当前信息
    _channel.presence.subscribe("enter", function (member) {
      if (member.clientId !== initUser.id) {
        _channel.publish("userInfo", myPresence);
        console.log("进入频道：", member.clientId);
      }
    });

    // 当有客户端离开频道，更新我当前的客户端连接列表
    _channel.presence.subscribe("leave", function (member) {
      otherUsers.delete(member.clientId);
      setOtherUsers(otherUsers);
      console.log("离开频道：", member.clientId);
    });

    _channel.presence.enter();

    // 获取频道中的所有成员，并发送成员信息
    _channel.presence.get(function (err, members) {
      console.log(members);
      for (let i = 0; i < members.length; i += 1) {
        if (members[i].clientId !== initUser.id) {
          _channel.publish("userInfo", myPresence);
        }
      }
    });

    // 光标移动并传递信息
    const handlePointerMove = (e) => {
      const cursor = {
        x: Math.round(e.clientX),
        y: Math.round(e.clientY),
      };
      const newUser = { ...myPresence, cursor };

      _channel.publish("userInfo", newUser);

      setMyPresence(newUser);
    };

    // 光标移出
    const handlePointerLeave = () => {};

    document.body.addEventListener("pointermove", handlePointerMove, false);
    document.body.addEventListener("pointerleave", handlePointerLeave, false);
  }, []);

  return (
    <>
      {otherUsers.size === 0
        ? "You’re the only one here."
        : otherUsers.size === 1
        ? "There is one other person here."
        : `There are ${otherUsers.size} other people here.`}

      {/* self cursor */}
      {myPresence && myPresence.cursor && (
        <MyCursor
          color={myPresence.color}
          x={myPresence.cursor.x}
          y={myPresence.cursor.y}
        />
      )}

      {/* other users cursor */}
      {otherUsers &&
        Array.from(otherUsers.values()).map((item) => {
          return item.cursor ? (
            <OtherCursor
              key={item.id}
              color={item.color}
              x={item.cursor.x}
              y={item.cursor.y}
            />
          ) : null;
        })}
    </>
  );
}
