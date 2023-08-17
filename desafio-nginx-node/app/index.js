const express = require('express');
const mysql = require('mysql');

const app = express();
const port = 3000;

const dbConfig = {
    host: 'database',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(dbConfig);

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const createPeopleTable = () => {
  const sql = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))`;
  connection.query(sql);
}

const generateRandomName = () => {
  const names = ["Gustavo", "Jorge", "Matheus", "Tiburcio", "Nathan"];
  const surnames = ["Silva", "Borges", "Aparecido", "Albuquerque", "Mendes"];

  const nameIndex = getRandomNumber(0, names.length);
  const surnameIndex = getRandomNumber(0, surnames.length);

  return `${names[nameIndex]} ${surnames[surnameIndex]}`;
}

createPeopleTable();

app.get('/', (_req, res) => {
    const newName = generateRandomName();
    const insertSql = `INSERT INTO people (name) values ('${newName}')`;
    connection.query(insertSql);

    let response = `<h1>Full Cycle Rocks!</h1>\n- Lista de nomes cadastrados no banco de dados:\n`;

    const selectSql = `SELECT name FROM people`;
    connection.query(selectSql, (_err, results, _fields) => {
      results?.forEach((item) => response += `<p>${item?.name}</p>`);
      res.send(response);
    });
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
