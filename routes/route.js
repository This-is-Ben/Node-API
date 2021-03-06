const express = require("express");
const router = express.Router();
const User = require("../models/User");

//Get all users from a DB
router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Get specific user from a DB
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.send(user);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Add user to DB
router.post("/add", async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Delete user from a DB
router.delete("/:id", async (req, res) => {
  try {
    const deletedUser = await User.remove({ _id: req.params.id });
    res.send(deletedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

//Update user in the DB
router.patch("/:id", async (req, res) => {
  try {
    const updateUser = await User.updateOne(
      { _id: req.params.id },
      { $set: { name: req.body.name } }
    );
    res.json(updateUser);
  } catch (error) {
    res.json({ message: err });
    //res.status(400).send(err);
  }
});

module.exports = router;
