import jwt from "jsonwebtoken";
export async function verifyUser(req, res, next) {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(404).json({
                msg: "token not provided!!"
            });
        }
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            req.user = decoded;
        }
        catch (error) {
            res.status(400).json({
                msg: "invalid token"
            });
        }
        next();
    }
    catch (error) {
        res.status(500).json({
            msg: "something went wrong!!"
        });
    }
}
//# sourceMappingURL=verifyUser.js.map