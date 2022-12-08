//--------------------------------------------------
// Importação do arquivo auth.
const auth = require('../middleware/auth');

module.exports = (app) => {
    let controller = app.controllers.answer;

    //--------------------------------------------------
    // Request /answer
    app.route('/answer')
        .all(auth)
        .get(controller.getAnswers)
        .post(controller.postAnswer);

    //--------------------------------------------------
    // Request /answer/:id
    app.route('/answer/:id')
        .all(auth)
        .get(controller.getAnswer)
        .put(controller.putAnswer)
        .delete(controller.deleteAnswer);

    //--------------------------------------------------
    // Request /answer
    app.route('/answer_search/:name')
        .all(auth)
        .get(controller.getSearchAnswer);

};