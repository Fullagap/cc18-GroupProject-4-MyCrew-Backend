const { getRecordByUserId } = require("../repository/leaverecord-repo");
const { getUserById } = require("../repository/user-repo");
const createError = require("../utils/createError");
const prisma = require("../config/prisma");
const { getAllPayrollByUserId, getPayroll } = require("../repository/payroll-repo");

exports.GetUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
    console.log(userid);
    const user = await getUserById(Number(userid));
    if (!user) {
      createError(500, "user is invalid");
    }
    console.log("user is ", user);
    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

exports.GetLeave = async (req, res, next) => {
  try {
    const { userid } = req.params;
    console.log(userid);
    const user = await getUserById(Number(userid));
    if (!user) {
      createError(500, "user is invalid");
    }
    const leave = {
      AL: user.annualLeaveAmount,
      SL: user.sickLeaveAmount,
      WOP: user.WOPayAmount,
    };
    console.log("leave amout is ", leave);
    res.status(200).json(leave);
  } catch (error) {
    next(error);
  }
};

exports.GetSalary = async (req, res, next) => {
  try {
    const { userid } = req.params;
    console.log(userid);
    const user = await getUserById(Number(userid));
    if (!user) {
      createError(500, "user is invalid");
    }
    const salary = user.salary;
    console.log(salary);
    console.log("salary amout is ", salary);
    res.status(200).json({ salary });
  } catch (error) {
    next(error);
  }
};

exports.getLastPayroll = async (req, res, next) => {
  try {
    const { userid } = req.params;
    const {month,year} = req.body
    console.log("xxxxxxxxxxxxxxxxxxxxxxx")
    console.log('month, year', month, year)
    const rec = await getPayroll(Number(userid),Number(month),Number(year));
    console.log(rec);
    
    if (!rec) {
      createError(500, "record is invalid");
    }
    
    res.status(200).json(rec);
  } catch (error) {
    next(error);
  }
};

exports.GetAllPayRecByUser = async (req, res, next) => {
  try {
    const { userid } = req.params;
    console.log(userid);
    const rec = await getAllPayrollByUserId(Number(userid));
    if (!rec) {
      createError(500, "record is invalid");
    }
    
    console.log(rec);
    
    res.status(200).json(rec);
  } catch (error) {
    next(error);
  }
};

exports.GetLeaveRecord = async (req, res, next) => {
  try {
    const { userid } = req.params;
    console.log(userid);
    const rec = await getRecordByUserId(Number(userid));
    if (!rec) {
      createError(500, "record is not valid");
    }
    console.log(rec);

    res.status(200).json(rec);
  } catch (error) {
    next(error);
  }
};

exports.getSiteLocationData = async (req, res, next) => {
  try {
    const siteLocation = await prisma.site.findMany();
    res.status(201).json(siteLocation);
  } catch (err) {
    next(err);
  }
};


