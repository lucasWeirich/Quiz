module.exports = (app) => {

    let controller = {};

    //----------------------------------------------------------------------------------
    // GET /rooms
    controller.getRooms = function (req, res) {
        new app.models.room(req.dbConn)
            .getAll()
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }));
    };

    //----------------------------------------------------------------------------------
    // GET:id /room
    controller.getRoom = function (req, res) {
        new app.models.room(req.dbConn)
            .getOne(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }))
    };

    //----------------------------------------------------------------------------------
    // GET /room search
    controller.getSearchRoom = function (req, res) {
        new app.models.room(req.dbConn)
            .getSearch(`%${req.params.name}%`)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }))
    };

    //----------------------------------------------------------------------------------
    // POST /room
    controller.postRoom = function (req, res) {
        new app.models.room(req.dbConn, req.body)
            .insert()
            .then(() => res.status(201).json({ message: 'Dados armazenados com sucesso!' }))
            .catch(err => res.status(500).json({ message: String(err) }))
    };

    //----------------------------------------------------------------------------------
    // PUT /room
    controller.putRoom = function (req, res) {
        new app.models.room(req.dbConn, req.body)
            .update(req.params.id)
            .then(() => res.status(201).json({ message: 'Dados atualizados com sucesso!' }))
            .catch(err => res.status(500).json({ error: String(err) }))
    };
    
    //----------------------------------------------------------------------------------
    // PUT /room
    controller.patchRoom = function (req, res) {
        new app.models.room(req.dbConn, req.body)
            .updateStatus(req.params.id)
            .then(() => res.status(201).json({ message: 'Status atualizado com sucesso!' }))
            .catch(err => res.status(500).json({ error: String(err) }))
    };

    //----------------------------------------------------------------------------------
    // DELETE /room
    controller.deleteRoom = function (req, res) {
        new app.models.room(req.dbConn)
            .delete(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(404).json({ error: err }))
    };

    return controller;
}
