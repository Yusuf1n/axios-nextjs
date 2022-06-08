const sql = require("../../sql");
const db = require("../../db");

export default async function handle(req, res) {
  if (req.method === "GET") {
    const handleGET = await sql.execute("SELECT * FROM Movie", db.nextjsDb);
    res.json(...handleGET.recordset);
  }
  if (req.method === "POST") {
    const handlePOST = await sql.execute(
      "INSERT INTO Movie (title, year, description, slug) VALUES ('Test33', 33, 'Test33', 'Test33')",
      db.nextjsDb
    );
  }
}
