// index.js
const express = require("express");
const multer = require("multer");
const serverless = require('serverless-http');

const os = require('os')
const csv = require("csv-parser");
var cors = require('cors')

const { getFleetData,updateFleet,patchFleet } = require("./controllers/fleetController");
const { uploadFile } = require("./controllers/uploadController");
const { addControl,getControls, updateControls } = require("./controllers/controlsController");
const { addPhase,getPhasesByUserId,updatePhases,deletePhase,patchPhases } = require("./controllers/phaseController");
const {getAdvancedControls,updateFleetEconomics,addAdvancedControl} = require("./controllers/advancedController");
const {getChargerData,addChargerData} = require("./controllers/chargerCostController");
const {deleteUser,resetToDefault} = require("./controllers/deleteController");
const {saveDefault,updateDefault} = require("./controllers/defaultController");
const {getCityInfo} = require("./controllers/cityInfoController");


const supabase = require("./supabaseClient");
const upload = multer({ dest: os.tmpdir() })
const fs = require("fs");
const app = express();


app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3002;

app.use(cors())
// Helper function to clean headers


app.get("/api/fleet/:userid", getFleetData);
app.post("/api/fleet/update", updateFleet);
app.patch("/api/fleet/patch", patchFleet);

app.post("/upload", upload.single("file"), uploadFile);


//controls
app.post('/api/controls', addControl);

app.get('/api/controls/:userId',getControls);

app.patch('/api/controls/:userId',updateControls)


//phases
app.post('/api/phases', addPhase);
app.get('/api/phases/:userId',getPhasesByUserId);
app.post('/api/phases/update',updatePhases);
app.delete('/api/phases/:id',deletePhase);
app.patch('/api/phases/patch',patchPhases);


//advanced controls
app.get('/api/advancedcontrols/:userId',getAdvancedControls);

app.post('/api/advancedcontrols/', updateFleetEconomics);

app.post('/api/advancedcontrols/add', addAdvancedControl);


//charger data
app.get('/api/chargerdata/:userId',getChargerData);
app.get('/api/chargerdata/add/:id',addChargerData);


//delete
app.delete('/api/delete-user/:userId', deleteUser);
app.get('/api/reset-to-default/:userId', resetToDefault);

//default data
app.get('/api/save-default', saveDefault);
app.get('/api/update-default', updateDefault);

//get city info
app.get('/api/city-info/:userId', getCityInfo);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports.handler = serverless(app);
