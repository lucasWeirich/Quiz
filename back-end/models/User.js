const Dao = require('./Dao');

const queries = {
    getAll: 'SELECT user.id as id, user.name as name, user.username as username, user.date_created as date_created FROM quiz.user order by id desc;',
    getOne: 'SELECT user.id as id, user.name as name, user.username as username, user.date_created as date_created FROM quiz.user WHERE id=?;',
    getSearch: 'SELECT * FROM quiz.user WHERE username LIKE ?;',
    insert: 'INSERT INTO quiz.user (name, username, password) VALUES(?,?,?);',
    update: 'UPDATE quiz.user SET email=?,senha=? WHERE idUsuario=?;',
    delete: 'DELETE FROM quiz.user WHERE idUsuario=?;'
}

module.exports = class User extends Dao {

    #id;
    #name;
    #username;
    #password;

    //----------------------------------------------------------------------------
    //
    constructor(database, user) {

        super(database, queries);

        if (user) {
            this.#id = user.id;
            this.#name = user.name;
            this.#username = user.username;
            this.#password = user.password;
        }
    }

    //----------------------------------------------------------------------------
    //
    toJSON() {
        return {
            id: this.#id,
            name: this.#name,
            username: this.#username,
            password: this.#password
        }
    }

    //----------------------------------------------------------------------------
    //
    toString() {
        return JSON.stringify(this.toJSON, null, 4);
    }

    //----------------------------------------------------------------------------
    //
    insert() {
        return super.insert([
            this.#name,
            this.#username,
            this.#password,
        ])
    }

    //----------------------------------------------------------------------------
    //
    update(id) {
        return super.update(id, [
            this.#name,
            this.#username,
            this.#password,
        ])
    }
}