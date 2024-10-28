async function fetchVehicleInfo() {
    const vin = document.getElementById("vinInput").value;
    const apiUrl = `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVin/${vin}?format=json`;

    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        document.getElementById("vehicleInfo").innerText = formatVehicleInfo(data);
    } catch (error) {
        document.getElementById("vehicleInfo").innerText = "Error fetching data.";
        console.error("Error:", error);
    }
}

function formatVehicleInfo(data) {
    let info = "Vehicle Information:\n" + "-".repeat(30) + "\n";
    const fields = {
        "Error Code": "Error Code",
        "Error Text": "Error Text",
        "Vehicle Descriptor": "Vehicle Descriptor",
        "Make": "Make",
        "Manufacturer Name": "Manufacturer Name",
        "Model": "Model",
        "Model Year": "Model Year",
        "Plant City": "Plant City",
        "Trim": "Trim",
        "Vehicle Type": "Vehicle Type",
        "Plant Country": "Plant Country",
        "Plant State": "Plant State",
        "Body Class": "Body Class",
        "Doors": "Doors",
        "Gross Vehicle Weight Rating From": "Gross Vehicle Weight Rating From",
        "Gross Vehicle Weight Rating To": "Gross Vehicle Weight Rating To",
        "Transmission Style": "Transmission Style",
        "Transmission Speeds": "Transmission Speeds",
        "Engine Number of Cylinders": "Engine Number of Cylinders",
        "Displacement (CC)": "Displacement (CC)",
        "Displacement (CI)": "Displacement (CI)",
        "Displacement (L)": "Displacement (L)",
        "Engine Model": "Engine Model",
        "Fuel Type - Primary": "Fuel Type - Primary",
        "Valve Train Design": "Valve Train Design",
        "Engine Configuration": "Engine Configuration",
        "Engine Brake (hp) From": "Engine Brake (hp) From",
        "Seat Belt Type": "Seat Belt Type",
        "Other Restraint System Info": "Other Restraint System Info",
        "Curtain Air Bag Locations": "Curtain Air Bag Locations",
        "Front Air Bag Locations": "Front Air Bag Locations",
        "Side Air Bag Locations": "Side Air Bag Locations"
    };

    data.Results.forEach(item => {
        const field = fields[item.Variable];
        if (field && item.Value) {
            info += `${field}: ${item.Value}\n`;
        }
    });

    info += "-".repeat(30);
    return info;
}
