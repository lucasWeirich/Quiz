const Dao = require('./Dao');

const queries = {
    getAll: 'SELECT * FROM quiz.participation order by id desc;',
    getOne: 'SELECT * FROM quiz.participation WHERE id=?;',
    getSearch: 'SELECT * FROM quiz.participation WHERE idUser LIKE ?;',
    insert: 'INSERT INTO quiz.participation (idRoom,idUser,punctuation) VALUES(?,?,?);',
    update: 'UPDATE quiz.participation SET punctuation=? WHERE id=?;',
    delete: 'DELETE FROM quiz.participation WHERE id=?;'
}

module.exports = class Participation extends Dao {

    #id;
    #idRoom;
    #idUser;
    #punctuation;

    //----------------------------------------------------------------------------
    //
    constructor(database, participation) {
        super(database, queries);

        if (participation) {
            this.#id = participation.id;
            this.#idRoom = participation.idRoom;
            this.#idUser = participation.idUser;
            this.#punctuation = participation.punctuation;
        }
    }

    //----------------------------------------------------------------------------
    //
    toJSON() {
        return {
            id: this.#id,
            idRoom: this.#idRoom,
            idUser: this.#idUser,
            punctuation: this.#punctuation,
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
            this.#idRoom,
            this.#idUser,
            this.#punctuation,
        ])
    }

    //----------------------------------------------------------------------------
    //
    update(id) {
        return super.update(id, [
            this.#punctuation
        ])
    }
}