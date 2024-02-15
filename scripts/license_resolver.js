import { promises as fsPromises } from 'fs';
import moment from 'moment';

//Check the validity of the currently active license
async function getCurrentActiveLicense() {
    try {
        const licenseData = await fsPromises.readFile('./licenses.json', 'utf8');
        const licenses = JSON.parse(licenseData);
        let license;
        let count = 0;

        licenses.forEach(lic => {
            if (lic.status === 'active') {
                let licenseDT = moment(lic.date);
                let currentDT = moment();
                if (licenseDT.isAfter(currentDT)) {
                    license = {
                        license: lic.license,
                        license_date: lic.date,
                        license_status: lic.status
                    };
                } else {
                    count++;
                    lic.status = 'expired';
                    license = {
                        license: lic.license,
                        license_date: lic.date,
                        license_status: lic.status
                    };
                }
            } else {
                count++;
            }
        });

        if (count === licenses.length) {
            license = {
                license: 'Expired',
                license_date: 'NA',
                license_status: 'expired'
            };
        }

        await fsPromises.writeFile('./licenses.json', JSON.stringify(licenses, null, 2));
        return license;

    } catch (error) {
        console.error('Error with getCurrentActiveLicense', error);
        throw error;
    }
}
// Authenticate the license
async function setCurrentActiveLicense(userLicense) {
    try {
        const licenseData = await fsPromises.readFile('./licenses.json', 'utf8');
        const licenses = JSON.parse(licenseData);

        let licenseIsAcquired = false;

        licenses.forEach(lic => {
            if (userLicense === lic.license && lic.status === 'not-active') {
                lic.status = 'active';
                licenseIsAcquired = true;
            }
        });

        if (licenseIsAcquired) {
            await fsPromises.writeFile('./licenses.json', JSON.stringify(licenses, null, 2));
            console.log('License Updated OK');
            return 5; // License successfully activated
        } else {
            return 4; // License not found or already expired
        }
        
    } catch (error) {
        console.error('Error with setCurrentActiveLicense', error);
        throw error;
    }
    
}

export { getCurrentActiveLicense, setCurrentActiveLicense };
