import React, { useCallback, useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  TextInput,
  useColorScheme,
  View,
} from "react-native";

import colors, { mainColorGreen } from "../../theme/colors";
import { debounce, orderBy } from "../../utils";
import { SortableTableItem } from "./SortableTableItem";
import { SortableTableHeader } from "./SortableTableHeader";

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
  const [data, setData] = useState<T[]>(tableData);
  const [direction, setDirection] = useState<'asc' | 'desc'>('asc');
  const [selectedColumn, setSelectedColumn] = useState<keyof T | null>(null);
  const [search, setSearch] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const debouncedSearchTerm = debounce((nextValue: string) => setSearchTerm(nextValue), 500);

  useEffect(() => {
    debouncedSearchTerm(search);
  }, [search, debouncedSearchTerm]);

  useEffect(() => {
    const lowerCaseSearchTerm = searchTerm.toLowerCase();
    let filteredData = tableData?.filter((item: T) =>
      Object.values(item).some((value) =>
        String(value).toLowerCase().includes(lowerCaseSearchTerm)
      )
    );
    if (selectedColumn) {
      filteredData = orderBy(filteredData, selectedColumn, direction);
    }
    setData(filteredData);
  }, [tableData, searchTerm]);

  const sortTable = (column: keyof T) => {
    const newDirection = direction === 'desc' ? 'asc' : 'desc';
    const sortedData = orderBy(data, column, newDirection);
    setSelectedColumn(column);
    setDirection(newDirection);
    setData(sortedData);
  };

  const renderTableItem = useCallback(
    ({ item, index }: { item: T, index: number }) =>
      <SortableTableItem item={item} index={index} columns={columns} />,
    [columns]
  );

  return (
    <View style={styles.container}>
      <TextInput
        style={[
          styles.searchInput,
          { color: isDarkMode ? colors.dark.text : colors.light.text },
        ]}
        placeholder="Search..."
        placeholderTextColor={isDarkMode ? colors.dark.text : colors.light.text}
        value={search}
        onChangeText={setSearch}
      />
      <FlatList
        data={data}
        keyExtractor={(item, index) => index + ""}
        ListHeaderComponent={(
          <SortableTableHeader
            columns={columns}
            direction={direction}
            selectedColumn={selectedColumn}
            sortTable={sortTable}
          />
        )}
        renderItem={renderTableItem}
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
});

