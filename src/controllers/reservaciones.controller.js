const db = require("../config/db");

// Obtener todas
exports.getAll = (req, res) => {
  const query = `
    SELECT 
      r.*,
      COALESCE(r.nombre, c.nombre) as cliente_nombre,
      m.nombre as mesa_nombre
    FROM reservaciones r
    LEFT JOIN clientes c ON r.cliente_id = c.id
    LEFT JOIN mesas m ON r.mesa_id = m.id
  `;

  db.query(query, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};


// Crear
exports.create = (req, res) => {
  const { nombre, fecha, hora, personas, num_personas, mesa_id } = req.body;

  const personasCount = personas || num_personas;

  const reservacionData = {
    nombre,
    fecha,
    hora,
    personas: personasCount,
    mesa_id: mesa_id || null,
    cliente_id: null  // Reservaciones rápidas sin cliente registrado
  };

  const query = "INSERT INTO reservaciones SET ?";
  db.query(query, reservacionData, (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Reservación creada", id: result.insertId });
  });
};


// Editar
exports.update = (req, res) => {
  const id = req.params.id;
  const data = req.body;

  db.query("UPDATE reservaciones SET ? WHERE id=?", [data, id], (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: "Reservación actualizada" });
  });
};

// Eliminar
exports.delete = (req, res) => {
  const id = req.params.id;

  db.query("DELETE FROM reservaciones WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: err });

    res.json({ message: "Reservación eliminada" });
  });
};
