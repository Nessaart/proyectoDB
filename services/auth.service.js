// Asegúrate de que la ruta '../dao/user.dao' coincida exactamente con la ubicación de tu archivo dao/
const userDao = require('../dao/user.dao');

const authService = {
    async register(userData) {
        const existingUser = await userDao.findByEmail(userData.correo_electronico);
        if (existingUser) {
            throw new Error('El correo electrónico ya se encuentra registrado.');
        }
        const userId = await userDao.create(userData);
        return { id: userId, correo: userData.correo_electronico, nombre: userData.nombre_completo };
    },

    async login(correo, password) {
        const user = await userDao.findByEmail(correo);
        if (!user || user.password !== password) {
            throw new Error('Credenciales inválidas.');
        }
        return {
            id: user.id,
            nombre: user.nombre_completo,
            correo: user.correo_electronico,
            rol: user.rol
        };
    }
};

module.exports = authService;