const express = require("express");
const { open } = require("sqlite");
const sqlite3 = require("sqlite3");
const path = require("path");
const cors = require("cors");

const dbPath = path.join(__dirname, "mydatabase.db");

const app = express();

app.use(express.json());
app.use(cors());

let db = null;

const initializeDbAndServer = async () => {
  try {
    db = await open({
      filename: dbPath,
      driver: sqlite3.Database,
    });

    app.listen(process.env.PORT || 3003, () => {
      console.log("Server Running at http://localhost:3003/");
    });
  } catch (error) {
    console.log(`DB Error: ${error.message}`);
    process.exit(1);
  }
};

initializeDbAndServer();

app.get("/movie/", async (request, response) => {
  const getMovieQuery = `
    SELECT * 
    FROM movies;
    `;
  const movieArray = await db.all(getMovieQuery);
  response.send(movieArray.map((eachMovie) => eachMovie));
});
app.post("/user/update/", async (request, response) => {
  const userDetails = request.body;
  const { username, password, email } = userDetails;
  const postUserQuery = `
     INSERT INTO users (id,username,password,email) VALUES ('${id}','${username}','${password}','${email}');
    
    `;
  const dbResponse = await db.run(postUserQuery);
  const userId = dbResponse.lastID;
  response.send({ userId: userId });
});
module.exports = app;

app.get("/users/", async (request, response) => {
  const getUsersQuery = `
    SELECT * 
    FROM users;
    `;
  const usersArray = await db.all(getUsersQuery);
  response.send(usersArray.map((eachUser) => eachUser));
});
