module.exports = (role) => {
    return (req, res, next) => {
        if (req.user.role !== role) res.status(403).send({error: "Forbidden"});
        next();
    }
}