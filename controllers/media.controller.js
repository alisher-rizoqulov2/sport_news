const pool = require("../config/db");
const { errorHandler } = require("../helpers/error_handler");

const Addmedia = async (req, res) => {
  try {
    const { news_id, media_type, media_url, uploaded_at } = req.body;
    const media = await pool.query(
      `INSERT INTO media(news_id, media_type, media_url, uploaded_at)
        VALUES ($1, $2,$3,$4) RETURNING *
        `,
      [news_id, media_type, media_url, uploaded_at]
    );
    res
      .status(201)
      .send({ message: "Yangi media qo'shildi", media: media.rows[0] });
  } catch (error) {
    errorHandler(error, res);
  }
};
const getAllMedia = async (req, res) => {
  try {
    const mediaall = await pool.query(`
        SELECT * FROM media`);
    res.send(mediaall.rows);
  } catch (error) {
    errorHandler(error, res);
  }
};
const getMediaById = async (req, res) => {
  try {
    const id = req.params.id;
    const mediaall = await pool.query(
      `
        SELECT * FROM media where id=$1`,
      [id]
    );
    if (mediaall.rows.length === 0) {
      return res.status(404).send({ message: "Media topilmadi" });
    }

    res.send(results.rows[0]);
  } catch (error) {
    errorHandler(error, res);
  }
};
const Updatemedia = async (req, res) => {
  try {
    const { news_id, media_type, media_url, uploaded_at } = req.body;
    const id=req.params.id
    const update = await pool.query(
      `UPDATE media SET news_id=$1, media_type=$2, media_url=$3 uploaded_at=$4 WHERE id=$5 RETURNING *
        VALUES ($1, $2,$3,$4) RETURNING *
        `,
      [news_id, media_type, media_url, uploaded_at, id]
    );
    if (update.rowCount === 0) {
      return res.status(404).send({ message: "media topilmadi" });
    }

    res.status(200).send({
      message: "Malumotlar muvaffaqqiyatli yangilandi",
      category: update.rows[0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};
const deleteMediaById = async (req, res) => {
  try {
    const id = req.params.id;
    const del = await pool.query(
      "DELETE FROM media WHERE id=$1 RETURNING *",
      [id]
    );

    if (del.rowCount === 0) {
      return res.status(404).send({ message: "media topilmadi" });
    }

    res.status(200).send({ message: "media muvaffaqqiyatli o'chirildi" });
  } catch (error) {
    errorHandler(error, res);
  }
};
module.exports = {
  Addmedia,
  getAllMedia,
  getMediaById,
  Updatemedia,
  deleteMediaById
};
