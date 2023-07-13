import React from "react";
import { StyleSheet, useColorScheme, View } from "react-native";

import Colors from "../theme/Colors";
import ErrorState from "../components/ErrorState";
import iconsBundle from "../theme/iconsBundle";
import LoadingState from "../components/LoadingState";
import { Column, SortableTable } from "../components/SortableTable";
import { ImageButton } from "../components/ImageButton";
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
      <ImageButton
        icon={iconsBundle.refresh}
        onPress={refreshUsers}
        style={styles.imageButton}
      />
      <SortableTable
        columns={columns}
        data={users}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  imageButton: {
    alignItems: 'flex-end',
  },
});

export default UsersScreen;
