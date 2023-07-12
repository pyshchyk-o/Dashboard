import React from "react";
import { View, StyleSheet, useColorScheme, ActivityIndicator, Text, TouchableOpacity } from "react-native";

import SimpleButton from "../components/SimpleButton";
import { Column, SortableTable } from "../components/SortableTable";
import { User } from "../types/user";
import Colors from "../theme/Colors";
import { useCachedData } from "../hooks/useCachedData";
import { ApiClient } from "../api/ApiClient";

const UsersScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const columns: Column<User>[] = [
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
  ];

  const { data: users, refreshData: refreshUsers, isLoading, error } = useCachedData<User[]>(
    ApiClient.fetchUsers,
    'userData',
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error || !users) {
    return (
      <View style={styles.container}>
        <Text>Error occurred while fetching data</Text>
        <TouchableOpacity onPress={refreshUsers}>
          <Text>Refresh</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View
      style={[
        styles.container,
        { backgroundColor: isDarkMode ? Colors.dark.background : Colors.light.background },
      ]}>
      <SortableTable
        data={users}
        columns={columns}
      />
      <SimpleButton onPress={refreshUsers} title="Refresh Data" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
});

export default UsersScreen;
