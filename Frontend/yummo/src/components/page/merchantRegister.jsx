import React, { useState } from "react";

export const Register = (props) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [bizname, setBusinessName] = useState("");
  const [mobileno, setMobilePhone] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [isChecked1, setIsChecked1] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (pass !== confirmPass) {
      alert("Passwords do not match");
      return;
    }
    console.log(email);
  };

  const Checkbox1 = ({ isChecked1, handleCheckboxChange1 }) => {
    return (
      <div className="checkbox1">
        <label>
          <input
            type="checkbox"
            checked={isChecked1}
            onChange={handleCheckboxChange1}
          />
          I agree to receive communication such as but not limited to status of
          my application, reminders, updates via Yummo’s approved third party
          communication platform. This field is required.
        </label>
      </div>
    );
  };

  const Checkbox2 = ({ isChecked2, handleCheckboxChange2 }) => {
    return (
      <div className="checkbox2">
        <label>
          <input
            type="checkbox"
            checked={isChecked2}
            onChange={handleCheckboxChange2}
          />
          By proceeding, I agree that Yummo can collect, use and disclose the
          information provided by me, on behalf of the applicant company,in
          accordance with Yummo’s Privacy Notice which I have read and
          understand.
        </label>
      </div>
    );
  };

  const handleCheckboxChange1 = () => {
    setIsChecked1(!isChecked1);
  };

  const handleCheckboxChange2 = () => {
    setIsChecked2(!isChecked2);
  };

  return (
    <div className="auth-form-container">
      <h2>Yummo partner merchant sign up:</h2> {/*header*/}
      <p>
        Enter your store details to get started. Upon submission, you should
        receive the registration instructions in your email provided below.
      </p>
      <form className="register-form" onSubmit={handleSubmit}>
        <label htmlFor="businessName">Business name</label>
        <input
          value={bizname}
          onChange={(e) => setBusinessName(e.target.value)}
          name="businessName"
          id="businessName"
          placeholder="Yummo Pte Ltd"
        />
        <label htmlFor="mobilePhone">Mobile Phone</label>
        <input
          value={mobileno}
          onChange={(e) => setMobilePhone(e.target.value)}
          name="mobilePhone"
          id="mobilePhone"
          placeholder="98766543"
        />
        <label htmlFor="email">email</label>
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          type="email"
          placeholder="yummo@gmail.com"
          id="email"
          name="email"
        />
        <label htmlFor="password">Password</label>
        <input
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          type="password"
          placeholder="********"
          id="password"
          name="password"
        />
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input
          value={confirmPass}
          onChange={(e) => setConfirmPass(e.target.value)}
          type="password"
          placeholder="********"
          id="confirmPassword"
          name="confirmPassword"
        />
        <Checkbox1
          isChecked1={isChecked1}
          handleCheckboxChange1={handleCheckboxChange1}
        />
        <Checkbox2
          isChecked2={isChecked2}
          handleCheckboxChange2={handleCheckboxChange2}
        />

        <button type="submit">Submit</button>
      </form>
      <button
        className="link-button"
        onClick={() => props.onFormSwitch("login")}
      >
        Already have an account? Log in here
      </button>
    </div>
  );
};
