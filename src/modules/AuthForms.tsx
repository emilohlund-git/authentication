import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";

type Props = {};

const AuthForms = (props: Props) => {
  const [activeForm, setActiveForm] = useState(0);

  if (activeForm === 0) return <Register setActiveForm={setActiveForm} />;
  else return <Login setActiveForm={setActiveForm} />;
};

export default AuthForms;
