const supabase = require("../supabaseClient");

const addPhase = async (req, res) => {
  const {
    user_id,
    site,
    year,
    loan_amount,
    trenching_costs,
    upgrade_cost_utility,
    upgrade_cost_customer,
    procurement_management_cost,
    port_less_than_10_kw,
    port_10_20_kw,
    port_25_kw,
    port_180_200_kw,
    incentives,
  } = req.body;

  // Perform data validation
  if (!user_id) {
    return res.status(400).json({ error: "Missing required field" });
  }

  const { data, error } = await supabase
    .from("phases")
    .insert({
      user_id,
      site,
      year,
      loan_amount,
      trenching_costs,
      upgrade_cost_utility,
      upgrade_cost_customer,
      procurement_management_cost,
      incentives,
      port_less_than_10_kw,
      port_10_20_kw,
      port_25_kw,
      port_180_200_kw,
    })
    .select();

  if (error) {
    return res.status(400).json(error);
  }
  return res.status(201).json(data[0]);
};

const getPhasesByUserId = async (req, res) => {
  const { userId } = req.params;

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

const updatePhases = async (req, res) => {
  const {
    id,
    year,
    site,
    loan_amount,
    trenching_costs,
    upgrade_cost_utility,
    upgrade_cost_customer,
    procurement_management_cost,
    incentives,
    port_less_than_10_kw,
    port_10_20_kw,
    port_25_kw,
    port_180_200_kw,
  } = req.body;

  const { data, error } = await supabase
    .from("phases")
    .update({
      year,
      site,
      loan_amount,
      trenching_costs,
      upgrade_cost_utility,
      upgrade_cost_customer,
      procurement_management_cost,
      incentives,
      port_less_than_10_kw,
      port_10_20_kw,
      port_25_kw,
      port_180_200_kw,
    })
    .eq("id", id)
    .select();

  if (error) {
    return res.status(400).json(error);
  }

  return res.status(200).json(data);
};

const deletePhase = async (req, res) => {
  const { id } = req.params;

  const response = await supabase.from("phases").delete().eq("id", id);

  if (response.error) {
    return res.status(400).json(response.error);
  }

  return res.status(200).json(response);
};

module.exports = { addPhase, getPhasesByUserId, updatePhases,deletePhase };
