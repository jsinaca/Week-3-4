const baseController = {};

baseController.home = (req, res) => {
    //#swagger.tags=['Home']
    res.status(200).send('Hello there');
}

module.exports = baseController;