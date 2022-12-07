module.exports = (app) => {
    return {
        user: require('./user')(app),
    };
}