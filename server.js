const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require("cors");

const Sign = require('./Signup');
const Budg = require('./Budget');
const Subb = require('./Subbudget');
const Signin = require('./Signin')

const PORT = 3000;

app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/finan")
  .then(() => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.error("Database connection error:", err.message);  
  });

app.get("/", (req, res) => {
  res.send("hello bro");
});





app.post("/signup", async (req, res) => {
  const emailc = req.body.cemail;
  const passc = req.body.cpass;

  try {
    const neww = await Sign.create({
      email: emailc,
      password: passc
    });
    res.status(201).json(neww);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const aa = req.body.semail;
    const bb = req.body.spass;

    const check = await Sign.findOne({
      email: aa
    });

    if (check) {
      if (check.password === bb) {
        const alreadySignedIn = await Signin.findOne({
          emaill: aa,
          passs: bb
        });

        if (alreadySignedIn) {
          res.status(200).json(alreadySignedIn);
        } else {
          const kkk = await Signin.create({
            emaill: aa, 
            passs: bb
          });
          res.status(201).json(kkk);
        }
      } else {
        res.status(400).json({ error: "Invalid email or password" });
      }
    } else {
      res.status(400).json({ error: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});





app.post("/addbud", async (req, res) => {
  const a = req.body.bug;
  const b = req.body.amo;

  try {
    const pos = await Budg.create({
      budname: a,
      budamount: b
    });
    res.status(201).json(pos);
  } catch (err) {
    res.status(404).json(err.message);
  }
});

app.post("/addsubdub", async (req, res) => {
  const c = req.body.bug2;
  const d = req.body.ite;
  const e = req.body.amo2;

  try {
    const ress = await Subb.create({
      namebud: c,
      subname: d,
      subamount: e
    });

    const updatedBudg = await Budg.findOneAndUpdate(
      { budname: c },
      { $push: { subs: ress._id } },
      { new: true }
    );

    res.status(201).json(ress);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete("/delbud/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const deleted = await Budg.findByIdAndDelete(id);
    if (deleted) {
      await Subb.deleteMany({ namebud: deleted.budname });
      res.status(200).send("Budget and associated sub-items deleted");
    } else {
      res.status(404).send("Budget not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.delete("/delsubbud/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const subItem = await Subb.findById(id);
    if (subItem) {
      await Subb.findByIdAndDelete(id);
      await Budg.updateOne(
        { budname: subItem.namebud },
        { $pull: { subs: id } }
      );
      res.status(200).send("Sub-item deleted");
    } else {
      res.status(404).send("Sub-item not found");
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
