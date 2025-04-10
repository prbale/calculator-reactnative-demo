import React from "react";
import { StyleSheet, Text, TouchableOpacity, GestureResponderEvent } from "react-native";
import { Colors } from "@/utils/Colors";

// Define the props for the Button component
interface ButtonProps {
  title: string; // Text to display on the button
  type: "top" | "right" | "number"; // Type of button (affects styling)
  onPress: (event: GestureResponderEvent) => void; // Function to handle button press
}

// Button component
const Button: React.FC<ButtonProps> = ({ title, type, onPress }) => {
  
  // Define a mapping for button types to their respective background colors
  const backgroundColors: Record<ButtonProps["type"], string> = {
    top: Colors.btnDark,
    right: Colors.btnRight,
    number: Colors.btnLight,
  };

  // Determine the background color based on the button type
  const backgroundColor = backgroundColors[type];

  // Determine the text color based on the button type
  const textColor = type === "number" ? Colors.black : Colors.white;

  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]} // Apply styles and dynamic background color
      onPress={onPress} // Handle button press
    >
      <Text style={[styles.text, { color: textColor }]}>{title}</Text> {/* Display button title */}
    </TouchableOpacity>
  );
};

// Styles for the Button component
const styles = StyleSheet.create({
  button: {
    height: 50, // Button height
    width: 50, // Button width
    borderRadius: 10, // Rounded corners
    padding: 10, // Inner padding
    alignItems: "center", // Center text horizontally
    justifyContent: "center", // Center text vertically
    backgroundColor: Colors.btnDark, // Default background color
  },
  text: {
    fontSize: 24, // Font size for the button text
  },
});

export default Button;