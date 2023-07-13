import React, { useEffect, useState } from 'react';
import {
  FlatList,
  Image,
  StyleSheet,
  Text, TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";

import Colors, {
  mainColorBlack, mainColorGreen,
  mainColorLightGreen,
  mainColorWhite
} from "../theme/Colors";
import { debounce, orderBy } from "../utils";
import iconsBundle from "../theme/iconsBundle";

export interface Column<T> {
  field: keyof T;
  header: string;
}

interface SortableTableProps<T extends object> {
  data: T[];
  columns: Column<T>[];
}

export const SortableTable = <T extends object>({ data: tableData, columns }: SortableTableProps<T>) => {
  const isDarkMode = useColorScheme() === 'dark';
  const colorScheme = isDarkMode ? Colors.dark : Colors.light;

  const [data, setData] = useState<T[]>(tableData);
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedColumn, setSelectedColumn] = useState<keyof T | null>(null);
  const [search, setSearch] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const arrowIcon = direction === 'desc' ? iconsBundle.arrowDown : iconsBundle.arrowUp;

  const debouncedSearchTerm = debounce((nextValue: string) => setSearchTerm(nextValue), 500);

  useEffect(() => {
    debouncedSearchTerm(search);
  }, [search]);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    const filteredData = tableData?.filter((item: T) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
    setData(filteredData);
  }, [tableData, searchTerm]);

  const sortTable = (column: keyof T) => {
    const newDirection = direction === 'desc' ? 'asc' : 'desc';
    const sortedData = orderBy(data, column, newDirection);
    setSelectedColumn(column);
    setDirection(newDirection);
    setData(sortedData);
  };

  const HeaderComponent = () => (
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

  const TableItem = ({ item, index }: { item: T, index: number }) => (
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

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.searchInput,
          { color: isDarkMode ? Colors.dark.text : Colors.light.text },
        ]}
        placeholder="Search..."
        placeholderTextColor={isDarkMode ? Colors.dark.text : Colors.light.text}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index + ""}
        ListHeaderComponent={HeaderComponent}
        renderItem={TableItem}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchInput:{
    height: 40,
    borderColor: mainColorGreen,
    borderWidth: 1,
    marginVertical: 14,
    paddingHorizontal: 10,
    borderRadius: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    height: 50
  },
  tableRow: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    height: 40,
    alignItems:"center",
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
  columnRowTxt: {
    width:"20%",
    textAlign:"center",
  },
  arrowIcon: {
    position: 'absolute',
    right: -14,
    top: 4,
    width: 14,
    height: 14,
  },
});

