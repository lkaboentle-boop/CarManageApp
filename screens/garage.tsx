import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Button } from 'react-native';

import { Car, useGarage } from '../GarageContext';
import { styles } from '../styles/styles';

export default function GarageScreen({ navigation }: any) {
  const { cars } = useGarage();

  const handleCarPress = (car: Car) => {
    console.log('Tapped on:', car.name);
  };

  const renderCarItem = ({ item }: { item: Car }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => handleCarPress(item)}
      activeOpacity={0.7}
    >
      <Text style={styles.carName}>{item.name}</Text>
      {!!item.description && (
        <Text style={styles.description}>{item.description}</Text>
      )}

      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Current Mileage</Text>
          <Text style={styles.statValue}>
            {item.mileage.toLocaleString()} km
          </Text>
        </View>

        <View style={styles.statBox}>
          <Text style={styles.statLabel}>Next Service</Text>
          <Text style={styles.statValue}>
            {item.nextService.toLocaleString()} km
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          title="Add a Car"
          onPress={() => navigation.navigate('Add a Car')}
          color="#007BFF"
        />
      </View>

      <FlatList
        data={cars}
        keyExtractor={(item) => item.id}
        renderItem={renderCarItem}
        contentContainerStyle={styles.listContainer}
        ListEmptyComponent={
          <Text style={styles.emptyText}>Your garage is empty.</Text>
        }
      />
    </View>
  );
}
