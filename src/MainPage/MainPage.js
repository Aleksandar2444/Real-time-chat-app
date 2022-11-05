import "./MainPage.css";
import { useEffect, useState } from "react";
import io from "socket.io-client";
import { v4 } from "uuid";
import { Helmet } from "react-helmet";

// const PORT = 3001;
const socket = io(`https://fastapp-chatapp.herokuapp.com/`);

function MainPage() {
  const [isConnected, setIsConnected] = useState(socket.connected);
  const [newMessage, setNewMessage] = useState("");
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");
  const [chatIsVisible, setChatIsVisible] = useState(false);
  const [message, setMessage] = useState([]);

  //* Connecting part
  useEffect(() => {
    console.log("Connected", socket.connected);

    socket.on("connect", () => {
      setIsConnected(true);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
    };
  }, [isConnected]);

  //* Messaging part
  useEffect(() => {
    socket.on("receive_msg", ({ user, message }) => {
      const msg = `${user}: ${message}`;
      setMessage((prevState) => [msg, ...prevState]);
    });
  }, [socket]);

  //* Handle chat room
  const enterChatRoom = () => {
    if (user !== "" && room !== "") {
      setChatIsVisible(true);
      socket.emit("join_room", { user, room });
    }
  };

  //* Handle message
  const sendMessage = () => {
    const newMessageData = {
      room: room,
      user: user,
      message: newMessage,
    };

    socket.emit("send_msg", newMessageData);

    const msg = `${user}: ${newMessage}`;
    setMessage((prevState) => [msg, ...prevState]);
    setNewMessage("");
  };

  return (
    <div className="MainPage">
      <Helmet>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Helmet>
      {!chatIsVisible ? (
        <div className="Input_field">
          <input
            type="text"
            placeholder="Enter username"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
          <input
            type="text"
            placeholder="Enter room name"
            value={room}
            onChange={(e) => setRoom(e.target.value)}
          />
          <button onClick={enterChatRoom}>Enter</button>
        </div>
      ) : (
        <div className="Room">
          <div className="Room_info">
            <h5>Room: {room}</h5>
            <h5>User: {user}</h5>
          </div>
          <div className="Room_container">
            {message.map((el) => (
              <div className="el" key={v4()}>
                {el}
              </div>
            ))}
          </div>
          <div className="Room_message">
            <input
              type="text"
              placeholder="Message here"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <button onClick={sendMessage}>Send Message</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default MainPage;
