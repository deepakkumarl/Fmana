import { Link } from "react-router-dom";

const Signup = ({cemail , setcemail , cpass , setcpass , addaccount}) => {
  return (
    <>
      <h2 className="ghj">Financify</h2>
      <div className="sign">
        <div className="con">
          <div className="signinp">
            <input type="email" placeholder="Enter an email" value={cemail} onChange={(e) => setcemail(e.target.value)}/>
            <input type="password" placeholder="Enter a password" value={cpass} onChange={(e) => setcpass(e.target.value)}/>
          </div>
          <button className="btnn" onClick={addaccount}>Create Account</button>
          <button className="btnnn"><Link to="/">Login</Link></button>
        </div>
      </div>
    </>
  );
};

export default Signup;
