const prisma = require("../config/prisma")
const { increaseUserLeaveAmount } = require("../service/user-service")
const createError = require("../utils/createError")

exports.checkRequest = async (req,res,next) => {
    try {
        const {sup_id} = req.params
        const user = await prisma.LeaveRecord.findMany({
            where: {
                supId: Number(sup_id)
            },
            include: {
                user: true,
                leaveCategory: true
            }
        })
        if(user.length === 0){
            return createError(400,"User not found")
        }
        console.log(user)
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

exports.changeStatus = async (req,res,next) => {
    try {
        const {id} = req.params
        const {status} = req.body
        console.log(id , status)
        const user = await prisma.LeaveRecord.update({
            where: {
                id: Number(id)
            },
            data: {
                status
            }
        })
        console.log('userXXX', user)
        if(status ==="REJECT")
        {   
            console.log('userReject', user)
            increaseUserLeaveAmount(user.userId,user.leaveTypeId,user.startDate,user.endDate)
        }
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

exports.changeComment = async (req,res,next) => {
    try {
        const {id} = req.params
        const {comment} = req.body
        console.log(id , comment)
        const user = await prisma.LeaveRecord.update({
            where: {
                id: Number(id)
            },
            data: {
                comment
            }
        })
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

exports.editIsHide = async (req,res,next) => {
    try {
        const {id} = req.params
        const {isHide} = req.body
        console.log(id , isHide)
        const item = await prisma.Item.update({
            where: {
                id: Number(id)
            },
            data: {
                isHide
            }
        })
        res.status(200).json(item)
        } 
    catch (error) {
        next(error)
    }
}

exports.checkItem = async (req,res,next) => {
    try {
        const user = await prisma.Item.findMany({
            include: {
                category: true
            }
        })
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

exports.createItem = async (req, res, next) => {
    try {
        const { name, cost, categoryId } = req.body;

        // ตรวจสอบว่าค่า cost และ categoryId เป็นตัวเลข
        if (isNaN(Number(cost)) || isNaN(Number(categoryId))) {
            return res.status(400).json({ error: 'Cost and CategoryId must be valid numbers' });
        }

        const item = await prisma.item.create({
            data: {
                itemName: name,  
                cost: Number(cost),
                categoryId: Number(categoryId),
            },
        });

        res.status(201).json(item); 
    } catch (error) {
        next(error);
    }
};


exports.checkCategory = async (req,res,next) => {
    try {
        const user = await prisma.Category.findMany({
        })
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

exports.createCategory = async (req, res, next) => {
    try {
        const { name } = req.body;

        const item = await prisma.category.create({
            data: {
                categoryName: name,
            },
        });

        res.status(201).json(item); 
    } catch (error) {
        next(error);
    }
};

exports.updateItem = async (req, res, next) => {
    try {
        const { name, cost, categoryId } = req.body;
        const { id } = req.params;

        const item = await prisma.item.update({
            where: {
                id: Number(id),
            },
            data: {
                itemName: name,
                cost: cost, 
                categoryId: categoryId,
            },
        });

        res.status(200).json(item);
    } catch (error) {
        next(error)
    }
};

exports.checkRequestItem = async (req,res,next) => {
    try {
        const user = await prisma.requestItem.findMany({
        })
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

exports.createRequestItem = async (req, res, next) => {
    try {
        const { itemId, userId, description } = req.body;

        const item = await prisma.requestItem.create({
            data: {
                itemId: Number(itemId),
                userId: Number(userId),
                status: "WAITING",
                description: description,
            },
        });

        res.status(201).json(item); 
    } catch (error) {
        next(error)
    }
}

exports.changeStatusRequestItem = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const item = await prisma.requestItem.update({
            where: {
                id: Number(id),
            },
            data: {
                status: status,
            },
        });

        res.status(200).json(item);
    } catch (error) {
        next(error)
    }
}

exports.checkSup = async (req, res, next) => {
    const { sup_id } = req.params;
  
    try {
      const requests = await prisma.requestItem.findMany({
        include: {
          user: true,
          item: true
        },
      });
  
      console.log(requests);
  
      const filteredRequests = requests.filter((request) => request.user.supId === Number(sup_id));
      
      console.log(filteredRequests);
  
      res.status(200).json(filteredRequests);
    } catch (error) {
      next(error);
    }
  };
  
exports.checkUserRequestItem = async (req, res, next) => {
    const { user_id } = req.params;
  
    if (!user_id) {
      return res.status(400).json({ error: "User ID is required" });
    }
  
    try {
      const requests = await prisma.requestItem.findMany({
        where: {
          userId: Number(user_id)
        },
        include: {
          user: true,
          item: true
        },
      });
  
      console.log(requests);
  
      res.status(200).json(requests);
    } catch (error) {
      next(error);
    }
  };
  