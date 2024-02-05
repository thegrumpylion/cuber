// useBluetooth.ts
import { useState, useEffect } from 'react';
import { parseCube } from './helpers/cubeParser';
import {
  connectToBluetoothDevice,
  startNotifications,
  isWebBluetoothSupported,
  disconnectFromBluetoothDevice
} from './helpers/bluetooth';

const faceColorMap = ['g', 'y', 'r', 'w', 'o', 'b'];

export const useBluetooth = () => {
  const [cubeState, setCubeState] = useState('bbbbbbbbboooooooooyyyyyyyyygggggggggrrrrrrrrrwwwwwwwww');
  const [device, setDevice] = useState<BluetoothDevice | null>(null);

  useEffect(() => {
    return () => {
      if (device) {
        disconnectFromBluetoothDevice(device);
      }
    };
  }, [device]);

  const connect = async () => {
    if (!isWebBluetoothSupported) {
      alert('Browser does not support Bluetooth');
      return;
    }

    try {
      const [connectedDevice, server] = await connectToBluetoothDevice();
      setDevice(connectedDevice);

      const characteristic = await startNotifications(server);
      characteristic.addEventListener('characteristicvaluechanged', (event) => {
        const characteristic = event.target as BluetoothRemoteGATTCharacteristic;
        if (characteristic && characteristic.value) {
          const value = characteristic.value;
          const newCubeState = parseCube(value)
            .map((faceletColor) => faceColorMap[faceletColor - 1])
            .join('');
          setCubeState(newCubeState);
        }
      });

      connectedDevice.addEventListener('gattserverdisconnected', () => {
        disconnectFromBluetoothDevice(connectedDevice);
      });
    } catch (error) {
      console.error('Error connecting to Bluetooth device:', error);
    }
  };

  return { cubeState, connect };
};
