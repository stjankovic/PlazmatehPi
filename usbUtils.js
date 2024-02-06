import usb from 'usb';
import drivelist from 'drivelist';

// Function to list USB drives and get their sizes in GB
export const listUSBDrives = async () => {
    try {
        const usbDevices = usb.getDeviceList();
        const usbDrives = await drivelist.list();

        const allDrives = [];

        usbDrives.forEach(drive => {
            // Check if the drive is a USB drive
            if (drive.isUSB) {
                // Calculate size in GB
                const sizeInBytes = drive.size; // Size of the drive in bytes
                const sizeInGB = sizeInBytes / (1024 * 1024 * 1024); // Convert bytes to gigabytes

                allDrives.push({ drive, sizeInGB });
            }
        });

        return allDrives;
    } catch (error) {
        console.error('Error listing USB drives:', error);
        return [];
    }
};