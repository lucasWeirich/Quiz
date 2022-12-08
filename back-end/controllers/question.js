module.exports = (app) => {

    let controller = {};

    //----------------------------------------------------------------------------------
    // GET /question
    controller.getQuestions = function (req, res) {
        new app.models.question(req.dbConn)
            .getAll()
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }));
    };

    //----------------------------------------------------------------------------------
    // GET:id /question
    controller.getQuestion = function (req, res) {
        new app.models.question(req.dbConn)
            .getOne(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }))
    };

    //----------------------------------------------------------------------------------
    // GET /question search
    controller.getSearchQuestion = function (req, res) {
        new app.models.question(req.dbConn)
            .getSearch(`%${req.params.statement}%`)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }))
    };

    //----------------------------------------------------------------------------------
    // POST /question
    controller.postQuestion = function (req, res) {
        new app.models.question(req.dbConn, req.body)
            .insert()
            .then(() => res.status(201).json({ message: 'Dados armazenados com sucesso!' }))
            .catch(err => res.status(500).json({ message: String(err) }))
    };

    //----------------------------------------------------------------------------------
    // PUT /question
    controller.putQuestion = function (req, res) {
        new app.models.question(req.dbConn, req.body)
            .update(req.params.id)
            .then(() => res.status(201).json({ message: 'Dados atualizados com sucesso!' }))
            .catch(err => res.status(500).json({ error: String(err) }))
    };

    //----------------------------------------------------------------------------------
    // DELETE /question
    controller.deleteQuestion = function (req, res) {
        new app.models.question(req.dbConn)
            .delete(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(404).json({ error: err }))
    };

    return controller;
}
