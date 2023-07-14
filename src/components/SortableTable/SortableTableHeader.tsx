import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, useColorScheme, View } from "react-native";

import colors, { mainColorWhite } from "../../theme/colors";
import iconsBundle from "../../theme/iconsBundle";
import { Column } from './SortableTable';

interface HeaderComponentProps<T> {
  columns: Column<T>[];
  sortTable: (column: keyof T) => void;
  direction: 'asc' | 'desc';
  selectedColumn: keyof T | null;
}

export const SortableTableHeader = <T extends object>({ columns, sortTable, direction, selectedColumn }: HeaderComponentProps<T>) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colorScheme = isDarkMode ? colors.dark : colors.light;
  const arrowIcon = direction === 'desc' ? iconsBundle.arrowDown : iconsBundle.arrowUp;

  return (
    <View style={[styles.tableHeader, { backgroundColor: colorScheme.mainColor }]}>
      {
        columns.map((column: Column<T>, index: number) => (
          <TouchableOpacity
            key={`${column.header}+${index}`}
            style={styles.columnHeader}
            onPress={() => sortTable(column.field)}
          >
            <View style={styles.columnHeaderWrapper}>
              <Text
                numberOfLines={1}
                ellipsizeMode='tail'
                style={styles.columnHeaderTxt}
              >
                {column.header + " "}
              </Text>
              {
                selectedColumn === column.field ? (
                  <Image source={arrowIcon} style={styles.arrowIcon} />
                ) : null
              }
            </View>
          </TouchableOpacity>
        ))
      }
    </View>
  );
};

const styles = StyleSheet.create({
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  columnHeader: {
    width: "20%",
    justifyContent: "center",
    alignItems:"center",
  },
  columnHeaderWrapper: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
  },
  columnHeaderTxt: {
    color: mainColorWhite,
    fontWeight: "bold",
  },
  arrowIcon: {
    position: 'absolute',
    right: -14,
    top: 4,
    width: 14,
    height: 14,
  },
});
