const { Prisma } = require("@prisma/client");
const prisma = require("../config/prisma");

// Existing getPayrollData function
const getPayrollData = async (userId, month, year) => {
  const filters = {};

  if (userId) {
    filters.userId = userId;
  }

  filters.month = month;
  filters.year = year;

  const payrollData = await prisma.payroll.findMany({
    where: filters,
  });

  // แปลงค่า Decimal ให้เป็น number
  return payrollData.map(item => ({
    ...item,
    netIncome: item.netIncome.toNumber(),
    income: item.income.toNumber(),
    salary: item.salary.toNumber(),
    compensation: item.compensation.toNumber(),
    tax: item.tax.toNumber(),
    socialSecurityFund: item.socialSecurityFund.toNumber(),
    providentFund: item.providentFund.toNumber(),
    extra: item.extra.toNumber(),
    incomePerDay: item.incomePerDay.toNumber(),
  }));
};

// New getAllPayrollData function
const getAllPayrollData = async () => {
  const payrollData = await prisma.payroll.findMany({
    include: {
      user: {
        select: {
          firstName: true,
          lastName: true,
        },
      },
    },
  });

  // แปลงค่า Decimal ให้เป็น number และรวม firstName, lastName จาก user
  return payrollData.map(item => ({
    ...item,
    firstName: item.user?.firstName || null,
    lastName: item.user?.lastName || null,
    netIncome: item.netIncome.toNumber(),
    income: item.income.toNumber(),
    salary: item.salary.toNumber(),
    compensation: item.compensation.toNumber(),
    tax: item.tax.toNumber(),
    socialSecurityFund: item.socialSecurityFund.toNumber(),
    providentFund: item.providentFund.toNumber(),
    extra: item.extra.toNumber(),
    incomePerDay: item.incomePerDay.toNumber(),
  }));
};


const submitPayrollData = async (data) => {
  if (data.income === undefined || data.income === null) {
    throw new Error("Income is required");
  }

  // กำหนดค่าเริ่มต้นสำหรับ fields ที่อาจจะไม่ได้รับค่า
  const netIncome = new Prisma.Decimal(data.netIncome || data.paidAmount);
  const tax = new Prisma.Decimal(data.tax || 0);
  const socialSecurityFund = new Prisma.Decimal(data.socialSecurityFund || 0);
  const compensation = new Prisma.Decimal(data.compensation || 0);
  const providentFund = new Prisma.Decimal(data.providentFund || 0);
  const extra = new Prisma.Decimal(data.extra || 0);
  const incomePerDay = new Prisma.Decimal(data.incomePerDay || 0);

  return await prisma.payroll.create({
    data: {
      userId: data.userId,
      paidDate: data.paidDate,
      netIncome: netIncome,
      month: data.month,
      year: data.year,
      income: new Prisma.Decimal(data.income),
      salary: new Prisma.Decimal(data.salary),
      compensation: compensation,
      tax: tax,
      socialSecurityFund: socialSecurityFund,
      providentFund: providentFund, // ส่งค่า providentFund
      extra: extra,
      incomePerDay: incomePerDay
    }
  });
};

module.exports = { getPayrollData, getAllPayrollData, submitPayrollData };
