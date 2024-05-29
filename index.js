// index.js
const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
var cors = require('cors')


const supabase = require("./supabaseClient");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const app = express();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.use(cors())
// Helper function to clean headers
function cleanHeader(header) {
  return header.replace(/^\uFEFF/, ""); // Remove BOM if present
}

app.get("/api/fleet/:userid", async (req, res) => {
  const { userid } = req.params;
  try {
    const { data, error } = await supabase
      .from("fleet data")
      .select("*")
      .eq("user_id", userid);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
});

app.post("/upload", upload.single("file"), async (req, res) => {
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
        mapHeaders: ({ header }) => cleanHeader(header), // Clean headers
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
      // res.status(200).send(data);
    });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
