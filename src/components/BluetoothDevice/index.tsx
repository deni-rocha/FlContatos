import { useColorScheme } from 'nativewind';
import React, { useEffect, useState } from 'react';
import { PermissionsAndroid, Platform, View, Text } from 'react-native';
import { BleManager, Device } from 'react-native-ble-plx';



const BluetoothDevice = () => {
  const { colorScheme } = useColorScheme()
  const isDarkMode = colorScheme === 'dark'
  const [devices, setDevices] = useState<(Device | null)[]>([]);
  const bleManager = new BleManager();

  useEffect(() => {
    if (Platform.OS === 'android') {
      requestLocationPermission();
    }

    scanAndConnect();
   

    return () => {
      bleManager.destroy();
    };
  }, []);

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permissão de Localização',
          message: 'Este aplicativo precisa acessar sua localização para usar o Bluetooth.',
          buttonNeutral: 'Pergunte-me depois',
          buttonNegative: 'Cancelar',
          buttonPositive: 'OK',
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('Permissão de localização concedida');
      } else {
        console.log('Permissão de localização negada');
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const scanAndConnect = () => {
    
    bleManager.startDeviceScan(null, null, (error, device) => {
      if (error) {
        console.error(error);
        return;
      }

      setDevices((prevDevices) => [...prevDevices, device]);
    })
    
    setTimeout(() => bleManager.stopDeviceScan(), 5000) 
  }

  return (
    <View className={`w-full h-3/6 ${isDarkMode ? 'text-white' : 'text-black'}`}>
      <Text>Dispositivos Bluetooth:</Text>
      {devices.map((device, index) => {
        if(device === null) return
        return <Text key={index}>{device.name}</Text>
      }
      )}
    </View>
  );
};

export default BluetoothDevice