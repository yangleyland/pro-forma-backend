// index.js
const express = require("express");
const multer = require("multer");
const csv = require("csv-parser");
var cors = require('cors')

const { getFleetData } = require("./controllers/fleetController");
const { uploadFile } = require("./controllers/uploadController");
const { addControl,getControls, updateControls } = require("./controllers/controlsController");
const { addPhase,getPhasesByUserId,updatePhases } = require("./controllers/phaseController");
const {getAdvancedControls,updateFleetEconomics} = require("./controllers/advancedController");


const supabase = require("./supabaseClient");
const upload = multer({ dest: "uploads/" });
const fs = require("fs");
const app = express();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.use(cors())
// Helper function to clean headers


app.get("/api/fleet/:userid", getFleetData);

app.post("/upload", upload.single("file"), uploadFile);


//controls
app.post('/api/controls', addControl);

app.get('/api/controls/:userId',getControls);

app.patch('/api/controls/:userId',updateControls)


//phases
app.post('/api/phases', addPhase);
app.get('/api/phases/:userId',getPhasesByUserId);
app.post('/api/phases/update',updatePhases);


//advanced controls
app.get('/api/advancedcontrols/:userId',getAdvancedControls);

app.post('/api/advancedcontrols/', updateFleetEconomics);



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
