const db = require('../services/mysql.service');

const userDao = {
    async create(userData) {
        const { correo_electronico, password, nombre_completo, rol } = userData;
        const [result] = await db.query(
            'INSERT INTO users (correo_electronico, password, nombre_completo, rol) VALUES (?, ?, ?, ?)',
            [correo_electronico, password, nombre_completo, rol || 'Cliente']
        );
        return result.insertId;
    },

    async findByEmail(correo_electronico) {
        const [rows] = await db.query(
            'SELECT * FROM users WHERE correo_electronico = ?',
            [correo_electronico]
        );
        return rows[0];
    }
};

module.exports = userDao;