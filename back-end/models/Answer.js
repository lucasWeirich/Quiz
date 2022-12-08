const Dao = require('./Dao');

const queries = {
    getAll: 'SELECT * FROM quiz.answer order by id desc;',
    getOne: 'SELECT * FROM quiz.answer WHERE id=?;',
    getSearch: 'SELECT * FROM quiz.answer WHERE alternatives LIKE ?;',
    insert: 'INSERT INTO quiz.answer (idQuestion,alternatives) VALUES(?,?);',
    update: 'UPDATE quiz.answer SET alternatives=? WHERE id=?;',
    delete: 'DELETE FROM quiz.answer WHERE id=?;'
}

module.exports = class Answer extends Dao {

    #id;
    #idQuestion;
    #alternatives;

    //----------------------------------------------------------------------------
    //
    constructor(database, answer) {
        super(database, queries);

        if (answer) {
            this.#id = answer.id;
            this.#idQuestion = answer.idQuestion;
            this.#alternatives = answer.alternatives;
        }
    }

    //----------------------------------------------------------------------------
    //
    toJSON() {
        return {
            id: this.#id,
            idQuestion: this.#idQuestion,
            alternatives: this.#alternatives,
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
            this.#idQuestion,
            this.#alternatives,
        ])
    }

    //----------------------------------------------------------------------------
    //
    update(id) {
        return super.update(id, [
            this.#alternatives,
        ])
    }
}