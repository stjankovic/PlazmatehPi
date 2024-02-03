const fs = require('fs');

// Function to add a new row to a JSON file
function addDB(newRow) {
    fs.readFile('data.json', 'utf8', function(err, existingData) {
        if (err) {
            if (err.code === 'ENOENT') {
                // File does not exist, create a new file with the newRow
                const jsonData = [newRow];
                const updatedJsonData = JSON.stringify(jsonData, null, 2);
                fs.writeFile('data.json', updatedJsonData, function(err) {
                    if (err) {
                        console.error('Error creating JSON file:', err);
                        return;
                    }
                    // console.log('JSON file created with new row successfully');
                });
            } else {
                // Other error occurred while reading the file
                console.error('Error reading JSON file:', err);
            }
            return;
        }

        // Check if existingData is empty
        if (!existingData.trim()) {
            // File is empty, create a new file with the newRow
            const jsonData = [newRow];
            const updatedJsonData = JSON.stringify(jsonData, null, 2);
            fs.writeFile('data.json', updatedJsonData, function(err) {
                if (err) {
                    console.error('Error creating JSON file:', err);
                    return;
                }
                // console.log('JSON file created with new row successfully');
            });
            return;
        }

        // File exists and contains valid JSON data
        try {
            const jsonData = JSON.parse(existingData);
            jsonData.push(newRow);
            const updatedJsonData = JSON.stringify(jsonData, null, 2);
            fs.writeFile('data.json', updatedJsonData, function(err) {
                if (err) {
                    console.error('Error writing JSON file:', err);
                    return;
                }
                // console.log('New row added to JSON file successfully');
            });
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
        }
    });
}


module.exports = addDB;