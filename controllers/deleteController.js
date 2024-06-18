const supabase = require("../supabaseClient");

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {
    // Delete from table1
    let { error } = await supabase
      .from("advanced controls")
      .delete()
      .eq("id", userId);
    if (error) throw error;

    // Delete from table2
    ({ error } = await supabase
      .from("charger costs")
      .delete()
      .eq("id", userId));
    if (error) throw error;

    // Delete from table3 (add as many tables as needed)
    ({ error } = await supabase.from("controls").delete().eq("id", userId));
    if (error) throw error;

    ({ error } = await supabase
      .from("fleet data")
      .delete()
      .eq("user_id", userId));
    if (error) throw error;

    ({ error } = await supabase
      .from("fleet data")
      .delete()
      .eq("user_id", userId));
    if (error) throw error;

    ({ error } = await supabase.from("default data").delete().eq("id", userId));
    if (error) throw error;

    await supabase.auth.admin.deleteUser(userId);

    res
      .status(200)
      .json({ message: "User data deleted successfully from all tables" });
  } catch (error) {
    console.error("Error deleting user data:", error.message);
    res.status(500).json({ error: error.message });
  }
};

const resetToDefault = async (req, res) => {
  const { userId } = req.params;
  try {
    const { data: jsonData, error: defaultError } = await supabase
      .from("default data") // Replace with your actual source table
      .select("fleet_data") // Replace with the actual column containing JSON data
      .eq("id", userId);

    const jsonObject = jsonData[0].fleet_data;

    await supabase.from("fleet data").delete().eq("user_id", userId);

    const { data, error } = await supabase
      .from("fleet data")
      .insert(jsonObject);

    if (error) {
      throw new Error(`Error inserting data: ${error.message}`);
    }
    res.status(200).json({ message: "Default data restored" });
  } catch (error) {
    return res.status(500).send(error.message);
  }
};

module.exports = { deleteUser, resetToDefault };
