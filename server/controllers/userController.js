const mysql = require('mysql')
const pool = mysql.createPool({
  connectionLimit: 100,
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
})

exports.view = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('Connected AS ID ' + connection.threadId)

    connection.query('SELECT * FROM user WHERE status = 1', (err, rows) => {
      connection.release()

      if (!err) {
        res.render('home', { rows })
      } else {
        console.log(err)
      }
      console.log('the datafrom user table : \n', rows)
    })
  })
}

exports.find = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('Connected AS ID ' + connection.threadId)

    let searchTerm = req.body.search

    connection.query('SELECT * FROM user WHERE status = 1 AND first_name LIKE ? OR last_name LIKE ?', ['%' + searchTerm + '%', '%' + searchTerm + '%'], (err, rows) => {
      connection.release()

      if (!err) {
        res.render('home', { rows })
      } else {
        console.log(err)
      }
      console.log('the datafrom user table : \n', rows)
    })
  })
}

exports.form = (req, res) => {
  res.render('add_user')
}

exports.save = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('Connected AS ID ' + connection.threadId)

    connection.query('INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?', [first_name, last_name, email, phone, comments], (err, rows) => {
      connection.release()

      if (!err) {
        res.render('add_user', { alert: 'User added successfully.' })
      } else {
        console.log(err)
      }
    })
  })
}

exports.edit = (req, res) => {
  pool.getConnection((err, connection) => {
    if (err) throw err
    connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
      connection.release()
      if (!err) {
        res.render('edit_user', { rows })
        console.log(rows)
      } else {
        console.log(err)
      }
    })
  })
}
exports.update = (req, res) => {
  const { first_name, last_name, email, phone, comments } = req.body
  pool.getConnection((err, connection) => {
    if (err) throw err
    console.log('Connected AS ID ' + connection.threadId)

    connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {
      connection.release()

      if (!err) {
        res.render('edit_user', { alert: 'User saved successfully.' })
      } else {
        console.log(err)
      }
    })
  })
}