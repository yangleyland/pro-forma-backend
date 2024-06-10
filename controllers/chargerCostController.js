const supabase = require("../supabaseClient");

const getChargerData = async (req, res) => {
  const { userId } = req.params;
  try {
    const { data, error } = await supabase
      .from("charger costs")
      .select("*")
      .eq("id", userId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};

const addChargerData = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ error: "ID required" });
  }

  try {
    const { error } = await supabase.from("charger costs").insert({
      id: id,
    });

    // if (error) {
    //   throw error;
    // }

    res.status(201).json({ message: "Charger cost added successfully"});
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getChargerData, addChargerData };
