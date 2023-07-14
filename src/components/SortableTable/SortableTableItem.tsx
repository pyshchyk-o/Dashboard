import React from 'react';
import { StyleSheet, Text, View } from "react-native";

import { mainColorBlack, mainColorLightGreen, mainColorWhite } from "../../theme/colors";
import { Column } from './SortableTable';

interface SortableTableItemProps<T> {
  item: T;
  index: number;
  columns: Column<T>[];
}

export const SortableTableItem = <T extends object>({ item, index, columns }: SortableTableItemProps<T>) => (
  <View
    style={{
      ...styles.tableRow,
      backgroundColor: index % 2 == 1 ? mainColorLightGreen : mainColorWhite,
    }}
  >
    {columns.map((column, columnIndex) => (
      <Text
        numberOfLines={1}
        ellipsizeMode='tail'
        key={columnIndex}
        style={{
          ...styles.columnRowTxt,
          color: index % 2 == 1 ? mainColorWhite : mainColorBlack,
          fontWeight: columnIndex === 0 ? "bold" : "normal",
        }}>
        {String(item[column.field])}
      </Text>
    ))}
  </View>
);

const styles = StyleSheet.create({
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 40,
    alignItems:"center",
  },
  columnRowTxt: {
    width:"20%",
    textAlign:"center",
  },
});
