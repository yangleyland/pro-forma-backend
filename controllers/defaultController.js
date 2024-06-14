const supabase = require("../supabaseClient");


const updateDefault = async (req, res) => {
    const { userId, tableName } = req.query;

    try {
        const mapping ={"advanced controls":"advanced_controls","fleet data":"fleet_data","phases":"infrastructure_phases"}

        const { data: jsonData, error: defaultError } = await supabase
          .from("default data") // Replace with your actual source table
          .select(mapping[tableName]) // Replace with the actual column containing JSON data
          .eq("id", userId);
    
        const jsonObject = jsonData[0][mapping[tableName]];
        
        await supabase.from(tableName).delete().eq(tableName=="advanced controls" ? "id":"user_id", userId);
        

        const { data, error } = await supabase
          .from(tableName)
          .insert(jsonObject);
    
        if (error) {
          throw new Error(`Error inserting data: ${error.message}`);
        }
        res.status(200).json({ message: "Default data restored" });
      } catch (error) {
        return res.status(500).send(error.message);
      }

}

const saveDefault = async (req, res) => {
    const { userId, tableName } = req.query;
    // Rest of your code...
    // fleet data
    // advanced controls
    // phases

    const { data, error } = await supabase
        .from(tableName)
        .select("*")
        .eq(tableName=="advanced controls" ? "id":"user_id", userId);

    if (error) {
        return res.status(500).json({ error: "Failed to fetch data from Supabase" });
    }

    const jsonData = JSON.stringify(data);

    // console.log(jsonData)

    const mapping ={"advanced controls":"advanced_controls","fleet data":"fleet_data","phases":"infrastructure_phases"}
    const field = mapping[tableName];

    const { data: updateData, error: updateError } = await supabase
        .from("default data")
        .update({ [field]: data })
        .eq("id", userId);

    if (updateError) {
        return res.status(500).json({ error: "Failed to update default data in Supabase" });
    }

    return res.status(200).json({ message: "Default data saved and updated successfully" });
};

module.exports = { saveDefault, updateDefault };

