import { useState } from "react";

function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmit = (event) => {
    event.preventDefault();
    fetch("http://localhost:3000/admin/signin", {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    setEmail("");
    setPassword("");
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-slate-300 p-6 gap-4 rounded-xl min-w-[320px]"
      >
        <h3 className="text-center font-semibold text-[#2866df]">Sign In</h3>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          className="pl-2 py-2 rounded-md focus:outline-blue-500"
          onChange={(event) => setEmail(event.target.value)}
          value={email}
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="pl-2 py-2 rounded-md focus:outline-blue-500"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
        <button
          type="submit"
          className="bg-[#2866df] text-white font-semibold py-2 rounded-md hover:bg-[#215ac8]"
        >
          Sign In
        </button>
      </form>
    </div>
  );
}

export default Signin;
