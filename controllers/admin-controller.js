const prisma = require("../config/prisma")
const createError = require("../utils/createError")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")


exports.register = async(req,res,next)=>{
  
    try {

        const {firstName,lastName,email,  identicalNumber ,phoneNumber,departmentId,positionId,bookBank,salary,dateStart,annualLeaveAmount,sickLeaveAmount,WOPayAmount,supId} = req.body

        
        const checkEmail = await prisma.user.findFirst({
            where:{email:email}
        }) 
        if(checkEmail){
            return createError(400,'This user already exist')
        }
        const checkIdentityCardNumber = await prisma.user.findFirst({
            where:{  identicalNumber :  identicalNumber }
        }) 
        if(checkIdentityCardNumber){
            return createError(400,'This user already exist')
        }
        const password =   identicalNumber 

        const hashPassword = await bcrypt.hash(password,10)
        
        //alert mock departmentId and positionId in your database
        const newUser = await prisma.user.create({
            data:{
                firstName,
                lastName,
                identicalNumber ,
                email,
                phoneNumber,
                password:hashPassword,
                departmentId,
                positionId,
                bookBank,
                salary,
                dateStart,
                annualLeaveAmount,
                sickLeaveAmount,
                WOPayAmount,
                supId: +supId
            }
        })
    //    console.log("newww",newUser.supId)

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nattapongbe@gmail.com', 
                pass: 'uznb twuk cicb omxw',   
            },
        });

     
        const mailOptions = {
            from: 'nattapongbe@gmail.com', 
            to: email,         
            subject: 'Password for login',
            html: `
                <p>Dear ${firstName},</p>
                <p>Here is your email to login :${email}.</p>
                <p>password:${ identicalNumber }.</p>
                <p>MyCrew Admin</p>
            `,
        };
        // console.log(mailOptions)
      
        transporter.sendMail(mailOptions, (err, info) => {
            if (err) {
                console.log(err);
                return res.status(400).json({ msg: 'Failed to register.' });
            } else {
                console.log('Email sent: ' + info.response);
                res.json({ msg: 'Register successfully confirmed and email sent.' });
            }
        });







        res.json(`register successful ${newUser.firstName}`)
    } catch (err) {
        next(err)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = {};
        // console.log("userrrrrrrrr",req.body)
        
        if (req.body.email) updateData.email = req.body.email;
        if (req.body.phoneNumber) updateData.phoneNumber = req.body.phoneNumber;
        if (req.body.departmentId) updateData.departmentId = req.body.departmentId;
        if (req.body.positionId) updateData.positionId = req.body.positionId;
        if (req.body.bookBank) updateData.bookBank = req.body.bookBank;
        if (req.body.salary) updateData.salary = req.body.salary;
        if (req.body.annualLeaveAmount) updateData.annualLeaveAmount = req.body.annualLeaveAmount;
        if (req.body.sickLeaveAmount) updateData.sickLeaveAmount = req.body.sickLeaveAmount;
        if (req.body.WOPayAmount) updateData.WOPayAmount = req.body.WOPayAmount;
        if (req.body.supId) updateData.supId =req.body.supId;
        console.log("updateData",updateData)


        const updatedUser = await prisma.user.update({
            where: { id: +id },
            data: updateData
        });

        res.json("Update successful");
    } catch (err) {
        next(err)
    }
};

exports.getUserById = async(req,res,next)=>{
    try {
        const {id} = req.params

        const user = await prisma.user.findFirst({
            where:{id: +id},
            select:{
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                phoneNumber: true,
                supId: true,
                departmentId: true,
                positionId: true,
                role: true,
                bookBank: true,
                salary: true,
                annualLeaveAmount:true,
                sickLeaveAmount:true,
                WOPayAmount:true,
                position:{
                    select: {positionName: true}
                },
                Department:{
                    select: {departmentName: true}
                }
            }
        })
        res.json(user)
    } catch (err) {
        next(err)
    }
}

