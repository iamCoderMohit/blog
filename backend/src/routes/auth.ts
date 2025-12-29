import express from 'express'
import prisma from '../config/prisma.js'

const authRouter = express.Router()

authRouter.post('/signup', async (req, res) => {
    const {email, password, username} = req.body

    try {
        const userExist = await prisma.user.findFirst({
            where: {
                username
            }
        })

        if(userExist){
            return res.status(409).json({
                msg: "this user already exists!!"
            })
        }

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password
            }
        })

        return res.json({
            user
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            msg: "something went wrong"
        })
    }
})


authRouter.post("/signin", async (req, res) => {
    try {
        const {username, password, email} = req.body

        const userExist = await prisma.user.findUniqueOrThrow({
            where: {
                username
            }
        })
    } catch (error) {
        
    }
})
export default authRouter