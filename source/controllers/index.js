const basecontroller = require("./cars");
const baseController = {};

baseController.home = (req, res) => {
    //#swagger.tags=['Home']
    // res.status(200).send('Hello there');
    res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : 'Logged Out'
)}

// basecontroller.github = (req, res) => {
//     req.session.user = req.user;
//     res.redirect('/');
// }

baseController.logout = (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err);}
        res.redirect('/')
    })
}

module.exports = baseController;