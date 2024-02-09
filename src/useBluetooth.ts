// useBluetooth.ts
import { useState, useEffect } from 'react';
import { parseCube } from './helpers/cubeParser';
import {
  connectToBluetoothDevice,
  startNotifications,
  isWebBluetoothSupported,
  disconnectFromBluetoothDevice,
  getPairedDevices
} from './helpers/bluetooth';

// b = green, u = yellow, r = red, d = white, l = orange, f = blue
const faceColorMap = ['b', 'u', 'r', 'd', 'l', 'f'];

export const useBluetooth = () => {
  const [cubeState, setCubeState] = useState<string[]>([]);
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

    const transposeCubeColors = (parsedCube: number[]): string[] => {
      const colorMap: Record<number, string> = {
        1: 'b', // Green -> 'b'
        2: 'u', // Yellow -> 'u'
        3: 'r', // Red -> 'r'
        4: 'd', // White -> 'd'
        5: 'l', // Orange -> 'l'
        6: 'f', // Blue -> 'f'
      };

      // Convert each number in the parsedCube array to the corresponding character
      return parsedCube.map(faceletColor => colorMap[faceletColor]);
    }

    await getPairedDevices();

    try {
      const [connectedDevice, server] = await connectToBluetoothDevice();
      setDevice(connectedDevice);

      const characteristic = await startNotifications(server);
      characteristic.addEventListener('characteristicvaluechanged', (event) => {
        const characteristic = event.target as BluetoothRemoteGATTCharacteristic;
        if (characteristic && characteristic.value) {
          const value = characteristic.value;
          const newCubeState = parseCube(value)
          //  .map((faceletColor) => faceColorMap[faceletColor - 1])
          setCubeState(transposeCubeColors(newCubeState))
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
