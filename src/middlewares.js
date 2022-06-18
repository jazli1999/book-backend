import jwt from 'jsonwebtoken';

const { JWT_SECRET } = process.env;

const checkAuthentication = (req, res, next) => {
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).send({
            error: 'Unauthorized',
            message: 'No token provided in the request header',
        });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send({
                error: 'Unauthorized',
                message: 'Failed to authenticate token',
            });
        }

        req.userId = decoded._id;
        next();
    });
};

export default {
    checkAuthentication,
};
