const prisma = require("../config/prisma")
const createError = require("../utils/createError")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")


exports.register = async(req,res,next)=>{
  
    try {

        const {firstName,lastName,email,identicalNumber,phoneNumber,departmentId,positionId,bookBank,salary,dateStart,annualLeaveAmount,sickLeaveAmount,WOPayAmount,supId} = req.body

        
        const checkEmail = await prisma.user.findFirst({
            where:{email:email}
        }) 
        if(checkEmail){
            return createError(400,'This user already exist')
        }
        const checkIdentityCardNumber = await prisma.user.findFirst({
            where:{identicalNumber:identicalNumber}
        }) 
        if(checkIdentityCardNumber){
            return createError(400,'This user already exist')
        }
        const password = identicalNumber

        const hashPassword = await bcrypt.hash(password,10)
        
        const newUser = await prisma.user.create({
            data:{
                firstName,
                lastName,
                identicalNumber,
                email,
                phoneNumber,
                password:hashPassword,
                departmentId:+departmentId ,
                positionId: +positionId,
                bookBank,
                salary,
                dateStart: new Date(dateStart),
                annualLeaveAmount: +annualLeaveAmount,
                sickLeaveAmount: +sickLeaveAmount,
                WOPayAmount: +WOPayAmount,
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
                <p>password:${identityCardNumber}.</p>
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

exports.allEmployees = async(req,res,next)=>{
    try {
        const employees = await prisma.user.findMany({
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
        })

        const employeesDetail = employees.map(({ password,dateEnd,profileImg, ...userData }) => userData);
        res.json(employeesDetail)
    } catch (err) {
        next(err)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updateData = {};

        if (req.body.email) updateData.email = req.body.email;
        if (req.body.phoneNumber) updateData.phoneNumber = req.body.phoneNumber;
        if (req.body.departmentId) updateData.departmentId = req.body.departmentId;
        if (req.body.positionId) updateData.positionId = req.body.positionId;
        if (req.body.bookBank) updateData.bookBank = req.body.bookBank;
        if (req.body.salary) updateData.salary = req.body.salary;

        if (req.body.annualLeaveAmount) {
            const annualLeaveAmount = parseInt(req.body.annualLeaveAmount, 10);
            if (!isNaN(annualLeaveAmount)) {
                updateData.annualLeaveAmount = annualLeaveAmount;
            } else {
                return createError(400, "Invalid annualLeaveAmount");
            }
        }

        if (req.body.sickLeaveAmount) {
            const sickLeaveAmount = parseInt(req.body.sickLeaveAmount, 10); // Fix here: change WOPayAmount to sickLeaveAmount
            if (!isNaN(sickLeaveAmount)) {
                updateData.sickLeaveAmount = sickLeaveAmount; // Use sickLeaveAmount instead of wOPayAmount
            } else {
                return createError(400, "Invalid sickLeaveAmount");
            }
        }

        if (req.body.WOPayAmount) {
            const wOPayAmount = parseInt(req.body.WOPayAmount, 10);
            if (!isNaN(wOPayAmount)) {
                updateData.WOPayAmount = wOPayAmount;
            } else {
                return createError(400, "Invalid WOPayAmount");
            }
        }

        if (req.body.supId) updateData.supId = req.body.supId;

        console.log("updateData", updateData);

        const updatedUser = await prisma.user.update({
            where: { id: +id },
            data: updateData
        });

        res.json("Update successful");
    } catch (err) {
        next(err);
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
        console.log(id)
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
                        identicalNumber: true,
                        position:{
                            select:{
                                positionName: true
                            }
                        }

                    }
                }
            }
        })

        res.json(employees[0]?.Users || [])
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

        const employeeEachSuperId = superId.map(({ password, identicalNumber, dateStart, dateEnd,profileImg, ...userData }) => userData);

        res.json(employeeEachSuperId);
    } catch (err) {
        next(err);
    }
};

exports.getLeaderEachSupId = async (req, res, next) => {
    try {
        const { id } = req.params;

        // Step 1: Check if the provided `supId` is 1 and find the top-level leader with `supId: null`
        let leader;
        if (+id === 1) {
            leader = await prisma.user.findFirst({
                where: {
                    supId: null, // Find the top leader
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
        } else {
            //if subId is not 1, directly find the leader with that `supId`
            leader = await prisma.user.findFirst({
                where: {
                    id: +id,
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
        }

        // Handle case where no leader is found
        if (!leader) {
            return next(createError(400, "Leader not found"));
        }

        // Step 3: Find subordinates using the leader's `id` as `supId`
        const subordinates = await prisma.user.findMany({
            where: {
                supId: leader.id,
            },
            orderBy: {
                dateStart: 'asc',
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

        // Step 4: Return the leader and their subordinates
        res.json({
            leader: {
                id: leader.id,
                firstName: leader.firstName,
                lastName: leader.lastName,
                superId: leader.supId,
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

exports.createDepartment = async(req,res,next)=>{

    try {
        
        const {departmentName} = req.body

        const department = await prisma.department.findFirst({
            where:{
                departmentName:departmentName
            }
        })

        if(department){
            return createError(400,"This department already exist")
        }

        await prisma.department.create({
               
               data:{departmentName:departmentName}
        })
        res.json('Create successfully')
    } catch (err) {
        next(err)
    }

}

exports.createPosition = async(req,res,next)=>{
    try {
        const {departmentId,positionName} = req.body

        const position =await prisma.position.create({
               
               data:{
                departmentId:+departmentId,
                positionName:positionName
            }
        })
        res.json('Create successfully')
    } catch (err) {
        next(err)
    }
}

exports.getHeader = async(req,res,next)=>{
    try {
        const leader = await prisma.user.findFirst({
            where:{supId:null},
            select:{
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
            }
        })
        res.json(leader)
    } catch (err) {
        next(err)
    }
}

const createOfficeSiteLocation = (req,res,next) =>{
    try{
        const {form} = req.body
        const createSiteLocationResult = prisma.site.createMany({
            data:{
                siteName:form.siteName,
                latitude:form.latitude,
                longitude:form.longitude,
                area:form.area
            }
        })
    }catch(err){
        next(err)
    }
}
