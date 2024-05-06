const Repair = require("../models/repair_model");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");

//get all repairs
const get_repairs = async (req, res) => {
  const repairs = await Repair.find({}).sort({ createdAt: 1 });
  res.status(200).json(repairs);
};

//get a single repair
const get_repair = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such repair" });
  }

  const repair = await Repair.findById(id);

  if (!repair) {
    return res.status(404).json({ error: "No such repair" });
  }

  res.status(200).json(repair);
};

//get a single repair by repair_id_str
const get_repair_by_str_id = async (req, res) => {
  const { id } = req.params;

  const repair = await Repair.findOne({ repair_id_str: id });

  if (!repair) {
    return res.status(404).json({ error: "No such repair" });
  }

  res.status(200).json(repair);
};

//post a new repair
const createRepair = async (req, res) => {
  const {
    repair_id_int,
    repair_id_str,
    name,
    email,
    contact,
    date,
    device_brand,
    device_model,
    problem,
    description,
  } = req.body;
  try {
    const repair = await Repair.create({
      repair_id_int,
      repair_id_str,
      name,
      email,
      contact,
      date,
      device_brand,
      device_model,
      problem,
      description,
    });
    res.status(200).json({ repair });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//delete a repair
const deleteRepair = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such repair" });
  }

  const repair = await Repair.findOneAndDelete({ _id: id });

  if (!repair) {
    return res.status(400).json({ error: "No such repair" });
  }

  res.status(200).json(repair);
};

//update the repair
const updateRepair = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such repair" });
  }

  const repair = await Repair.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    },
    { new: true }
  );

  if (!repair) {
    return res.status(400).json({ error: "No such repair" });
  }

  await sendEmail(repair.email);

  res.status(200).json(repair);
};

const sendEmail = async (userEmail) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "multimaster.orderconfirmation@gmail.com",
      pass: "pzap ssfk azxw yubg",
    },
  });

  let mailOptions = {
    from: "multimaster896@gmail.com",
    to: userEmail,
    subject: "Repair Status",
    text: "Your repair status is updated.",
  };

  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
};

module.exports = {
  get_repairs,
  get_repair,
  get_repair_by_str_id,
  createRepair,
  deleteRepair,
  updateRepair,
};
