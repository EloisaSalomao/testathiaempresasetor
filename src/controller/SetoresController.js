let Setores = require('../model/Setor');
const pool = require('../database/mysql');

const SetoresController = {
    async criar(req, res) {
        const { descricao } = req.body;

        const sql = `INSERT INTO setor (descricao) VALUES (?)`;
        const result = await pool.query(sql, [descricao])
        const insertId = result[0]?.insertId;
        if (!insertId) {
            return res.status(401).json({ message: 'Erro ao criar setor' })
        }
        const sql_select = `SELECT * FROM setor WHERE id = ?`
        const [rows] = await pool.query(sql_select, [insertId])
        return res.status(201).json(rows[0])

    },

    async listar(req, res) {
        let sql = 'SELECT * FROM setor';
        const [rows] = await pool.query(sql);

        return res.status(200).json(rows);
    },

    async listarSetor(req, res) {
        const paramId = req.params.id;
        let sql = "SELECT * FROM setor WHERE id = ?";
        const [rows] = await pool.query(sql, [paramId])

        return res.status(201).json(rows);
    },

    async alterar(req, res) {
        console.log(req.params)
        const paramId = req.params.id;

        const { descricao } = req.body;

        let sql = "UPDATE setor SET descricao = ? WHERE id = ?"
        const result = await pool.query(sql, [descricao, Number(paramId)])
        console.log(result)
        const changedRows = result[0]?.affectedRows;
        if(!changedRows){
            return res.status(401).json({message: 'Erro ao alterar setor.'})
        }

        const sql_select = 'SELECT * FROM setor WHERE id = ?'
        const [rows] = await pool.query(sql_select, [paramId])

        return res.status(201).json(rows[0]);
    },

    async deletar(req, res){
        const paramId = req.params.id;
        let sql = `DELETE FROM setor WHERE id = ?`
        const result = await pool.query(sql, [Number(paramId)])
        const affectedRows = result[0]?.affectedRows;
        if(!affectedRows)
        {
            return res.status(401).json({message: "Erro ao deletar setor."})
        }
        return res.status(200).json({message: "Setor deletada com sucesso."})
    },
}

module.exports = SetoresController;