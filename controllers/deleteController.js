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

    ({ error } = await supabase.from("phases").delete().eq("user_id", userId));
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

module.exports = { deleteUser };
