const db = require("../config/db");

exports.getAll = (req, res) => {
  const { estado } = req.query;
  let query = "SELECT * FROM mesas";
  let params = [];

  if (estado) {
    query += " WHERE estado = ?";
    params.push(estado);
  }

  db.query(query, params, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result);
  });
};

exports.getById = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM mesas WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.length === 0) return res.status(404).json({ message: "Mesa no encontrada" });
    res.json(result[0]);
  });
};

exports.create = (req, res) => {
  const { nombre, capacidad, estado } = req.body;
  db.query("INSERT INTO mesas (nombre, capacidad, estado) VALUES (?, ?, ?)", [nombre, capacidad, estado], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.status(201).json({ id: result.insertId, nombre, capacidad, estado });
  });
};

exports.update = (req, res) => {
  const { id } = req.params;
  const { nombre, capacidad, estado } = req.body;
  db.query("UPDATE mesas SET nombre = ?, capacidad = ?, estado = ? WHERE id = ?", [nombre, capacidad, estado, id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Mesa no encontrada" });
    res.json({ message: "Mesa actualizada correctamente" });
  });
};

exports.delete = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM mesas WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    if (result.affectedRows === 0) return res.status(404).json({ message: "Mesa no encontrada" });
    res.json({ message: "Mesa eliminada correctamente" });
  });
};
