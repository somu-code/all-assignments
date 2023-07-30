import { useState } from "react";

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [visible, setVisible] = useState(false);
  const handleSubmit = (event) => {
    event.preventDefault();
    if (password !== confirmPassword) {
      setVisible(true);
      return;
    }
    setVisible(false);
    console.log(email);
    console.log(password);
    fetch("http://localhost:3000/admin/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => localStorage.setItem("token", data.token));
    setEmail("");
    setPassword("");
    setConfirmPassword("");
  };
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col bg-slate-300 p-6 gap-4 rounded-xl min-w-[320px]"
      >
        <h3 className="text-center font-semibold text-[#2866df]">Sign Up</h3>
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
        <input
          type="password"
          name="confirm-password"
          id="confirm-password"
          placeholder="Confirm Password"
          className="pl-2 py-2 rounded-md focus:outline-blue-500"
          onChange={(event) => setConfirmPassword(event.target.value)}
          value={confirmPassword}
        />
        {visible ? (
          <p className="text-center font-medium text-red-500">
            Password do not match!
          </p>
        ) : null}
        <button
          type="submit"
          className="bg-[#2866df] text-white font-semibold py-2 rounded-md hover:bg-[#215ac8]"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}

export default Signup;
