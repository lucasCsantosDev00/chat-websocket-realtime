import React, { useEffect, useState } from "react";

import { useRouter } from "next/router";
import { FaFile, FaMicrophone, FaFileImage } from "react-icons/fa";
import io from "socket.io-client";

const port = 9000;
var socket;

//render correct icon file according to file type
function RenderComponent({ componentName, ...props }) {
  const ComponentName = componentName;
  if (componentName == "Image") {
    return <FaFileImage {...props} />;
  }

  if (componentName == "Audio") {
    return <FaMicrophone {...props} />;
  }

  if (componentName == "Document") {
    return <FaFile {...props} />;
  }
}

function Chat() {
  
  const router = useRouter();
  const { user, token } = router.query;

  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [username, setUsername] = useState(null);

  useEffect(() => {

    socket = io.connect(`http://localhost:${port}`, {
      transports: ["websocket"],
      query: { token: `${token}` },
    });

    var el = document.getElementById("Scroll");

    setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 0);

    socket.on("connect_error", (err) => {
      alert(`connect_error: ${err.message}`);
    });

    socket.on("broadcast", (message) => {

      const { id, username, text } = message;

      if (socket.id !== id) {
        setUsername(["username"]);
        setMessages([...messages, { username, text }]);
      }

    });

    socket.on("file", async (file) => {
      const { name, type, buffer, user } = file;

      let icon;
      const typeObj = (type) => {
        if (type === "png") {
          icon = "Image";
          return { type: "image/png" };
        }

        if (type === "pdf") {
          icon = "Document";
          return { type: "application/pdf" };
        }

        if (type === "mp3") {
          icon = "Audio";
          return { type: "audio/mpeg" };
        }
      };
      const blob = new Blob([buffer], typeObj(type));

      const blobUrl = URL.createObjectURL(blob);

      const url = blobUrl;

      const media = true;
      setMessages([...messages, { file: media, type, icon, name, user, url }]);
    });

    return () => {
      socket.disconnect();
    };
  });

  //Emitting the user message to server
  const handleSendMessage = (e) => {

    e.preventDefault();

    var el = document.getElementById("Scroll");

    setTimeout(() => {
      el.scrollTop = el.scrollHeight;
    }, 0);

    setMessage(e.target.value);

    socket.emit("message", { username: user, text: message });

    setMessages([...messages, { username: user, text: message }]);
  };

  //Triggers hidden upload input button and upload file
  const handleUpload = (e) => {
    const type = e.currentTarget.id;
    const id = `input${type}`;
    const el = document.getElementById(id);
    el.click();
    el.files;
  };

  //Emitting a file as a buffer to server
  const upload = (e) => {
    const file = e.target.files[0];

    const type = file.name.split(".").pop();
    const name = file.name;

    const reader = new FileReader();

    reader.onload = (e) => {
      const buffer = e.target.result;

      const file = {
        buffer,
        name,
        type,
        user,
      };
      socket.emit("upload", file, (status) => {
        console.log(status);
      });
    };

    reader.readAsArrayBuffer(file);
  };

  return (
    <>
      <input
        onChange={(e) => upload(e)}
        id="inputMicrophone"
        className="hidden"
        type="file"
        accept=".mp3,audio/*"
      ></input>
      <input
        onChange={(e) => upload(e)}
        id="inputImage"
        className="hidden"
        type="file"
        accept="image/png, image/gif, image/jpeg"
      ></input>
      <input
        onChange={(e) => upload(e)}
        id="inputFile"
        className="hidden"
        type="file"
        accept="application/pdf"
      ></input>

      <div className="bg-gray-900 h-screen p-10 flex flex-col">
        <div className="flex justify-between">
          <div className="flex flex-col"></div>
          <div className="flex flex-row">
            <button className="bg-gray-800 p-2 rounded-lg mr-2 text-white">
              <FaMicrophone id="Microphone" onClick={handleUpload} />
            </button>
            <button className="bg-gray-800 p-2 rounded-lg mr-2 text-white">
              <FaFileImage id="Image" onClick={handleUpload} />
            </button>
            <button className="bg-gray-800 p-2 rounded-lg mr-2 text-white">
              <FaFile id="File" onClick={handleUpload} />
            </button>
          </div>
        </div>
        <div
          id={"Scroll"}
          className="flex flex-grow mt-10 overflow-y-scroll flex-col"
        >
          {messages.map((message, index) =>
            message.file === true ? (
              <a
                download={"archive"}
                href={`${message.url}`}
                key={index}
                className="flex flex-col-reverse"
              >
                <div className="p-2 my-2 bg-gray-800 rounded-lg text-white">
                  {message.user}{" "}
                  <RenderComponent componentName={message.icon} />
                  {message.name}
                </div>
              </a>
            ) : (
              <div
                key={index}
                className="p-2 my-2 bg-gray-800 rounded-lg text-white"
              >
                <p>{message.username}</p>
                <p>Message: {message.text}</p>
              </div>
            )
          )}
        </div>
        <form className="mt-10">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="border border-gray-800 p-2 rounded-lg text-white w-full text-black"
            placeholder="Type your message here..."
          />
          <button
            className="bg-gray-800 p-2 mt-2 rounded-lg text-white"
            onClick={handleSendMessage}
          >
            Send
          </button>
        </form>
      </div>
    </>
  );
}

export default Chat;
