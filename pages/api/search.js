const sql = require("../../sql");
const db = require("../../db");

export default async function handle(req, res) {
  const { searchValue } = req.body;

  const handlePOST = await sql.execute(
    `SELECT * FROM Movie WHERE title LIKE '${searchValue}%'`,
    db.nextjsDb
  );
  res.json(handlePOST);
}
