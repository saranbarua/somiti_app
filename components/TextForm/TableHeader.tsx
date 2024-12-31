import React from "react";
import { Text } from "react-native";

const TableHeader = ({ text }: { text: string }) => {
  return <Text className="font-bold text-gray-700">{text}</Text>;
};

export default TableHeader;
