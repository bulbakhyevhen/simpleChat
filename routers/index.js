const roomRouter = require('./roomRouter.js');

module.exports = app => {
    app.use('/chat', roomRouter);
}