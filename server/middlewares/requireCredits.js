module.exports = (req, res, next) => {
    if(req.user.credit < 1){
        return res.status(403).send({error: 'You do not have enough credits to continue with the survey creation!'});
    }
    next(); 
}