const { Prisma } = require("@prisma/client");
const prisma = require("../config/prisma");

exports.getLeaveType = async (id) => {
    try {
      const data = { where: { id: id }}
      const resp = await prisma.leaveCategory.findFirst(data);
      return resp;
    } catch (error) {
      console.log(error);
    }
  };