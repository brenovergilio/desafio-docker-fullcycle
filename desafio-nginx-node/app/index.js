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

createPeopleTable();

app.get('/', (req, res) => {
    const newName = generateRandomName();
    const insertSql = `INSERT INTO people (name) values (${newName})`;
    connection.query(insertSql);

    let response = `<h1>Full Cycle Rocks!</h1>\n-Lista de nomes cadastrados no banco de dados:`;

    const selectSql = `SELECT name FROM people`;
    const currentNames = connection.query(selectSql, (_err, results, _fields) => {
      results.foreach((item) => response += item + '\n');
    });

    res.send(response);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));

const createPeopleTable = () => {
    const sql = `CREATE TABLE IF NOT EXISTS people (id INT NOT NULL AUTO_INCREMENT, name VARCHAR(255), PRIMARY KEY(id))`;
    connection.query(sql);
}

const generateRandomName = () => {
    const names = ["Gustavo", "Jorge", "Matheus", "Tiburcio", "Nathan"];
    const surnames = ["Silva", "Borges", "Aparecido", "Albuquerque", "Mendes"];

    const nameIndex = getRandomNumber(0, names.length);
    const surnameIndex = getRandomNumber(0, surnames.length);

    return names[nameIndex] + surnames[surnameIndex];
}

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

