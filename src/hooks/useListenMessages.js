import { useEffect } from "react";

import { useSocketContext } from "../context/SocketContext";
import useConversation from "../zustand/useConversation";

import notificationSound from "../assets/sounds/notification.mp3";
import { useAuthContext } from "../context/AuthContext";

const useListenMessages = (id) => {
  const { socket } = useSocketContext();
  const { messages, setMessages } = useConversation();
  const { authUser } = useAuthContext();

  useEffect(() => {
    socket?.on("newMessage", (newMessage) => {
      if (
        newMessage.receiverId === authUser._id &&
        newMessage.senderId === id
      ) {
        newMessage.shouldShake = true;
        const sound = new Audio(notificationSound);
        sound.play();
        setMessages([...messages, newMessage]);
      }
    });

    return () => socket?.off("newMessage");
  }, [socket, setMessages, messages]);
};
export default useListenMessages;
