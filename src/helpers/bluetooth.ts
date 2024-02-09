export const SERVICE_UUID: string = '0000aadb-0000-1000-8000-00805f9b34fb';
export const CHARACTERISTIC_UUID: string = '0000aadc-0000-1000-8000-00805f9b34fb';

export const isWebBluetoothSupported: boolean = 'bluetooth' in navigator;

export const connectToBluetoothDevice = async (): Promise<[BluetoothDevice, BluetoothRemoteGATTServer]> => {
  const device = await navigator.bluetooth.requestDevice({
    acceptAllDevices: true,
    optionalServices: [SERVICE_UUID]
  });

  if (!device.gatt) {
    throw new Error('Bluetooth GATT server is unavailable');
  }

  const server = await device.gatt.connect();
  return [device, server];
};

export const getPairedDevices = async (): Promise<void> => {
  try {
    const devices = await navigator.bluetooth.getDevices();
    console.log(devices); // Logs an array of BluetoothDevice objects
    // You can iterate over the devices array to access individual device properties
    devices.forEach(device => {
      console.log(`Device name: ${device.name}`);
      console.log(`Device id: ${device.id}`);
      // other properties and methods
    });
  } catch (error) {
    console.error(error); // Handle errors (e.g., user didn't grant permission)
  }
}

export const startNotifications = async (server: BluetoothRemoteGATTServer): Promise<BluetoothRemoteGATTCharacteristic> => {
  const service = await server.getPrimaryService(SERVICE_UUID);
  const characteristic = await service.getCharacteristic(CHARACTERISTIC_UUID);
  await characteristic.startNotifications();
  return characteristic;
};

export const disconnectFromBluetoothDevice = (device: BluetoothDevice): void => {
  if (device?.gatt?.connected) {
    device.gatt.disconnect();
  }
};
