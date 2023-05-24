const mysql = require('mysql');

// Connection Pool
let connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME
});

// View Users
exports.view = (req, res) => {
  // User the connection
  connection.query('SELECT * FROM user WHERE status = "active"', (err, rows) => {
    // When done with the connection, release it
    if (!err) {
      let removedUser = req.query.removed;
      res.render('home', { rows, removedUser });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });
}
// Find user by search
exports.find = (req, res) => {
console.log("req here ",req)
let searchItem = req.body.search

    connection.query('SELECT * FROM user WHERE first_name LIKE ? OR last_name LIKE ? ',['%' + searchItem + '%','%' + searchItem + '%'], (err, rows) => {
        // When done with the connection, release it
        if (!err) {
        
          res.render('home', { rows });
        } else {
          console.log(err);
        }
        // console.log('The data from user table: \n', rows);
      });

}

exports.form = (req,res)=>{
  res.render('add-user')
}

// create new user
exports.create = (req,res)=>{
    const {first_name , last_name , email , phone , comments} = req.body
    let searchItem = req.body.search

    const insertQuery = 'INSERT INTO user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ?'
    connection.query(insertQuery,[first_name,last_name,email,phone,comments],(err,rows)=>{
      if(!err){
        res.render('add-user', { alert: 'User added successfully.' })
      }else{
        console.log(err);
      }
      console.log('The data from user table: \n', rows);
    })
}

// Edit user
exports.edit=(req,res)=>{

  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?',[req.params.id], (err, rows) => {
    // When done with the connection, release it
    if (!err) {
    
      res.render('edit-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}

// update user
exports.update=(req,res)=>{

  const { first_name, last_name, email, phone, comments } = req.body;
  // User the connection
  connection.query('UPDATE user SET first_name = ?, last_name = ?, email = ?, phone = ?, comments = ? WHERE id = ?', [first_name, last_name, email, phone, comments, req.params.id], (err, rows) => {

    if (!err) {
      // User the connection
      connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
        // When done with the connection, release it
        
        if (!err) {
          res.render('edit-user', { rows, alert: `${first_name} has been updated.` });
        } else {
          console.log(err);
        }
        console.log('The data from user table: \n', rows);
      });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}

// Delete user
exports.delete=(req,res)=>{

  // Delete Record
  // connection.query('DELETE FROM user WHERE id = ?',[req.params.id], (err, rows) => {
    // When done with the connection, release it
  //   if (!err) {
    
  //     res.redirect('/');
  //   } else {
  //     console.log(err);
  //   }
  //   console.log('The data from user table: \n', rows);
  // });



    // Hide a record

    connection.query('UPDATE user SET status = ? WHERE id = ?', ['removed', req.params.id], (err, rows) => {
      if (!err) {
        let removedUser = encodeURIComponent('User successeflly removed.');
        res.redirect('/?removed=' + removedUser);
      } else {
        console.log(err);
      }
      console.log('The data from user table are: \n', rows);
    });

}

// View Users
exports.viewall = (req, res) => {

  // User the connection
  connection.query('SELECT * FROM user WHERE id = ?', [req.params.id], (err, rows) => {
    if (!err) {
      res.render('view-user', { rows });
    } else {
      console.log(err);
    }
    console.log('The data from user table: \n', rows);
  });

}