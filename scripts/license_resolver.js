import { promises as fsPromises } from 'fs';

//TODO: CHECK IF DATE HAS PASSED AND UPDATE LICENSE STATUS
async function getCurrentActiveLicense() {
    try {

        let license, count;
        const licenseData = await fsPromises.readFile('./licenses.json', 'utf8');
        const licenses = JSON.parse(licenseData);

        licenses.forEach(lic => {
            if(lic.status == 'active') {
                license = {
                    license:        lic.license,
                    license_date:   lic.date,
                    license_status: lic.status
                }                
            }

        });

        return license;

    } catch (error) {
        console.error('Error with license', error);
        throw error; 
    }
}
// IN PROGRESS
async function setCurrentActiveLicense(licenseToUpdate) {
    try {

        let license, count;
        const licenseData = await fsPromises.readFile('./licenses.json', 'utf8');
        const licenses = JSON.parse(licenseData);
        
        // Find the license to update
        const indexToUpdate = licenses.findIndex(lic => lic.license === licenseToUpdate);
        if (indexToUpdate === -1) {
            throw new Error('License not found');
        }

        // Update the license status
        licenses[indexToUpdate].status = 'active';

        // Write the modified data back to the file
        await fsPromises.writeFile('./licenses.json', JSON.stringify(licenses, null, 2), 'utf8');


    } catch (error) {
        console.error('Error with license', error);
        throw error; 
    }
}

export default getCurrentActiveLicense;

