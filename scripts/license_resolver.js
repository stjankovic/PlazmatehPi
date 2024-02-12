import { promises as fsPromises }   from 'fs';
import moment                       from 'moment'

async function getCurrentActiveLicense() {
    try {

        let license, count = 0;
        const licenseData = await fsPromises.readFile('./licenses.json', 'utf8');
        const licenses = JSON.parse(licenseData);

        licenses.forEach(lic => {
            if(lic.status == 'active') {
                let licenseDT = moment(lic.date);
                let currentDT = moment();
                if(licenseDT.isAfter(currentDT)) {
                    license = {
                        license:        lic.license,
                        license_date:   lic.date,
                        license_status: lic.status
                    } 
                } else {
                    count++
                    lic.status = 'expired'
                    license = {
                        license:        lic.license,
                        license_date:   lic.date,
                        license_status: lic.status
                    } 
                    
                }
            } else {
                count++;
            }
            
        });

        if(count == licenses.length) {
            license = {
                license:        'Expired',
                license_date:   'NA',
                license_status: 'expired'
            } 
        }

        await fsPromises.writeFile('./licenses.json', JSON.stringify(licenses, null, 2));
        return license;

    } catch (error) {
        console.error('Error with getCurrentActiveLicense', error);
        throw error; 
    }
}

// async function updateDataJsonWithMoment() {
//     try {
//         // Read the contents of ./licenses.json'
//         const rawData = await fsPromises.readFile('./licenses.json', 'utf-8');
//         const licenses = JSON.parse(rawData);

//         // Update each element of the array with the current date and time using Moment.js
//         licenses.forEach((lic) => {
//             lic.date = moment().toISOString();
//         });

    
//         await fsPromises.writeFile('./licenses.json', JSON.stringify(licenses, null, 2));
//     } catch (error) {
//         console.error("Error updating data.json:", error);
//     }
// }

export { getCurrentActiveLicense };

