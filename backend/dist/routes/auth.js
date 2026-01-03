import express from 'express';
import prisma from '../config/prisma.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const authRouter = express.Router();
authRouter.post('/signup', async (req, res) => {
    const { email, password, username } = req.body;
    try {
        const userExist = await prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }]
            }
        });
        if (userExist) {
            return res.status(409).json({
                msg: "this user already exists!!"
            });
        }
        const hashPass = await bcrypt.hash(password, 10);
        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashPass
            }
        });
        //create jwt token and store in cookies then fetch it in the blog route
        const jwttoken = jwt.sign({ username: user.username, email: user.email, id: user.id }, process.env.JWT_SECRET);
        res.cookie("token", jwttoken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.json({
            user
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            msg: "something went wrong"
        });
    }
});
authRouter.post("/signin", async (req, res) => {
    try {
        const { username, password, email } = req.body;
        const userExist = await prisma.user.findFirst({
            where: {
                OR: [{ username }, { email }]
            }
        });
        if (!userExist) {
            return res.status(409).json({
                msg: "invalid email or password!!"
            });
        }
        const isPassValid = await bcrypt.compare(password, userExist.password);
        if (!isPassValid) {
            return res.status(409).json({
                msg: "invalid email or pass!!"
            });
        }
        const jwttoken = jwt.sign({ username: userExist.username, email: userExist.email, id: userExist.id }, process.env.JWT_SECRET);
        res.cookie("token", jwttoken, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 7 * 24 * 60 * 60 * 1000
        });
        return res.json({
            msg: "signed in!!"
        });
    }
    catch (error) {
        return res.status(500).json({
            msg: "something went wrong!!"
        });
    }
});
authRouter.post("/logout", async (req, res) => {
    try {
        res.clearCookie("token");
        res.json({
            msg: "successfully logged out!!"
        });
    }
    catch (error) {
        res.status(500).json({
            msg: "something went wrong!!"
        });
    }
});
export default authRouter;
//# sourceMappingURL=auth.js.map