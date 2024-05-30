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

module.exports = { getFleetData };
