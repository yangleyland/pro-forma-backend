const supabase = require("../supabaseClient");

const getCityInfo = async (req, res) => {
  const { userId } = req.params;

  try {
    // Check if city_info exists
    const { data, error } = await supabase
      .from("city info")
      .select("*")
      .eq("id", userId);

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      // If it doesn't exist, create a new entry
      const { data: newData, error: insertError } = await supabase
        .from("city info")
        .insert([{ id: userId, city_name: "" }]) // Adjust the fields as necessary
        .select("*");

      if (insertError) {
        return res.status(500).json({ error: insertError.message });
      }

      return res.json(newData); // Return the newly created entry
    }

    return res.json(data); // Return the existing entry
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
}

const updateCityInfo = async (req, res) => {
  const { userId } = req.params;
  const updates = req.body;

  try {
    const { data, error } = await supabase
      .from("city info")
      .update(updates)
      .eq("id", userId)
      .select("*");

    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (data.length === 0) {
      return res.status(404).json({ error: "City info not found" });
    }

    return res.json(data); // Return the updated entry
  } catch (err) {
    res.status(500).json({ error: "An unexpected error occurred" });
  }
};
module.exports = { getCityInfo,updateCityInfo};
