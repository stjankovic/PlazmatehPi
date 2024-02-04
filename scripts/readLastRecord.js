import { promises as fsPromises } from 'fs';
import { join } from 'path';

async function readLastRecord() {
    try {
        const jsonData = await fsPromises.readFile('./data.json', 'utf8');
        const records = JSON.parse(jsonData);
        const lastRecord = records[records.length - 1];
        return lastRecord;
    } catch (error) {
        console.error('Error reading last record:', error);
        throw error; // You can handle this error further up the call stack
    }
}

export default readLastRecord;