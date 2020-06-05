'use strict'

const apiRouter = require("express").Router();

apiRouter.use('/country', require('./country'));
apiRouter.use('/restrictions', require('./restrictions'));
apiRouter.use('/update', require('./update'));

module.exports = apiRouter;