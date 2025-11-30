require('dotenv').config();
const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use("/reservaciones", require("./routes/reservaciones.routes"));
app.use("/mesas", require("./routes/mesas.routes"));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 API corriendo en puerto ${PORT}`);
});
