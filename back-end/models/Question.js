const Dao = require('./Dao');

const queries = {
    getAll: 'SELECT * FROM quiz.question order by id desc;',
    getOne: 'SELECT * FROM quiz.question WHERE id=?;',
    getSearch: 'SELECT * FROM quiz.question WHERE statement LIKE ?;',
    insert: 'INSERT INTO quiz.question (idRoom,statement,time) VALUES(?,?,?);',
    update: 'UPDATE quiz.question SET statement=?,time=? WHERE id=?;',
    delete: 'DELETE FROM quiz.question WHERE id=?;'
}

module.exports = class Question extends Dao {

    #id;
    #idRoom;
    #statement;
    #time;

    //----------------------------------------------------------------------------
    //
    constructor(database, question) {
        super(database, queries);

        if (question) {
            this.#id = question.id;
            this.#idRoom = question.idRoom;
            this.#statement = question.statement;
            this.#time = question.time;
        }
    }

    //----------------------------------------------------------------------------
    //
    toJSON() {
        return {
            id: this.#id,
            idRoom: this.#idRoom,
            statement: this.#statement,
            time: this.#time,
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
            this.#statement,
            this.#time,
        ])
    }

    //----------------------------------------------------------------------------
    //
    update(id) {
        return super.update(id, [
            this.#statement,
            this.#time
        ])
    }
}