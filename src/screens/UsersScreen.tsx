import React, { useEffect } from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

import Colors from "../theme/Colors";
import ErrorState from "../components/ErrorState";
import LoadingState from "../components/LoadingState";
import SimpleButton from "../components/SimpleButton";
import { Column, SortableTable } from "../components/SortableTable";
import { User } from "../types/user";
import { useUserData } from "./hooks/useUsersData";

const UsersScreen: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark';
  const columns: Column<User>[] = [
    { field: 'name', header: 'Name' },
    { field: 'age', header: 'Age' },
  ];

  const { users, refreshUsers, isLoading, error } = useUserData();

  if (isLoading) {
    return <LoadingState />;
  }

  if (error || !users) {
    return <ErrorState onPress={refreshUsers} />;
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
      <SimpleButton onPress={refreshUsers} title="Refresh" />
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
