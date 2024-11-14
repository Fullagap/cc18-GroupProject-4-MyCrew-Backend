const { Prisma } = require("@prisma/client");
const prisma = require("../config/prisma");

exports.getUserById = async (id) => {
  try {
    const data = {
      where: { id: id },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        phoneNumber: true,
        supId: true,
        departmentId: true,
        positionId: true,
        role: true,
        profileImg: true,
        address: true,
        salary: true,
        annualLeaveAmount: true,
        sickLeaveAmount: true,
        personalLeaveAmount: true,
        annualLeave: true,
        sickLeave: true,
        personalLeave: true,
        position: {
          select: { positionName: true },
        },
        Department: {
          select: { departmentName: true },
        },
      },
    };
    const resp = await prisma.user.findFirst(data);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

exports.getUsersId= async (id) => {
  try {
    const data = {select: { id : true } };
    const resp = await prisma.user.findMany(data);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

exports.getSalaryByUserId = async (id) => {
  try {
    const data = { where: { id: id }, select: { salary: true } };
    const resp = await prisma.user.findFirst(data);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

exports.getUserLeaveData = async (id) => {
  try {
    const data = {
      where: { id: id },
      select: {
        annualLeave: true,
        sickLeave: true,
        personalLeave: true,
      },
    };
    const resp = await prisma.user.findFirst(data);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

exports.updateUser = async (id,objData) => {
  try {
    const data = { where: { id: id }, data : objData };
    const resp = await prisma.user.update(data);
    return resp;
  } catch (error) {
    console.log(error);
  }
};

