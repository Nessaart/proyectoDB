const express = require("express");
const authRoutes = require("./routes/auth.routes");

const PORT = 5000;
const api = express();

api.use(express.json());
api.use(express.static("public"));

// Conectar rutas de autenticación
api.use("/api/auth", authRoutes);

api.listen(PORT, () => {
    console.log(`Server running in http://localhost:${PORT}`);
});