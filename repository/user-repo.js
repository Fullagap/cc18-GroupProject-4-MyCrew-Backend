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
