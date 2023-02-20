
import Router from "next/router";
import { useState } from "react";

const API_URL = process.env.API_URL || 'http://localhost:3000';

export default function Home() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    var headers = new Headers();
    headers.append("Content-Type", "application/json");
    headers.append("Accept", "application/json");

    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers,

      redirect: "follow",

      body: JSON.stringify({ email, password }),
    });

    const res = await response.json();

    const user = res.user;
    const token = res.token;

    if (user !== undefined && user !== null) {
      if (token) {
        Router.push(`/chat/${user}/${token}`);
      }
    } else {
      alert("Dados incorretos!")
    }
  };
  return (
    <>
      <div className="bg-gray-200 h-screen flex items-center justify-center">
        <form
          className="bg-white p-6 rounded-lg shadow-xl"
          onSubmit={handleSubmit}
        >
          <h2 className="text-lg font-medium mb-4">Login</h2>
          <div className="mb-4">
            <label
              className="block font-medium mb-2 bg-text-gray-700"
              htmlFor="email"
            >
              Email
            </label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-gray-200 p-2 rounded-lg w-full"
              type="email"
              id="email"
              name="email"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block font-medium mb-2 bg-text-gray-700"
              htmlFor="password"
            >
              Password
            </label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="bg-gray-200 p-2 rounded-lg w-full"
              type="password"
              id="password"
              name="password"
              required
            />
          </div>
          <button className="bg-green-500 py-2 px-4 rounded-lg text-white hover:bg-green-600">
            Submit
          </button>
        </form>
      </div>
    </>
  );
}
