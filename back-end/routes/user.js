module.exports = (app) => {
    let controller = app.controllers.user;

    //--------------------------------------------------
    // Request /user_add
    app.route('/user_add')
        .post(controller.addUser);

    //--------------------------------------------------
    // Request /user_login
    app.route('/user_login')
        .post(controller.loginUser);
};