exports.getDepartment = async(req,res,next)=>{
    try {
        const department = await prisma.department.findMany({})

        res.json(department)
    } catch (err) {
        console.log(err)
    }
}
// exports.getSupId = async(req,res,next)=>{
//     try {
//         const getSupId = await prisma.user.findMany({
//             where:{}
//         })
//     } catch (err) {
//         next(err)
//     }
// }

exports.getPositionEachDepartment = async(req,res,next)=>{
    try {

        const {id} = req.params
        const position = await prisma.position.findMany({
          where:{departmentId: +id}
        })
        res.json(position)
    } catch (err) {
        next(err)
    }
}
exports.getEmployeeInDepartment = async(req,res,next)=>{
    try {
        const {id}= req.params
        const employees = await prisma.department.findMany({
            where:{
                id:+id
            },
            select:{
                departmentName: true,
                Users:{
                    select:{
                        id: true,
                        firstName: true,
                        lastName: true,
                        email: true,
                        identityCardNumber: true,
                        position:{
                            select:{
                                positionName: true
                            }
                        }

                    }
                }
            }
        })
        res.json(employees)
    } catch (err) {
        next(err)
    }
}

exports.getEachSuperId = async (req, res, next) => {
    try {
        const { id } = req.params;
        const superId = await prisma.user.findMany({
            where: {
                supId: +id
            },
            include:{
               position:{
                select:{
                    positionName:true,

                }
               },
               Department:{
                select:{
                    departmentName: true
                }
               }

            }
        });

        const employeeEachSuperId = superId.map(({ password, identityCardNumber, dateStart, dateEnd,profileImg, ...userData }) => userData);

        res.json(employeeEachSuperId);
    } catch (err) {
        next(err);
    }
};

exports.getLeaderEachSupId = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Find the leader by their `id`
        const leader = await prisma.user.findFirst({
            where: {
                id: +id,  // Assuming `id` is the leader's unique identifier
                // supId: null, // Indicates they are a top-level leader with no supervisor
            },
            include: {
                position: {
                    select: {
                        positionName: true,
                    },
                },
                Department: {
                    select: {
                        departmentName: true,
                    },
                },
            },
        });

        if (!leader) {
            return next(createError(400, "Leader with the specified ID not found or is not a top-level leader"));
        }

        // Now, use the leader's `id` as `supId` to get their subordinates
        const subordinates = await prisma.user.findMany({
            where: {
                supId: leader.id, // Users with this leader as their `supId`
            },
            orderBy: {
                dateStart: 'asc', // Sort by date of joining, if needed
            },
            select: {
                id: true,
                firstName: true,
                lastName: true,
                email: true,
                position: {
                    select: {
                        positionName: true,
                    },
                },
                Department: {
                    select: {
                        departmentName: true,
                    },
                },
            },
        });

        res.json({
            leader: {
                id: leader.id,
                firstName: leader.firstName,
                lastName: leader.lastName,
                position: leader.position.positionName,
                department: leader.Department?.departmentName,
            },
            subordinates,
        });
    } catch (err) {
        next(err);
    }
};


exports.getSupIdByDepartment = async (req, res, next) => {
    try {
        const { id } = req.params;

        const department = await prisma.department.findUnique({
            where: {
                id: +id,
            },
            select: {
                id: true,
                departmentName: true,
                Users: {
                    select: {
                        supId: true,
                    },
                    distinct: ['supId'],
                    where: {
                        supId: {
                            not: null, // Exclude null supId values if needed
                        },
                    },
                },
            },
        });

        if (!department) {
            return res.status(404).json({ message: "Department not found" });
        }

        // Format the result to show unique supId for the department
        const result = {
            departmentId: department.id,
            departmentName: department.departmentName,
            supIds: department.Users.map(user => user.supId),
        };

        res.json(result);
    } catch (err) {
        next(err);
    }
};

