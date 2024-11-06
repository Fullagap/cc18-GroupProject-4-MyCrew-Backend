const prisma = require("../config/prisma")
const createError = require("../utils/createError")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const nodemailer = require("nodemailer")


exports.login = async(req,res,next)=>{
    try {

        const {email,password} = req.body
      
        const user = await prisma.user.findUnique({
           where:{
               email: email
           }
        })
        
        if(!user){
           return createError(400,"Email or password is invalid")
        }

        const isMatch = await bcrypt.compare(password,user.password)

        if(!isMatch){
           return createError(400,"Password is not match!!")
        }
        const payload ={
           user:{
               id: user.id,
               email: user.email,
               role: user.role
           }
        }

        //Generate token
        const genToken = jwt.sign(payload,process.env.JWT_SECRET,{
           expiresIn: "30d"
        })
        
        res.json({
            user: payload.user,
            token: genToken
           })
    } catch (err) {
        next(err)
    }
}

const crypto = require("crypto");


exports.requestChangePassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await prisma.user.findUnique({ where: { email } });
        
        if (!user) {
            return createError(404, "User not found");
        }

        
        const token = crypto.randomBytes(20).toString("hex");

        // Save the token and expiration time in the database
        await prisma.user.update({
            where: { email },
            data: {
                passwordResetToken: token,
                passwordResetExpire: new Date(Date.now() + 3600000) // 1 hour from now
            },
        });

        // Setup email transporter
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'nattapongbe@gmail.com',
                pass: 'uznb twuk cicb omxw', // Please use environment variables in production
            },
        });

        const mailOptions = {
            from: 'nattapongbe@gmail.com',
            to: email,
            subject: 'Password Change Request',
            html: `
                <p>Hi,</p>
                <p>You requested a password change. Click the link below to reset your password:</p>
                <p><a href="http://localhost:5173/change-password/${token}">Reset Password</a></p>
                <p>This link will expire in one hour.</p>
            `, 
        };

        await transporter.sendMail(mailOptions);
        
        res.json({ msg: 'Password change link sent to your email' });
    } catch (err) {
        next(err);
    }
};

exports.changePassword = async (req, res, next) => {
    const { token, newPassword } = req.body;

    try {
        
        const user = await prisma.user.findFirst({
            where: { passwordResetToken: token, passwordResetExpire: { gte: new Date() } }
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid token' });
        }

       
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        
        await prisma.user.update({
            where: { id: user.id }, 
            data: {
                password: hashedPassword,
                passwordResetToken: null,
                passwordResetExpire: null,
            },
        });

        res.json({ msg: 'Password changed successfully' });
    } catch (error) {
        console.error(error); 
        res.status(500).json({ message: 'Server error' }); 
    }
};

exports.resetPassword = async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;
    
    // Log the incoming request body
    console.log('Request Body:', req.body);

    // Log the userId from req.user
    const userId = req.user.id; 
    console.log('User ID:', userId);

    try {
        // Fetch the user from the database
        const user = await prisma.user.findUnique({ where: { id: userId } });

        // Log the user retrieved from the database
        console.log('User Found:', user);

        if (!user) {
            return next(createError(404, "User not found"));
        }

        // Check if the old password is correct
        const isMatch = await bcrypt.compare(oldPassword, user.password);
        console.log('Password Match:', isMatch);

        if (!isMatch) {
            return res.status(400).json({ message: "Old password is incorrect" });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                password: hashedNewPassword,
            },
        });

        // Log the updated user details
        console.log('User Updated:', updatedUser);

        res.json({ msg: "Password changed successfully" });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: "Server error" });
    }
};



