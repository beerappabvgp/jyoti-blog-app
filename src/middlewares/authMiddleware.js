import { verifyJWTToken } from "../controllers/userController.js"

export const authMiddleware = async (req, res, next) => {
    try {
        // validate the token
        let token = req.headers.authorization;
        if (!token) {
            res.status(400).json({
                "message": "Token is required ...",
            });
            return;
        }
        let decodedToken = await verifyJWTToken(token);
        req.user = decodedToken;
        next();
    } catch (error) {
        console.log("error in authMiddleware: ", error);
        res.status(500).json({
            "message": "Internal server error"
        });
    }
}