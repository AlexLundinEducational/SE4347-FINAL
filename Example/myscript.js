// myscript.js

var oracledb = require('oracledb');

oracledb.getConnection(
  {
    user          : "CS4347F18",
    password      : "a1",
    connectString : "localhost/orcl"
  },
  function(err, connection) {
    if (err) {
      console.error(err.message);
      return;
    }
    connection.execute(
      `SELECT AUTHOR, TITLE, ISBN
       FROM BOOKS
       WHERE ISBN = :TIB`,
      ["1588345297"],  // bind value for :id
      function(err, result) {
        if (err) {
          console.error(err.message);
          doRelease(connection);
          return;
        }
        console.log(result.rows);
        doRelease(connection);
      });
  });

function doRelease(connection) {
  connection.close(
    function(err) {
      if (err)
        console.error(err.message);
    });
}