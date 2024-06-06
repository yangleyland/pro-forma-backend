const supabase = require("../supabaseClient");

const addControl = async (req, res) => {
  const {
    id,
    electrification_scenario,
    site,
    incentives,
    ira_incentives,
    phase1,
    phase2,
    phase3,
  } = req.body;

  if (
    !id ||
    typeof incentives === "undefined" ||
    typeof ira_incentives === "undefined"
  ) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const { data, error } = await supabase
      .from("controls")
      .insert([
        {
          id,
          electrification_scenario,
          site,
          incentives,
          ira_incentives,
          phase1,
          phase2,
          phase3,
        },
      ]);

    if (error) {
      throw error;
    }

    res.status(201).json({ data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getControls = async (req, res) => {
  const { userId } = req.params;

  try {
    const { data, error } = await supabase
      .from("controls")
      .select("*")
      .eq("id", userId);

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: "Controls not found for this user" });
    }

    res.status(200).json({ data: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateControls = async (req, res) => {
  const { userId } = req.params;
  const { attribute, value } = req.body;

  if (!attribute || typeof value === "undefined") {
    return res.status(400).json({ error: "Attribute and value are required" });
  }

  try {
    const updateData = { [attribute]: value };

    const { data, error } = await supabase
      .from("controls")
      .update(updateData)
      .eq("id", userId)
      .select();

    if (error) {
      throw error;
    }

    if (data.length === 0) {
      return res
        .status(404)
        .json({ error: "Controls not found for this user" });
    }

    res.status(200).json({ data: data[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { addControl, getControls, updateControls };
