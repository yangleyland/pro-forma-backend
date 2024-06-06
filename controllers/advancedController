const supabase = require("../supabaseClient");


const addAdvancedControl = async (req,res) => {
  const { id, inflation, inflation_escalation_rate, electricity_escalation_rate, gasoline_escalation_rate, infrastructure_loan_term, infrastructure_loan_interest_rate, discount_rate_npv, maintenance_costs_annual_per_station, charging_optimization, charging_optimization_savings, charge_management_subscription_costs, charger_network_costs } = req.body;

  try {
    const { data, error } = await supabase
      .from("advanced controls")
      .insert([
        {
          id,
          inflation,
          inflation_escalation_rate,
          electricity_escalation_rate,
          gasoline_escalation_rate,
          infrastructure_loan_term,
          infrastructure_loan_interest_rate,
          discount_rate_npv,
          maintenance_costs_annual_per_station,
          charging_optimization,
          charging_optimization_savings,
          charge_management_subscription_costs,
          charger_network_costs,
        },
      ]);

    if (error) {
      throw error;
    }

    res.status(200).json({ message: "Advanced control added successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};




const getAdvancedControls = async (req, res) => {
  const { userId } = req.params;
  const { data, error } = await supabase
    .from("advanced controls")
    .select("*")
    .eq("id", userId);

  if (error) {
    res.status(400).json({ error: error.message });
  }
  res.status(200).json(data[0]);
};

const updateFleetEconomics = async (req, res) => {
  const {
    id, // Make sure to pass an ID to identify the row to update
    inflation,
    inflation_escalation_rate,
    electricity_escalation_rate,
    gasoline_escalation_rate,
    infrastructure_loan_term,
    infrastructure_loan_interest_rate,
    discount_rate_npv,
    maintenance_costs_annual_per_station,
    charging_optimization,
    charging_optimization_savings,
    charge_management_subscription_costs,
    charger_network_costs,
  } = req.body;

  try {
    const {data,error } = await supabase
      .from("advanced controls")
      .update({
        inflation,
        inflation_escalation_rate,
        electricity_escalation_rate,
        gasoline_escalation_rate,
        infrastructure_loan_term,
        infrastructure_loan_interest_rate,
        discount_rate_npv,
        maintenance_costs_annual_per_station,
        charging_optimization,
        charging_optimization_savings,
        charge_management_subscription_costs,
        charger_network_costs,
      })
      .eq("id", id); // Ensure you update the correct row

    if (error) {
      throw error;
    }

    res
      .status(200)
      .json({ message: "Fleet economics updated successfully", data });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = { getAdvancedControls, updateFleetEconomics,addAdvancedControl };
