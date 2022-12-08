//--------------------------------------------------
// Importação do arquivo auth.
const auth = require('../middleware/auth');

module.exports = (app) => {
    let controller = app.controllers.room;

    //--------------------------------------------------
    // Request /room
    app.route('/room')
        .all(auth)
        .get(controller.getRooms)
        .post(controller.postRoom);

    //--------------------------------------------------
    // Request /room/:id
    app.route('/room/:id')
        .all(auth)
        .get(controller.getRoom)
        .put(controller.putRoom)
        .patch(controller.patchRoom)
        .delete(controller.deleteRoom);

    //--------------------------------------------------
    // Request /room
    app.route('/room_search/:name')
        .all(auth)
        .get(controller.getSearchRoom);

};