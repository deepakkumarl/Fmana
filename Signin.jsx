import { Link } from "react-router-dom";

const Signin = ({ onSignIn , semail , setsemail , spass , setspass }) => {
  return (
    <>
      <h2 className="ghj">Financify</h2>
      <div className="sign">
        <div className="con">
          <div className="signinp">
            <input type="email" placeholder="Enter an email" value={semail} onChange={(e) => setsemail(e.target.value)} />
            <input type="password" placeholder="Enter a password" value={spass} onChange={(e) => setspass(e.target.value)} />
            <p><b><a href="#">Forget password</a></b></p>
          </div>
          <button className="btnn" onClick={onSignIn}>Sign In</button>
          <p className="hello">Don't have an account? <Link to="/signu">Create One</Link></p>
        </div>
      </div>
    </>
  );
};

export default Signin;
