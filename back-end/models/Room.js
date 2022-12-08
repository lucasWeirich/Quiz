const Dao = require('./Dao');

const queries = {
    getAll: 'SELECT * FROM quiz.room order by id desc;',
    getOne: 'SELECT * FROM quiz.room WHERE id=?;',
    getSearch: 'SELECT * FROM quiz.room WHERE name LIKE ?;',
    insert: 'INSERT INTO quiz.room (idAdm,name,password,status) VALUES(?,?,?,?);',
    update: 'UPDATE quiz.room SET name=?,password=?,status=? WHERE id=?;',
    updateStatus: 'UPDATE quiz.room SET status=? WHERE id=?;',
    delete: 'DELETE FROM quiz.room WHERE id=?;'
}

module.exports = class Room extends Dao {

    #id;
    #idAdm;
    #name;
    #password;
    #status;

    //----------------------------------------------------------------------------
    //
    constructor(database, services) {
        super(database, queries);

        if (services) {
            this.#id = services.id;
            this.#idAdm = services.idAdm;
            this.#name = services.name;
            this.#password = services.password;
            this.#status = services.status;
        }
    }

    //----------------------------------------------------------------------------
    //
    toJSON() {
        return {
            id: this.#id,
            idAdm: this.#idAdm,
            name: this.#name,
            password: this.#password,
            status: this.#status,
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
            this.#idAdm,
            this.#name,
            this.#password,
            this.#status
        ])
    }

    //----------------------------------------------------------------------------
    //
    update(id) {
        return super.update(id, [
            this.#name,
            this.#password,
            this.#status
        ])
    }

    //----------------------------------------------------------------------------
    //
    updateStatus(id) {
        return super.updateStatus(id, [
            this.#status,
        ])
    }
}