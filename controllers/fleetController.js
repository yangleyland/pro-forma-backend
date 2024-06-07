const supabase = require("../supabaseClient");

const getFleetData = async (req, res) => {
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
};

const updateFleet = async (req, res) => {
  const { equipment_id } = req.body;

  const { data, error } = await supabase
    .from("fleet data")
    .update({
      "Equipment ID": req.body["Equipment ID"],
      "Exclude?": req.body["Exclude?"],
      "Replacement Year": req.body["Replacement Year"],
      "EV Purchase Cost pre-incentive":
        req.body["EV Purchase Cost pre-incentive"],
      "Default Replacement Allocation":
        req.body["Default Replacement Allocation"],
      "HVIP, PG&E EV Fleet Program, and Other Incentives":
        req.body["HVIP, PG&E EV Fleet Program, and Other Incentives"],
      "IRA Incentives": req.body["IRA Incentives"],
    })
    .eq("equipment_id", equipment_id)
    .select();

  if (error) {
    return res.status(400).json(error);
  }

  return res.status(200).json(data);
};

module.exports = { getFleetData, updateFleet };
