const express = require('express')
const { faker } = require('@faker-js/faker')
const app = express()
const port = process.env.APP_PORT || 3000

const config = {
  host: 'db',
  user: 'root',
  password: 'root',
  database: 'nodedb',
}

const mysql = require('mysql')

const connection = mysql.createConnection(config)

app.get('/', (_, res) => {
  const name = faker.internet.userName()

  connection.query(`INSERT INTO people (nome) VALUES ('${name}')`)

  connection.query(`SELECT nome FROM people`, (_, results) => {
    res.send(`
      <h1>Full Cycle Rocks!</h1>
      <ol>
        ${!!results.length ? results.map(el => `<li>${el.nome}</li>`).join('') : ''}
      </ol>
    `)
  })
})

app.listen(port, () => {
  console.log('Up on:', port);
})
