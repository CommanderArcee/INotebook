const {body} = require('express-validator');

module.exports = ({
    handleEmail : body('email').isEmail().withMessage("Please Enter vaid email"),
    handlePassword  : body('password').isLength({min : 5}).withMessage("length of password should be min 5")
})
