module.exports = (app) => {
    require('./user')(app);
    require('./room')(app);
    require('./question')(app);
    require('./answer')(app);
    require('./participation')(app);
}