const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const Addauthors = async (req, res) => {
  try {
    const { news_id, is_approved,is_editor } = req.body;
    const authors = await pool.query(
      `INSERT INTO authors(news_id, is_approved,is_editor)
        VALUES ($1, $2,$3) RETURNING *
        `,
      [news_id, is_approved, is_editor]
    );
    res
      .status(201)
      .send({ message: "Yangi authors qo'shildi", news: authors.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllauthors = async (req, res) => {
  try {
    const authorsaall = await pool.query(`
        SELECT * FROM authors`);
    res.send(authorsaall.rows);
  } catch (error) {
    errorHandler(error, res);
  }
};
const getauthorsById = async (req, res) => {
  try {
    const id = req.params.id;
    const authorssall = await pool.query(
      `
        SELECT * FROM authors where id=$1`,
      [id]
    );
    if (authorssall.rows.length === 0) {
      return res.status(404).send({ message: "authors topilmadi" });
    }

    res.send(authorssall.rows[0]);
  } catch (error) {
    errorHandler(error, res);
  }
};
const Updateauthors = async (req, res) => {
  try {
    const { news_id, is_approved, is_editor } = req.body;
    const id = req.params.id;
    const update = await pool.query(
      `UPDATE authors SET news_id=$1, is_approved=$2, is_editor=$3 WHERE id=$4 RETURNING *
        VALUES ($1, $2,$3,$4) RETURNING *
        `,
      [news_id, is_approved, is_editor,id]
    );
    if (update.rowCount === 0) {
      return res.status(404).send({ message: "authors topilmadi" });
    }

    res.status(200).send({
      message: "Malumotlar muvaffaqqiyatli yangilandi",
      category: update.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteAuthorsById = async (req, res) => {
  try {
    const id = req.params.id;
    const del = await pool.query(
      "DELETE FROM authors WHERE id=$1 RETURNING *",
      [id]
    );

    if (del.rowCount === 0) {
      return res.status(404).send({ message: "authors topilmadi" });
    }

    res.status(200).send({ message: "authors muvaffaqqiyatli o'chirildi" });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  Addauthors,
  getAllauthors,
  getauthorsById,
  Updateauthors,
  deleteAuthorsById
};
