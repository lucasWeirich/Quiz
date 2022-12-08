module.exports = (app) => {

    let controller = {};

    //----------------------------------------------------------------------------------
    // GET /answer
    controller.getAnswers = function (req, res) {
        new app.models.answer(req.dbConn)
            .getAll()
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }));
    };

    //----------------------------------------------------------------------------------
    // GET:id /answer
    controller.getAnswer = function (req, res) {
        new app.models.answer(req.dbConn)
            .getOne(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }))
    };

    //----------------------------------------------------------------------------------
    // GET /answer search
    controller.getSearchAnswer = function (req, res) {
        new app.models.answer(req.dbConn)
            .getSearch(`%${req.params.statement}%`)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }))
    };

    //----------------------------------------------------------------------------------
    // POST /answer
    controller.postAnswer = function (req, res) {
        new app.models.answer(req.dbConn, req.body)
            .insert()
            .then(() => res.status(201).json({ message: 'Dados armazenados com sucesso!' }))
            .catch(err => res.status(500).json({ message: String(err) }))
    };

    //----------------------------------------------------------------------------------
    // PUT /answer
    controller.putAnswer = function (req, res) {
        new app.models.answer(req.dbConn, req.body)
            .update(req.params.id)
            .then(() => res.status(201).json({ message: 'Dados atualizados com sucesso!' }))
            .catch(err => res.status(500).json({ error: String(err) }))
    };

    //----------------------------------------------------------------------------------
    // DELETE /answer
    controller.deleteAnswer = function (req, res) {
        new app.models.answer(req.dbConn)
            .delete(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(404).json({ error: err }))
    };

    return controller;
}
