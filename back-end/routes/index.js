module.exports = (app) => {
    require('./user')(app);
    require('./room')(app);
    require('./question')(app);
}