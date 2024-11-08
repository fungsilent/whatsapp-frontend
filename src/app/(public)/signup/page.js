"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import useFetch from "#root/hooks/useFetch";
import { signUp } from "#root/api/newUser";

const SignUpPage = () => {
  const [dispatchSignUp, user, isLoading, error] = useFetch();
  const [equal, setEqual] = useState(true);
  const [{ username, name, password, confirm }, setForm] = useState({
    username: "",
    name: "",
    password: "",
    confirm: "",
  });

  const setFormValue = (event) => {
    event.target.value;
    setForm((state) => ({
      ...state,
      [event.target.name]: event.target.value,
    }));
  };

  const doSignUp = () => {
    if (password === confirm) {
      dispatchSignUp(() => signUp({ username, name, password, confirm }));
    } else {
      setEqual(false);
    }
  };

  return (
    <form className="p-10 grid gap-3">
      <div>
        <label>Username</label>
        <input
          name="username"
          type="text"
          value={username}
          onChange={setFormValue}
        />
      </div>
      <div>
        <label>Name</label>
        <input name="name" type="text" value={name} onChange={setFormValue} />
      </div>
      <div>
        <label>Password</label>
        <input
          name="password"
          type="password"
          value={password}
          onChange={setFormValue}
        />
      </div>
      <div>
        <label>Confirm password</label>
        <input
          name="confirm"
          type="password"
          value={confirm}
          onChange={setFormValue}
        />
      </div>
      {error && <div>{error}</div>}
      {isLoading && <div>isLoading</div>}
      <button type="button" onClick={doSignUp}>
        Create
      </button>

      <br></br>
      <Link href={"/login"}>Homepage</Link>
    </form>
  );
};

export default SignUpPage;
