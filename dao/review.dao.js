const db = require('../services/mysql.service');

const reviewDao = {
    async getAll() {
        const [rows] = await db.query('SELECT * FROM reviews');
        return rows;
    },

    async getById(id) {
        const [rows] = await db.query('SELECT * FROM reviews WHERE id = ?', [id]);
        return rows[0];
    },

    async getByEventId(eventId) {
        const [rows] = await db.query(
            'SELECT r.*, u.nombre_completo as usuario_nombre FROM reviews r JOIN users u ON r.users_id = u.id WHERE r.events_id = ?',
            [eventId]
        );
        return rows;
    },

    async create(reviewData) {
        const { calificacion, comentario, etiquetas, valoracion_asiento, users_id, events_id } = reviewData;
        const [result] = await db.query(
            'INSERT INTO reviews (calificacion, comentario, etiquetas, valoracion_asiento, users_id, events_id) VALUES (?, ?, ?, ?, ?, ?)',
            [calificacion, comentario, etiquetas, valoracion_asiento, users_id, events_id]
        );
        return result.insertId;
    },

    async update(id, reviewData) {
        const { calificacion, comentario, etiquetas, valoracion_asiento } = reviewData;
        const [result] = await db.query(
            'UPDATE reviews SET calificacion = ?, comentario = ?, etiquetas = ?, valoracion_asiento = ? WHERE id = ?',
            [calificacion, comentario, etiquetas, valoracion_asiento, id]
        );
        return result.affectedRows;
    },

    async delete(id) {
        const [result] = await db.query('DELETE FROM reviews WHERE id = ?', [id]);
        return result.affectedRows;
    }
};

module.exports = reviewDao;