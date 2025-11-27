"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import markMessagesRead from "../actions/markMessagesRead";
import useGlobalContext from "../context/GlobalContext";
import deleteMessage from "../actions/deleteMessage";
const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.read);
  const [isDelete, setIsDeleted] = useState(false);
  const {setUnreadCount}  = useGlobalContext();
  async function handleReadClick() {
    const read = await markMessagesRead(message._id);
    setIsRead(read);
    setUnreadCount((prev)=>(read ? prev-1:prev+1))
    toast.success(`Marked as ${read ? "Read" : "New"}`);
  }

  async function handleDeleteClick() {
        await deleteMessage(message._id);
        setIsDeleted(true);
        setUnreadCount((prev)=>(read ? prev:prev-1))
        toast.success(`Message Deleted`);
  }

  if(isDelete){
    return (
        <p>
            Deleted message
        </p>
    )
  }
  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200 mt-2">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py rounded-md">
          New
        </div>
      )}
      <h2 className="span font-bold"> {message.property.name}</h2>
      <p className="text-gray-700">{message?.body}</p>
      <ul className="mt-4">
        <li>
          <strong>Reply Email:</strong>{" "}
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>{" "}
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Recieved:</strong>{" "}
          {new Date(message.createdAt).toLocaleString()}
        </li>
      </ul>
      <button
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
        onClick={handleReadClick}
      >
        {isRead ? "Mark as new" : "Mark as read"}
      </button>
      <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      onClick={handleDeleteClick}>
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
