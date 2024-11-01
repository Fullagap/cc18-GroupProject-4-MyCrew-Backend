const bcrypt = require("bcryptjs");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const hashedPassword = bcrypt.hashSync("123456", 10);

const userData = [
  {
    id: 1,
    firstName: "dummyFirst",
    lastName: "dummyLastName",
    email: "dummy@codecamp.com",
    password: hashedPassword,
    address : "Centerpoint",
    identicalNumber: "1111111111111",
    phoneNumber: "111111111",
    departmentId: 1,
    positionId: 1,
    role: "ADMIN",
    bookBank: "1234567890123",
    salary: 20000,
    annualLeaveAmount: 10.0,
    sickLeaveAmount: 30,
  },
  {
    id: 2,
    firstName: "Faris",
    lastName: "Konjeng",
    email: "Faris@codecamp.com",
    password: hashedPassword,
    address : "Centerpoint",
    identicalNumber: "2111111111111",
    phoneNumber: "222222222",
    supId: 1,
    departmentId: 1,
    positionId: 1,
    role: "ADMIN",
    bookBank: "2234567890123",
    salary: 20000,
    annualLeaveAmount: 10.0,
    sickLeaveAmount: 30,
  },
  {
    id: 3,
    firstName: "mark",
    lastName: "lolicon",
    email: "Mark@codecamp.com",
    password: hashedPassword,
    address : "Centerpoint",
    identicalNumber: "3111111111111",
    phoneNumber: "3333333333",
    supId: 1,
    departmentId: 2,
    positionId: 1,
    role: "ADMIN",
    bookBank: "3234567890123",
    salary: 20000,
    annualLeaveAmount: 10.0,
    sickLeaveAmount: 30,
  },
  {
    id: 4,
    firstName: "bond",
    lastName: "bondage",
    email: "bond@codecamp.com",
    password: hashedPassword,
    address : "Centerpoint",
    identicalNumber: "4111111111111",
    phoneNumber: "444444444",
    supId: 2,
    departmentId: 1,
    positionId: 1,
    role: "USER",
    bookBank: "4234567890123",
    salary: 20000,
    annualLeaveAmount: 10.0,
    sickLeaveAmount: 30,
  },
  {
    id: 5,
    firstName: "JP",
    lastName: "SOD",
    email: "JP@codecamp.com",
    password: hashedPassword,
    address : "Centerpoint",
    identicalNumber: "5111111111111",
    phoneNumber: "5555555555",
    supId: 2,
    departmentId: 1,
    positionId: 2,
    role: "USER",
    bookBank: "5234567890123",
    salary: 20000,
    annualLeaveAmount: 10.0,
    sickLeaveAmount: 30,
  },
  {
    id: 6,
    firstName: "gap",
    lastName: "babyshark",
    email: "GAP@codecamp.com",
    password: hashedPassword,
    address : "Centerpoint",
    identicalNumber: "6111111111111",
    phoneNumber: "6666666666",
    supId: 3,
    departmentId: 2,
    positionId: 1,
    role: "USER",
    bookBank: "6234567890123",
    salary: 20000,
    annualLeaveAmount: 10.0,
    sickLeaveAmount: 30,
  },
  {
    id: 7,
    firstName: "Tii",
    lastName: "Tidtee",
    email: "Tidtee@codecamp.com",
    password: hashedPassword,
    address : "Centerpoint",
    identicalNumber: "7111111111111",
    phoneNumber: "7777777777",
    supId: 3,
    departmentId: 2,
    positionId: 2,
    role: "USER",
    bookBank: "7234567890123",
    salary: 20000,
    annualLeaveAmount: 10.0,
    sickLeaveAmount: 30,
  },
];

const departmentData = [
  { id: 1, departmentName: "Engineer" },
  { id: 2, departmentName: "purchasee" },
];
const positionData = [
  { id: 1, departmentId: 1, positionName: "Electircal Engineer" },
  { id: 2, departmentId: 1, positionName: "Mechanical Engineer" },
  { id: 3, departmentId: 2, positionName: "Clerk A" },
  { id: 4, departmentId: 2, positionName: "Clerk B" },
];
const leaveCategoryData = [
  { id: 1, leaveName: "annualLeave" },
  { id: 2, leaveName: "sickLeave" },
  { id: 3, leaveName: "WOPay" },
];
const leaveRecordData = [
  {
    id: 1,
    userId: 2,
    startDate: new Date(2021, 12, 15),
    endDate: new Date(2021, 12, 15),
    leaveTypeId: 1,
    supId: 1,
    status: "APPROVE",
  },
  {
    id: 2,
    userId: 2,
    startDate: new Date(2021, 12, 15),
    endDate: new Date(2021, 12, 15),
    leaveTypeId: 2,
    supId: 1,
    status: "WAITING",
  },
];
const attandanceData = [
  {
    id: 1,
    userId: 2,
    date: new Date(2021, 12, 15),
    checkInTime: new Date(),
    checkOutTime: new Date(),
    isWorkingDay: true,
  },
  {
    id: 2,
    userId: 2,
    date: new Date(2021, 12, 16),
    checkInTime: new Date(),
    checkOutTime: new Date(),
    isWorkingDay: true,
  },
];
const payrollData =[
    {
        id : 1,
        userId : 1,
        paidAmount : 20000,
        paidDate : new Date(2021, 12, 16),
        salary : 20000,
        compensation : 0
    },{
        id : 2,
        userId : 2,
        paidAmount : 20000,
        paidDate : new Date(2021, 12, 16),
        salary : 20000,
        compensation : 0
    }
]
const sessionData = [
    {
        id : 1,
        targetDate : new Date(2021,12,15),
        description : "training session",
        eventType : "HR",
        createdAt : new Date(),
        attendanceLimit : 50,
        createUserId : 1
    }
]
const activityAttandanceData = [
    {id : 1, sessionId : 1, userId:1},
    {id : 2, sessionId : 1, userId : 2}
]
const siteData = [
  {id : 1, siteName : "Central"},
  {id : 2, siteName : "Paragon"}
  
]


console.log("DB seed.....");

async function run() {
  await prisma.department.createMany({ data: departmentData });
  await prisma.position.createMany({ data: positionData });
  await prisma.user.createMany({ data: userData });
  await prisma.leaveCategory.createMany({ data: leaveCategoryData });
  await prisma.leaveRecord.createMany({ data: leaveRecordData });
  await prisma.attendance.createMany({ data: attandanceData });
  await prisma.payroll.createMany({ data: payrollData });
  await prisma.session.createMany({ data: sessionData });
  await prisma.activityAttandance.createMany({ data: activityAttandanceData });
}

run();
