const supabase = require("../supabaseClient");

const addPhase = async (req, res) => {
  const { user_id, site, year, ports } = req.body;

  // Perform data validation
  if (!user_id || !site || !year || !ports) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const { data,error } = await supabase
    .from("phases")
    .insert({ user_id, site, year, ports });

  if (error) {
    return res.status(400).json(error);
  }
  return res.status(201).json({message: 'Phase added successfully'});
};

const getPhasesByUserId = async (req, res) => {
    const { userId } =  req.params;
    // Perform data validation
    if (!userId) {
        return res.status(400).json({ error: "Missing required fields" });
    }
    const { data, error } = await supabase
        .from("phases")
        .select("*")
        .eq("user_id", userId);
    if (error) {
        return res.status(400).json(error);
    }
    return res.status(200).json(data);
};

module.exports = { addPhase, getPhasesByUserId };
