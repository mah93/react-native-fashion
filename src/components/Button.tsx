import React from 'react';
import { StyleSheet } from 'react-native';
import { RectButton } from 'react-native-gesture-handler'
import { useTheme } from '@shopify/restyle';
import { Text } from './Theme';

interface ButtonProps {
  label?: string,
  variant: "default" | "primary" | "transparent",
  onPress?: () => void,
}

const Button: React.FC<ButtonProps> = (props) => {
  const {
    label,
    variant = "default",
    onPress,
    children
  } = props;
  const theme = useTheme();

  const backgroundColor = variant === "primary" ? theme.colors.primary : variant === "transparent" ? "transparent" : theme.colors.grey;
  const color = variant === "primary" ? theme.colors.white : theme.colors.secondary;
  return (
    <RectButton style={[styles.container, { backgroundColor }]} {...{onPress}}>
      {children ? children: <Text variant="button" style={{ color }}>{label}</Text>}
    </RectButton>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 25,
    height: 50,
    width: 245,
    justifyContent: 'center',
    alignItems: 'center'
  },
  label: {
    fontSize: 15,
  }
})

export default Button; 
