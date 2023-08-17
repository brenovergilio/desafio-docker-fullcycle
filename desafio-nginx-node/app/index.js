const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const response = `<h1>Full Cycle Rocks!</h1>\n- Lista de nome cadastrados no banco de dados:`;
    res.send(response);
});

app.listen(port, () => console.log(`Server listening on port ${port}`));
