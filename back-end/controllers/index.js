module.exports = (app) => {
    return {
        user: require('./user')(app),
        room: require('./room')(app),
        question: require('./question')(app),
    };
}