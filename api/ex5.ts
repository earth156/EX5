import express from "express";
import {conn} from "../dbconnect";
import bodyParser from 'body-parser';

export const router = express.Router();

router.use(bodyParser.json());

//แสดงข้อมูล User ทั้งหมด
router.get("/", (req, res) => {
    conn.query('SELECT name FROM person', (err, result, fields) => {
        if (err) {
            console.error("Error fetching names:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(result);
        }
    });
});
//ลบหนัง
// router.delete("/deleteMovie",(req, res)=>{
//     conn.query('DELETE FROM movies where movies_id = ?',(err, result, fields)=>{
//         if (err) {
//             console.error("Error fetching names:", err);
//             res.status(500).json({ error: "Internal Server Error" });
//         } else {
//             res.json(result);
//         }
//     })
// });
//http://localhost:5000/ex5/deleteMovie?movieId=
//ลบหนัง
router.delete("/deleteMovie", (req, res) => {
    const movieIdToDelete = req.query.movieId; // ใช้ req.query เพื่อรับค่าจาก query parameter
    conn.query('DELETE FROM movies WHERE movie_id = ?', [movieIdToDelete], (err, result, fields) => {
        if (err) {
            console.error("Error deleting movie:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(result);
        }
    });
});


//ลบบุคคล
router.delete("/deletePerson",(req, res)=>{
    const movieIdPerson = req.query.personId; // Assuming you're passing the movieId in the request body
    conn.query('DELETE FROM person where person_id = ?', [movieIdPerson],(err, result, fields)=>{
        if (err) {
            console.error("Error deleting person:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(result);
        }
    });
});

//ลบสตาร์
router.delete("/deleteStars",(req, res)=>{
    const movieIdStars = req.query.starId; // Assuming you're passing the movieId in the request body
    conn.query('DELETE FROM stars where star_id = ?', [movieIdStars],(err, result, fields)=>{
        if (err) {
            console.error("Error deleting person:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(result);
        }
    });
});


//ลบครีเอเตอร์
router.delete("/deleteCreator",(req, res)=>{
    const movieIdCreator = req.query.creatorId; // Assuming you're passing the movieId in the request body
    conn.query('DELETE FROM creators where creator_id = ?', [movieIdCreator],(err, result, fields)=>{
        if (err) {
            console.error("Error deleting person:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(result);
        }
    });
});

//ค้นหาข้อมูลหนัง
// router.get("/searchMovie", (req, res) => {
//     const searchQuery = req.query.search; // Assuming search query is passed as a query parameter named 'search'
//     const sqlQuery = `SELECT m.movie_id, m.movie_name, m.poster, m.date, m.plot, m.genre, s.star_name, c.creator_name
//                       FROM movies m
//                       LEFT JOIN stars s ON m.star_id = s.star_id
//                       LEFT JOIN creators c ON m.creator_id = c.creator_id
//                       WHERE m.movie_name LIKE ?`;
//     conn.query(sqlQuery, [`%${searchQuery}%`], (err, result, fields) => {
//         if (err) {
//             console.error("Error searching for movies:", err);
//             res.status(500).json({ error: "Internal Server Error" });
//         } else {
//             res.json(result);
//         }
//     });
// });

//http://localhost:5000/ex5/searchMovie?search=2
// router.get("/searchMovie", (req, res) => {
//     const searchQuery = req.query.search; // Assuming search query is passed as a query parameter named 'search'
//     const sqlQuery = `SELECT movie_id, movie_name, poster, date, plot, genre 
//                       FROM movies 
//                       WHERE movie_name LIKE ?`;
//     conn.query(sqlQuery, [`%${searchQuery}%`], (err, result, fields) => {
//         if (err) {
//             console.error("Error searching for movies:", err);
//             res.status(500).json({ error: "Internal Server Error" });
//         } else {
//             res.json(result);
//         }
//     });
// });

router.get("/searchMovie", (req, res) => {
    const searchQuery = req.query.search;
    const sqlQuery = `
        SELECT m.movie_id, m.movie_name, m.poster, m.date, m.plot, m.genre,
               s.star_id,
               c.creator_id,
               ps.person_id AS star_person_id,
               ps.name AS star_name,
               ps.birthday AS star_birthday,
               ps.person_type AS star_person_type,
               pc.person_id AS creator_person_id,
               pc.name AS creator_name,
               pc.birthday AS creator_birthday,
               pc.person_type AS creator_person_type
        FROM movies m
        LEFT JOIN stars s ON m.movie_id = s.movie_id
        LEFT JOIN creators c ON m.movie_id = c.movie_id
        LEFT JOIN person ps ON s.person_id = ps.person_id
        LEFT JOIN person pc ON c.person_id = pc.person_id
        WHERE m.movie_name LIKE ?
    `;
    conn.query(sqlQuery, [`%${searchQuery}%`], (err, result, fields) => {
        if (err) {
            console.error("Error searching for movies:", err);
            res.status(500).json({ error: "Internal Server Error" });
        } else {
            res.json(result);
        }
    });
});


