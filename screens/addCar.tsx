import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  Alert,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';

import { useGarage } from '../GarageContext';
import { styles } from '../styles/styles';

export default function AddCarScreen({ navigation }: any) {
  const { addCar } = useGarage();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [mileage, setMileage] = useState('');
  const [nextService, setNextService] = useState('');

  const handleSave = () => {
    const trimmedName = name.trim();
    const trimmedMileage = mileage.trim();
    const trimmedNextService = nextService.trim();

    if (!trimmedName || !trimmedMileage || !trimmedNextService) {
      Alert.alert(
        'Missing information',
        'Please enter the vehicle name, current mileage and next service mileage.'
      );
      return;
    }

    const mileageNumber = Number(trimmedMileage);
    const nextServiceNumber = Number(trimmedNextService);

    if (
      !Number.isInteger(mileageNumber) ||
      !Number.isInteger(nextServiceNumber) ||
      mileageNumber < 0 ||
      nextServiceNumber < 0
    ) {
      Alert.alert(
        'Invalid mileage',
        'Mileage and next service must be whole numbers greater than or equal to 0.'
      );
      return;
    }

    const newCar = {
      id: Date.now().toString(),
      name: trimmedName,
      description: description.trim(),
      mileage: mileageNumber,
      nextService: nextServiceNumber,
    };

    addCar(newCar);

    setName('');
    setDescription('');
    setMileage('');
    setNextService('');

    navigation.goBack();
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Add a New Ride</Text>

        <Text style={styles.label}>Vehicle Name</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. Kawasaki KLR650"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Description (Optional)</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="e.g. Needs a service..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={3}
        />

        <Text style={styles.label}>Current Mileage (km)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 45000"
          value={mileage}
          onChangeText={setMileage}
          keyboardType="numeric"
        />

        <Text style={styles.label}>Next Service Due (km)</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g. 50000"
          value={nextService}
          onChangeText={setNextService}
          keyboardType="numeric"
        />

        <View style={styles.buttonContainer}>
          <Button title="Save Vehicle" onPress={handleSave} color="#28a745" />
        </View>

        <View style={styles.cancelContainer}>
          <Button
            title="Cancel"
            onPress={() => navigation.goBack()}
            color="#dc3545"
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}
