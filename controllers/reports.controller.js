const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const Addreports = async (req, res) => {
  try {
    const { user_id,news_id,reason ,status, created_at } = req.body;
    const reports = await pool.query(
      `INSERT INTO reports(user_id,news_id,reason ,status, created_at)
        VALUES ($1, $2,$3,$4,$5) RETURNING *
        `,
      [user_id, news_id, reason, status, created_at]
    );
    res
      .status(201)
      .send({ message: "Yangi reports qo'shildi", media: reports.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllreports = async (req, res) => {
  try {
    const reports = await pool.query(`
        SELECT * FROM reports`);
    res.send(reports.rows);
  } catch (error) {
    errorHandler(error, res);
  }
};
const getreportsById = async (req, res) => {
  try {
    const id = req.params.id;
    const reports = await pool.query(
      `
        SELECT * FROM reports where id=$1`,
      [id]
    );
    if (reports.rows.length === 0) {
      return res.status(404).send({ message: "reports topilmadi" });
    }

    res.send(reports.rows[0]);
  } catch (error) {
    errorHandler(error, res);
  }
};
const Updatereports = async (req, res) => {
  try {
    const { user_id, news_id, reason, status, created_at } = req.body;
    const id = req.params.id;
    const update = await pool.query(
      `UPDATE reports SET  user_id=$2,news_id=$1, reason=$3 status=$4,created_at=$5 WHERE id=$6 RETURNING *
        VALUES ($1, $2,$3,$4,$5,$6) RETURNING *
        `,
      [user_id, news_id, reason, status, created_at]
    );
    if (update.rowCount === 0) {
      return res.status(404).send({ message: "reports topilmadi" });
    }

    res.status(200).send({
      message: "Malumotlar muvaffaqqiyatli yangilandi",
      category: update.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deletereportsById = async (req, res) => {
  try {
    const id = req.params.id;
    const del = await pool.query(
      "DELETE FROM reports WHERE id=$1 RETURNING *",
      [id]
    );

    if (del.rowCount === 0) {
      return res.status(404).send({ message: "reports topilmadi" });
    }

    res.status(200).send({ message: "reports muvaffaqqiyatli o'chirildi" });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  Addreports,
  getAllreports,
  getreportsById,
  Updatereports,
  deletereportsById
};
