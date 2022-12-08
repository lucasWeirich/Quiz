module.exports = (app) => {

    let controller = {};

    //----------------------------------------------------------------------------------
    // GET /participation
    controller.getParticipations = function (req, res) {
        new app.models.participation(req.dbConn)
            .getAll()
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }));
    };

    //----------------------------------------------------------------------------------
    // GET:id /participation
    controller.getParticipation = function (req, res) {
        new app.models.participation(req.dbConn)
            .getOne(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }))
    };

    //----------------------------------------------------------------------------------
    // GET /participation search
    controller.getSearchParticipation = function (req, res) {
        new app.models.participation(req.dbConn)
            .getSearch(`%${req.params.statement}%`)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }))
    };

    //----------------------------------------------------------------------------------
    // POST /participation
    controller.postParticipation = function (req, res) {
        new app.models.participation(req.dbConn, req.body)
            .insert()
            .then(() => res.status(201).json({ message: 'Dados armazenados com sucesso!' }))
            .catch(err => res.status(500).json({ message: String(err) }))
    };

    //----------------------------------------------------------------------------------
    // PUT /participation
    controller.putParticipation = function (req, res) {
        new app.models.participation(req.dbConn, req.body)
            .update(req.params.id)
            .then(() => res.status(201).json({ message: 'Dados atualizados com sucesso!' }))
            .catch(err => res.status(500).json({ error: String(err) }))
    };

    //----------------------------------------------------------------------------------
    // DELETE /participation
    controller.deleteParticipation = function (req, res) {
        new app.models.participation(req.dbConn)
            .delete(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(404).json({ error: err }))
    };

    return controller;
}
