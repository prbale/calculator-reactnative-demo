import React, { useState } from "react"; // react hook to maintain state
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "@/utils/Colors";
import Button from "./Button";

const Calculator = () => {

  // State variable for calculator logic
  const [firstValue, setFirstValue] = useState(""); // Store the first value entered
  const [displayValue, setDisplayValue] = useState("0"); // Store the value displayed on the calculator
  const [operator, setOperator] = useState(""); // Store the operator selected

  // Handle number input
  // Updates the displayValue when a number button is pressed.
  const handleNumberInput = (num: string) => {
    if (displayValue == "0") {
      setDisplayValue(num);
    } else {
      setDisplayValue(displayValue + num);
    }
  };

  // Handles operator input
  // Stores the operator and the first operand.
  const handleOperatorInput = (operator: string) => {
    setOperator(operator || ""); // Ensure that operator is always a string
    setFirstValue(displayValue);
    setDisplayValue("0");
  };

  // Performs the calculation based on the operator and values entered
  // and updates the display value accordingly
  const handleCalculation = () => {
    const num1 = parseFloat(firstValue);
    const num2 = parseFloat(displayValue);

    const result = (() => {
      switch (operator) {
        case "+": return num1 + num2;
        case "-": return num1 - num2;
        case "*": return num1 * num2;
        case "/": return num1 / num2;
        case "%": return num1 % num2;
        default: return 0;
      }
    })();

    setDisplayValue(result.toString());
    setOperator("");
    setFirstValue("");
  };

  const handleClear = () => {
    setDisplayValue("0");
    setOperator("");
    setFirstValue("");
  };

  const handleDelete = () => {
    if (displayValue.length == 1) {
      setDisplayValue("0");
    } else {
      setDisplayValue(displayValue.slice(0, -1));
    }
  };

   // Renders a row of buttons
  const renderButtonRow = (buttons: { title: string; type: string; onPress: () => void }[]) => (
    buttons.map((btn, index) => (
      <Button key={index} title={btn.title} type={btn.type as "top" | "right" | "number"} onPress={btn.onPress} />
    ))
  );

  // Main render function for the calculator component
  // It displays the calculator layout, including the display and buttons.
  // The buttons are arranged in rows and columns for easy access.
  // The display shows the current value and the operator selected.
  // The buttons are interactive and trigger the appropriate functions when pressed.
  // The layout is responsive and adjusts to different screen sizes.
  return (
    <View style={styles.container}>
      
      {/* Display Section */}
      <View style={styles.display}>
        <Text style={styles.historyText}>
          {firstValue + (operator || "")}
          </Text>
        <Text style={styles.displayText}>{displayValue}</Text>
      </View>

      {/* Keypad Section */}
      <ScrollView contentContainerStyle={styles.keypad} showsVerticalScrollIndicator={false}>
        {renderButtonRow([
          { title: "C", type: "top", onPress: handleClear },
          { title: "⌫", type: "top", onPress: handleDelete },
          { title: "%", type: "top", onPress: () => handleOperatorInput("%") },
          { title: "÷", type: "right", onPress: () => handleOperatorInput("/") },
        ])}
        {renderButtonRow([
          { title: "7", type: "number", onPress: () => handleNumberInput("7") },
          { title: "8", type: "number", onPress: () => handleNumberInput("8") },
          { title: "9", type: "number", onPress: () => handleNumberInput("9") },
          { title: "x", type: "right", onPress: () => handleOperatorInput("*") },
        ])}
        {renderButtonRow([
          { title: "4", type: "number", onPress: () => handleNumberInput("4") },
          { title: "5", type: "number", onPress: () => handleNumberInput("5") },
          { title: "6", type: "number", onPress: () => handleNumberInput("6") },
          { title: "-", type: "right", onPress: () => handleOperatorInput("-") },
        ])}
        {renderButtonRow([
          { title: "1", type: "number", onPress: () => handleNumberInput("1") },
          { title: "2", type: "number", onPress: () => handleNumberInput("2") },
          { title: "3", type: "number", onPress: () => handleNumberInput("3") },
          { title: "+", type: "right", onPress: () => handleOperatorInput("+") },
        ])}
        {renderButtonRow([
          { title: "0", type: "number", onPress: () => handleNumberInput("0") },
          { title: "00", type: "number", onPress: () => handleNumberInput("00") },
          { title: ".", type: "number", onPress: () => handleNumberInput(".") },
          { title: "=", type: "right", onPress: handleCalculation },
        ])}
      </ScrollView>
    </View>
  );
};

// Styles for the Calculator component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  display: {
    height: 200,
    backgroundColor: Colors.gray,
    paddingVertical: 20,
    paddingHorizontal: 40,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  historyText: {
    fontSize: 30,
    fontWeight: "300",
  },
  displayText: {
    fontSize: 70,
    fontWeight: "300",
  },
  keypad: {
    flexGrow: 1,
    backgroundColor: Colors.light,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: 30,
    padding: 30,
  },
});

export default Calculator;