const sql = require("../../sql");
const db = require("../../db");

export default async function handle(req, res) {
  const { searchValue, sortByValue } = req.body;

  if (sortByValue === "Asc") {
    const handlePOST = await sql.execute(
      `SELECT * FROM Movie WHERE title LIKE '${searchValue}%' ORDER BY title`,
      db.nextjsDb
    );
    res.json(handlePOST);
  } else if (sortByValue === "Desc") {
    const handlePOST = await sql.execute(
      `SELECT * FROM Movie WHERE title LIKE '${searchValue}%' ORDER BY title DESC`,
      db.nextjsDb
    );
    res.json(handlePOST);
  } else {
    const handlePOST = await sql.execute(
      `SELECT * FROM Movie WHERE title LIKE '${searchValue}%'`,
      db.nextjsDb
    );
    res.json(handlePOST);
  }
}
