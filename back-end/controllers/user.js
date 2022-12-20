const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

module.exports = function (app) {

    let controller = {};

    //----------------------------------------------------------------------------------
    // GET /user_add
    controller.addUser = async (req, res) => {
        let hash = bcrypt.hashSync(req.body.password, 10);

        try {

            await req.dbConn.query(
                'INSERT INTO quiz.user (name, username, password) VALUES(?,?,?);',
                [req.body.name, req.body.username, hash]
            );

            return res.status(201).json({ message: 'User added success!' });

        } catch (err) {
            res.status(500).json({ message: 'Error adding user!', error: String(err) });
        }
    };

    //----------------------------------------------------------------------------------
    // GET /user_login
    controller.loginUser = async (req, res) => {
        try {
            const [[user]] = await req.dbConn.query(
                'SELECT * FROM quiz.user WHERE username LIKE ?;',
                [req.body.username]
            );

            if (user === undefined)
                return res.status(401).json({ message: 'User not found!' });
            if (bcrypt.compareSync(req.body.password, user.password) === false)
                return res.status(401).json({ message: 'Incorrect password !' });

            delete user.password;

            const token = jwt.sign(user, 'jwt-secret', {
                expiresIn: 4 * 3600 // Válido até 4 horas
            });

            return res.status(200).json({ message: 'Login realizado com sucesso!', token: token, idUser: user.id });

        } catch (err) {
            res.status(500).json({ message: 'Error ao adicionar usuário!', error: String(err) });
        }
    };

    //----------------------------------------------------------------------------------
    // GET:id /user
    controller.getUser = function (req, res) {
        new app.models.user(req.dbConn)
            .getOne(req.params.id)
            .then(result => res.status(200).json(result))
            .catch(err => res.status(500).json({ error: err }))
    };

    return controller;
}