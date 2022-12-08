//--------------------------------------------------
// Importação do arquivo auth.
const auth = require('../middleware/auth');

module.exports = (app) => {
    let controller = app.controllers.participation;

    //--------------------------------------------------
    // Request /participation
    app.route('/participation')
        .all(auth)
        .get(controller.getParticipations)
        .post(controller.postParticipation);

    //--------------------------------------------------
    // Request /participation/:id
    app.route('/participation/:id')
        .all(auth)
        .get(controller.getParticipation)
        .put(controller.putParticipation)
        .delete(controller.deleteParticipation);

    //--------------------------------------------------
    // Request /participation
    app.route('/participation_search/:name')
        .all(auth)
        .get(controller.getSearchParticipation);

};