function Signin() {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <form className="flex flex-col bg-slate-300 p-6 gap-4 rounded-xl min-w-[320px]">
        <h3 className="text-center font-semibold text-[#2866df]">Sign In</h3>
        <input
          type="text"
          name="username"
          id="username"
          placeholder="Username"
          className="pl-2 py-2 rounded-md focus:outline-blue-500"
        />
        <input
          type="password"
          name="password"
          id="password"
          placeholder="Password"
          className="pl-2 py-2 rounded-md focus:outline-blue-500"
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
