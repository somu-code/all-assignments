import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
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
    fetch("http://localhost:3000/admin/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    navigate("/admin/signin");
  };
  return (
    <div className="min-h-[90vh] flex flex-row justify-center items-center">
      <div className="w-[430px] bg-slate-300 rounded-xl">
        <form
          onSubmit={handleSubmit}
          className="mx-auto py-8 flex flex-col gap-5 w-[330px]"
        >
          <h3 className="text-center font-bold text-[#1E0E62] text-4xl mb-6">
            Sign Up Now
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
          <input
            type="password"
            name="confirm-password"
            id="confirm-password"
            placeholder="Confirm Password"
            required
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
    </div>
  );
}

export default Signup;
