const authService = require('../services/auth.service');

const authController = {
    async register(req, res) {
        try {
            const { correo_electronico, password, nombre_completo } = req.body;
            if (!correo_electronico || !password || !nombre_completo) {
                return res.status(400).json({ error: 'Faltan campos obligatorios.' });
            }
            const newUser = await authService.register(req.body);
            return res.status(201).json({ message: 'Usuario registrado con éxito', data: newUser });
        } catch (err) {
            return res.status(400).json({ error: err.message });
        }
    },

    async login(req, res) {
        try {
            const { correo_electronico, password } = req.body;
            if (!correo_electronico || !password) {
                return res.status(400).json({ error: 'Faltan correo y contraseña.' });
            }
            const session = await authService.login(correo_electronico, password);
            // CORREGIDO AQUÍ: se usa 'res.status' en lugar de 'return.status'
            return res.status(200).json({ message: 'Inicio de sesión exitoso', data: session });
        } catch (err) {
            return res.status(401).json({ error: err.message });
        }
    }
};

module.exports = authController;