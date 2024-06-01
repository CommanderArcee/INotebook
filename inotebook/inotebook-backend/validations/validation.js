const {body} = require('express-validator');

module.exports = ({
    handleEmail : body('email').isEmail().withMessage("Please Enter vaid email"),
    handlePassword  : body('password').isLength({min : 5}).withMessage("length of password should be min 5"),
    handleEmptyTitle : body('title').isLength({min : 3}).withMessage("You can not proceed with enter title"),
    handleEmptyDescriton : body('description').isLength({min : 1}).withMessage("Please enter description")
})
