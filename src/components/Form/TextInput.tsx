import React, {useState} from 'react';
import { TextInput as RNTextInput, StyleSheet, TextInputProps as RNTextInputProps } from 'react-native';
import theme, { Box } from '../Theme';
import { Feather as Icon } from '@expo/vector-icons';

interface TextInputProps extends RNTextInputProps {
  icon: string;
  validator?: (input: string) => boolean;
}

const SIZE = theme.borderRadii.m * 2;
const Valid = true;
const InValid = false;
const Pristine = null;
type InputState = typeof Valid | typeof InValid | typeof Pristine;

const TextInput: React.FC<TextInputProps> = ({icon, validator, ...props}) => {
  const [input, setInput] = useState('');
  const [state, setState] = useState<InputState>(Pristine);
  const reColor: keyof typeof theme.colors = state === Pristine ? "text" : (state === Valid ? 'primary' : 'danger');
  const color = theme.colors[reColor];
  
  const onChangeText = (text: string) => {
    setInput(text);
    if (state !== Pristine) {
      validate();
    }
  };
  const validate = () => {
    const valid = validator(input);
    setState(valid);
  }


  return (
    <Box 
      flexDirection='row' 
      alignItems='center'
      height={48} 
      borderRadius="s" 
      borderColor={reColor}
      borderWidth={StyleSheet.hairlineWidth}
      padding="s"
    >
      <Box padding={'s'}>
        <Icon name={icon} size={16} {...{color}} />
      </Box>
      <Box flex={1}>
        <RNTextInput 
          underlineColorAndroid={'transparent'} 
          placeholderTextColor={color}
          onBlur={validate}
          {...{onChangeText}}
          {...props}
        />
      </Box>
      {
        (state === Valid  || state === InValid) && (
          <Box 
            height={SIZE} 
            width={SIZE} 
            borderRadius='m'
            backgroundColor={state === Valid ? 'primary' : 'danger'}
            justifyContent='center'
            alignItems='center'
          >
            <Icon name={state === Valid ? 'check' : 'x'} color={'white'} size={16} />
          </Box>
        )
      }
    </Box>
  )
}

export default TextInput;