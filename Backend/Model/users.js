const mongoose = require("mongoose");

const UserSchema = mongoose.Schema(
  {
    f_name: {
      type: String,
      required: false,
    },
    l_name: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: false,
    },
    emp_code: {
      type: String,
      required: false,
    },
    job_title: {
      type: String,
      required: false,
    },
    password: {
      type: String,
      required: true,
    },
    aadhar_no: {
      type: String,
      required: false,
    },
    acc_holder_name: {
      type: String,
      required: false,
    },
    account_no: {
      type: String,
      required: false,
    },

    employee_type: {
      type: String,
      required: false,
    },
    expected_salary: {
      type: String,
      required: false,
    },
    experience: {
      type: String,
      required: false,
    },

    ifsc: {
      type: String,
      required: false,
    },
    job_title: {
      type: String,
      required: false,
    },
    join_date: {
      type: String,
      required: false,
    },
    last_salary: {
      type: String,
      required: false,
    },
    pan_no: {
      type: String,
      required: false,
    },

    re_account_no: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      required: false,
    },
    salary: {
      type: String,
      required: false,
    },
    otp: {
      type: String,
      required: false,
    },
    img: {
      type: String,
    },
    department: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("Users", UserSchema);

module.exports = User;
