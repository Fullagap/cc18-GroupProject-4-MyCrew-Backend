const prisma = require("../config/prisma")
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

exports.checkItem = async (req,res,next) => {
    try {
        const user = await prisma.Item.findMany({
        })
        res.status(200).json(user)
    } catch (error) {
        next(error)
    }
}

exports.createItem = async (req, res, next) => {
    try {
        const { name, cost, categoryId } = req.body;

        const item = await prisma.item.create({
            data: {
                itemName: name,  
                cost: cost,
                categoryId: categoryId,
            },
        });

        res.status(201).json(item); 
    } catch (error) {
        next(error)
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
        const { itemId, userId } = req.body;

        const item = await prisma.requestItem.create({
            data: {
                itemId: itemId,
                userId: userId,
                status: "REJECT",
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
  