const fs = require("fs");
const csv = require("csv-parser");
const supabase = require("../supabaseClient");
function cleanHeader(header) {
  return header.replace(/^\uFEFF/, ""); // Remove BOM if present
}

const uploadFile = async (req, res) => {
  const file = req.file;
  const userId = req.body.userId;

  if (!file) {
    return res.status(400).send("No file uploaded.");
  }

  const results = [];
  let headersLogged = false;
  fs.createReadStream(file.path)
    .pipe(
      csv({
        mapHeaders: ({ header }) => cleanHeader(header),
      })
    )
    .on("headers", (headers) => {
      if (!headersLogged) {
        headersLogged = true;
      }
    })
    .on("data", (data) => results.push(data))
    .on("end", async () => {
      for (const item of results) {
        item.user_id = userId;
      }

      const jsonData = JSON.stringify(results);
      const jsonObject = JSON.parse(jsonData);
      const { data, error } = await supabase
        .from("fleet data")
        .insert(jsonObject);

      if (error) {
        return res.status(500).send(error.message);
      }
      res.json({ message: 'File uploaded successfully!' });
    });
};

module.exports = { uploadFile };
