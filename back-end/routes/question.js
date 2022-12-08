//--------------------------------------------------
// Importação do arquivo auth.
const auth = require('../middleware/auth');

module.exports = (app) => {
    let controller = app.controllers.question;

    //--------------------------------------------------
    // Request /question
    app.route('/question')
        .all(auth)
        .get(controller.getQuestions)
        .post(controller.postQuestion);

    //--------------------------------------------------
    // Request /question/:id
    app.route('/question/:id')
        .all(auth)
        .get(controller.getQuestion)
        .put(controller.putQuestion)
        .delete(controller.deleteQuestion);

    //--------------------------------------------------
    // Request /question
    app.route('/question_search/:name')
        .all(auth)
        .get(controller.getSearchQuestion);

};