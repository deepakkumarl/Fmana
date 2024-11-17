import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Budgets from "./Budgets";
import Totalm from "./Totalm";
import Subitems from "./Subitems";
import Dsiplay from "./Dsiplay";
import Signin from "./Signin";
import Signup from "./Signup";
import axios from "axios";

const App = () => {
  const URL = "http://localhost:3000";
  const [bug, setbug] = useState("");
  const [amo, setamo] = useState(0);
  const [tot, settot] = useState(0);
  const [bug2, setbug2] = useState("");
  const [ite, setite] = useState("");
  const [amo2, setamo2] = useState(0);
  const [cemail, setcemail] = useState("");
  const [cpass, setcpass] = useState("");
  const [semail , setsemail] = useState("");
  const [spass , setspass] = useState("");
  const navigate = useNavigate();
  const [pro, setpro] = useState(0);
  const [month, setmonth] = useState("");
  const [budgets, setbudgets] = useState([
    {
      id: 1,
      name: "hello bro",
      amount: 400,
      subbb: [
        { twoid: 1, subname: "new sub", subbudget: 22 },
        { twoid: 2, subname: "newss", subbudget: 40 },
      ],
    },
    {
      id: 2,
      name: "welcome bro",
      amount: 500,
      subbb: [
        { twoid: 1, subname: "new sub1", subbudget: 222 },
        { twoid: 2, subname: "newss2", subbudget: 403 },
      ],
    },
  ]);

  useEffect(() => {
    calproloss();
  }, [budgets, tot]);

  

  const calproloss = () => {
    let totamo = 0;
    for (const budg of budgets) {
      totamo += budg.amount;
    }
    const vall = tot - totamo;
    setpro(vall);
  };

 

 

  const dell = (delid) => {
    axios.delete(`${URL}/delbud/${delid}`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          const newBudgets = budgets.filter((budd) => budd.id !== delid);
          setbudgets(newBudgets);
          calproloss();
        }
      })
      .catch((error) => {
        console.error("Delete request failed:", error);
      });
  };

  const delsup = (delll, supidd) => {
    axios.delete(`${URL}/delsubbud/${supidd}`)
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          const updatedBudgets = budgets.map(bud => {
            if (bud.id === delll) {
              const newSubs = bud.subbb.filter(sups => sups.twoid !== supidd);
              return { ...bud, subbb: newSubs };
            }
            return bud;
          });
          setbudgets(updatedBudgets);
          calproloss();
        }
      })
      .catch((err) => {
        console.log("Error deleting sub-item:", err.message);
      });
  };

  const addbudget = () => {
    axios.post(`${URL}/addbud`, {
      bug: bug,
      amo: amo,
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          const id = res.data._id;
          const newname = bug;
          const newamount = amo;
          const updated = {
            id: id,
            name: newname,
            amount: newamount,
            subbb: [],
          };
          const newBudgets = [...budgets, updated];
          setbudgets(newBudgets);
          setbug("");
          setamo(0);
          calproloss();
        } else {
          console.log("Error in the post method");
        }
      });
  };

  const addsups = () => {
    axios.post(`${URL}/addsubdub`, {
      bug2: bug2,
      ite: ite,
      amo2: amo2,
    })
      .then((res) => {
        if (res.status >= 200 && res.status < 300) {
          const finded = budgets.find(bud => bud.name === bug2);
          if (finded) {
            const newtwoid = res.data._id;
            const newtoite = ite;
            const newamount = amo2;
            const newup = {
              twoid: newtwoid,
              subname: newtoite,
              subbudget: newamount,
            };
            finded.subbb.push(newup);
            setbudgets([...budgets]);
            setamo2(0);
            setbug2("");
            setite("");
            calproloss();
          } else {
            alert("No such budget is found");
          }
        }
      });
  };

  const handleSignIn = () => {
    
    axios.post(`${URL}/signin`, {
      semail: semail,
      spass: spass
    })
    .then((res) => {
      if (res.status >= 200 && res.status < 300) {
        navigate('/alll');
      }
    })
    .catch((err) => {
      console.log("Request failed with status:", err.response.status);
      console.log(err.message);
    });
  };


  const addaccount = () => {
    axios.post(`${URL}/signup` , {
      cemail:cemail,
      cpass:cpass
    })
    .then((res) => {
      if (res.status>=200 && res.status<300){
        console.log("User added succesfully")

      }
    })
    .catch((err) => {
      console.log(err.message)
    })

  }
  

  return (
    <>
      <Routes>
        <Route path="/" element={<Signin onSignIn={handleSignIn}
                                  semail={semail}
                                  setsemail={setsemail}
                                  spass={spass}
                                  setspass={setspass} />} />
        <Route path="/signu" element={
          <Signup 
            cemail={cemail}
            setcemail={setcemail}
            cpass={cpass}
            setcpass={setcpass}
            addaccount={addaccount}
          />
        } />
        <Route path="/alll" element={
          <>
            <Budgets
              bug={bug}
              setbug={setbug}
              amo={amo}
              setamo={setamo}
              addbudget={addbudget}
            />
            <Subitems
              bug2={bug2}
              setbug2={setbug2}
              ite={ite}
              setite={setite}
              amo2={amo2}
              setamo2={setamo2}
              addsups={addsups}
            />
            <Totalm
              tot={tot}
              settot={settot}
              month={month}
              setmonth={setmonth}
            />
            <Dsiplay
              budgets={budgets}
              dell={dell}
              delsup={delsup}
              pro={pro}
            />
          </>
        } />
      </Routes>
    </>
  );
};

export default App;
