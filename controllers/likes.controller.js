const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const Addlikes = async (req, res) => {
  try {
    const { news_id, user_id, liked_at } = req.body;
    const likes = await pool.query(
      `INSERT INTO likes(news_id, user_id, liked_at)
        VALUES ($1, $2,$3) RETURNING *
        `,
      [news_id, user_id, liked_at]
    );
    res
      .status(201)
      .send({ message: "Yangi likes qo'shildi", media: likes.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllLikes = async (req, res) => {
  try {
    const likesaall = await pool.query(`
        SELECT * FROM likes`);
    res.send(likesaall.rows);
  } catch (error) {
    errorHandler(error, res);
  }
};
const getLikesById = async (req, res) => {
  try {
    const id = req.params.id;
    const likesall = await pool.query(
      `
        SELECT * FROM likes where id=$1`,
      [id]
    );
    if (likesall.rows.length === 0) {
      return res.status(404).send({ message: "likes topilmadi" });
    }

    res.send(likesall.rows[0]);
  } catch (error) {
    errorHandler(error, res);
  }
};
const UpdateLikes = async (req, res) => {
  try {
    const { news_id, user_id, liked_at } = req.body;
    const id=req.params.id
    const update = await pool.query(
      `UPDATE likes SET news_id=$1, user_id=$2, liked_at=$3 WHERE id=$4 RETURNING *
        VALUES ($1, $2,$3,$4) RETURNING *
        `,
      [news_id, user_id, liked_at, id]
    );
    if (update.rowCount === 0) {
      return res.status(404).send({ message: "likes topilmadi" });
    }

    res.status(200).send({
      message: "Malumotlar muvaffaqqiyatli yangilandi",
      category: update.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteLikesById = async (req, res) => {
  try {
    const id = req.params.id;
    const del = await pool.query(
      "DELETE FROM likes WHERE id=$1 RETURNING *",
      [id]
    );

    if (del.rowCount === 0) {
      return res.status(404).send({ message: "likes topilmadi" });
    }

    res.status(200).send({ message: "likes muvaffaqqiyatli o'chirildi" });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  Addlikes,
  getAllLikes,
  getLikesById,
  UpdateLikes,
  deleteLikesById
};
