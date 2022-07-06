const sql = require("../../sql");
const db = require("../../db");

export default async function handle(req, res) {
  const { sortByValue } = req.body;

  if (sortByValue === "Asc") {
    const handlePOST = await sql.execute(
      `SELECT * FROM Movie ORDER BY title`,
      db.nextjsDb
    );
    res.json(handlePOST);
  } else if (sortByValue === "Desc") {
    const handlePOST = await sql.execute(
      `SELECT * FROM Movie ORDER BY title DESC`,
      db.nextjsDb
    );
    res.json(handlePOST);
  }
  //   else if (sortByValue === "Default") {
  //     const handlePOST = await sql.execute(`SELECT * FROM Movie`, db.nextjsDb);
  //     res.json(handlePOST);
  //   }
}
