const reviewDao = require('../dao/review.dao');

const reviewService = {
    async getAllReviews() {
        return await reviewDao.getAll();
    },

    async getReviewById(id) {
        const review = await reviewDao.getById(id);
        if (!review) {
            throw new Error('La reseña solicitada no existe.');
        }
        return review;
    },

    async getReviewsByEvent(eventId) {
        return await reviewDao.getByEventId(eventId);
    },

    async createReview(reviewData) {
        const { calificacion, users_id, events_id } = reviewData;
        if (!calificacion || !users_id || !events_id) {
            throw new Error('Faltan campos obligatorios para registrar la reseña.');
        }
        if (calificacion < 1 || calificacion > 5) {
            throw new Error('La calificación debe estar en un rango de 1 a 5 estrellas.');
        }
        const reviewId = await reviewDao.create(reviewData);
        return { id: reviewId, ...reviewData };
    },

    async updateReview(id, reviewData) {
        const existingReview = await reviewDao.getById(id);
        if (!existingReview) {
            throw new Error('La reseña a actualizar no existe.');
        }
        await reviewDao.update(id, reviewData);
        return { id, ...reviewData };
    },

    async deleteReview(id) {
        const existingReview = await reviewDao.getById(id);
        if (!existingReview) {
            throw new Error('La reseña a eliminar no existe.');
        }
        await reviewDao.delete(id);
        return true;
    }
};

module.exports = reviewService;
