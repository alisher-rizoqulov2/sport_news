const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const addComment = async (req, res) => {
  try {
    const { user_id, news_id, content, reply_comment_id } = req.body;
    const newComment = await pool.query(
      `INSERT INTO comments (user_id, news_id, content, reply_comment_id) 
       VALUES ($1, $2, $3, $4) RETURNING *`,
      [user_id, news_id, content, reply_comment_id || null]
    );
    res.status(201).send({
      message: "Yangi izoh qo'shildi",
      comment: newComment.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllComments = async (req, res) => {
  try {
    const results = await pool.query("SELECT * FROM comments");
    res.send(results.rows);
  } catch (error) {
    errorHandler(error, res);
  }
};

const getCommentById = async (req, res) => {
  try {
    const id = req.params.id;
    const results = await pool.query("SELECT * FROM comments WHERE id = $1", [
      id,
    ]);

    if (results.rows.length === 0) {
      return res.status(404).send({ message: "Izoh topilmadi" });
    }

    res.send(results.rows[0]);
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateComment = async (req, res) => {
  try {
    const { content, is_approved, is_deleted, views, likes } = req.body;
    const id = req.params.id;

    const update = await pool.query(
      `UPDATE comments 
       SET content=$1, is_approved=$2, is_deleted=$3, views=$4, likes=$5 
       WHERE id=$6 RETURNING *`,
      [content, is_approved, is_deleted, views, likes, id]
    );

    if (update.rowCount === 0) {
      return res.status(404).send({ message: "Izoh topilmadi" });
    }

    res.status(200).send({
      message: "Izoh muvaffaqqiyatli yangilandi",
      comment: update.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteComment = async (req, res) => {
  try {
    const id = req.params.id;
    const del = await pool.query(
      "DELETE FROM comments WHERE id=$1 RETURNING *",
      [id]
    );

    if (del.rowCount === 0) {
      return res.status(404).send({ message: "Izoh topilmadi" });
    }

    res.status(200).send({ message: "Izoh muvaffaqqiyatli o'chirildi" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addComment,
  getAllComments,
  getCommentById,
  updateComment,
  deleteComment,
};
