const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const Addviews = async (req, res) => {
  try {
    const { news_id, user_id, viewed_at } = req.body;
    const views = await pool.query(
      `INSERT INTO views( news_id, user_id, viewed_at)
        VALUES ($1, $2,$3) RETURNING *
        `,
      [news_id, user_id, viewed_at]
    );
    res
      .status(201)
      .send({ message: "Yangi view qo'shildi", views: views.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllviews = async (req, res) => {
  try {
    const viewsaall = await pool.query(`
        SELECT * FROM views`);
    res.send(viewsaall.rows);
  } catch (error) {
    errorHandler(error, res);
  }
};
const getViewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const viewsall = await pool.query(
      `
        SELECT * FROM views where id=$1`,
      [id]
    );
    if (viewsall.rows.length === 0) {
      return res.status(404).send({ message: "views topilmadi" });
    }

    res.send(viewsall.rows[0]);
  } catch (error) {
    errorHandler(error, res);
  }
};
const Updateviews = async (req, res) => {
  try {
    const { news_id, user_id, viewed_at } = req.body;
    const id = req.params.id;
    const update = await pool.query(
      `UPDATE views SET news_id=$1, user_id=$2, viewed_at=$3 WHERE id=$4 RETURNING *
        VALUES ($1, $2,$3,$4) RETURNING *
        `,
      [news_id, user_id, viewed_at, id]
    );
    if (update.rowCount === 0) {
      return res.status(404).send({ message: "views topilmadi" });
    }

    res.status(200).send({
      message: "Malumotlar muvaffaqqiyatli yangilandi",
      category: update.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteviewsById = async (req, res) => {
  try {
    const id = req.params.id;
    const del = await pool.query("DELETE FROM views WHERE id=$1 RETURNING *", [
      id,
    ]);

    if (del.rowCount === 0) {
      return res.status(404).send({ message: "views topilmadi" });
    }

    res.status(200).send({ message: "views muvaffaqqiyatli o'chirildi" });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  Addviews,
  getAllviews,
  getViewsById,
  Updateviews,
  deleteviewsById
};
