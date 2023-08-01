import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signin() {
  const navigate = useNavigate();
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
    navigate("/");
  };
  return (
    <div className="min-h-[90vh] flex flex-row justify-center items-center">
      <div className="w-[430px] bg-slate-300 rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="mx-auto py-8 flex flex-col gap-5 w-[330px]"
        >
          <h3 className="text-center font-bold text-[#1E0E62] text-4xl mb-6">
            Sign In
          </h3>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Email"
            required
            className="pl-2 py-2 rounded-md focus:outline-blue-500"
            onChange={(event) => setEmail(event.target.value)}
            value={email}
          />
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Password"
            required
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
    </div>
  );
}

export default Signin;
