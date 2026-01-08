import passport from "passport";

const authorized = (req, res, next) => {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return res.status(500).json({
                status: false,
                message: "Internal server error"
            });
        }

        if (!user) {
            return res.status(401).json({
                status: false,
                message: info?.message || "Unauthorized - Invalid or missing token"
            });
        }

        req.user = user;
        next();
    })(req, res, next);
};

export default authorized;