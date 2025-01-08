import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

interface DatePickerProps {
  label?: string;
  initialDate?: Date;
  onDateChange: (date: Date) => void;
  buttonStyle?: object;
  textStyle?: object;
}

const CustomDatePicker: React.FC<DatePickerProps> = ({
  label = "Select Date",
  initialDate = new Date(),
  onDateChange,
  buttonStyle,
  textStyle,
}) => {
  const [selectedDate, setSelectedDate] = useState(initialDate);
  const [isPickerVisible, setPickerVisible] = useState(false);

  const togglePicker = () => setPickerVisible(!isPickerVisible);

  const handleDateChange = (event: any, date?: Date) => {
    if (date) {
      setSelectedDate(date);
      onDateChange(date);
    }
    if (Platform.OS === "android") {
      setPickerVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, buttonStyle]}
        onPress={togglePicker}
      >
        <Text style={[styles.buttonText, textStyle]}>
          {label}: {selectedDate.toDateString()}
        </Text>
      </TouchableOpacity>

      {/* Modal for iOS */}
      {Platform.OS === "ios" && isPickerVisible && (
        <Modal
          transparent={true}
          animationType="slide"
          visible={isPickerVisible}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContainer}>
              <DateTimePicker
                value={selectedDate}
                mode="date"
                display="default"
                onChange={handleDateChange}
              />
              <TouchableOpacity
                style={styles.closeButton}
                onPress={togglePicker}
              >
                <Text style={styles.closeButtonText}>Done</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      )}

      {/* Picker for Android */}
      {Platform.OS === "android" && isPickerVisible && (
        <DateTimePicker
          value={selectedDate}
          mode="date"
          display="default"
          onChange={handleDateChange}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 10,
  },
  button: {
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
    backgroundColor: "#007BFF",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default CustomDatePicker;
