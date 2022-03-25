import React from 'react';
import {Linking} from 'react-native';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import {Container, Text, Button} from '../components';
import {Box} from '../components/Theme';
import TextInput from '../components/Form/TextInput';
import Checkbox from '../components/Form/Checkbox';
import Footer from '../components/Footer';

const ForgotPasswordSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Required'),
});


interface ForgotPasswordProps {
}

const ForgotPassword: React.FC<ForgotPasswordProps> = (props) => {
  const {navigation} = props;

  const { handleChange, handleBlur, handleSubmit, values, errors, touched, setFieldValue } = useFormik({
    initialValues: { email: '' },
    onSubmit: (values) => console.log(values),
    validationSchema: ForgotPasswordSchema,
  });

  const footer = <Footer onPress={() => Linking.openURL('mailto:help@support.com')} title={`Don't work?`} action={`Try another way`} />
  return (
    <Container {...{footer}}>
      <Box padding="xl" flex={1} justifyContent="center">
        <Text variant="title1" textAlign='center' marginBottom='l'>Forgot Password?</Text>
        <Text variant="body" textAlign='center' marginBottom='l'>Enter the email address associated with your account</Text>
        <Box>
          <Box marginBottom="m">
            <TextInput 
              icon='mail' 
              placeholder='Enter your Email'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              error={errors.email}
              touched={touched.email}
              autoCompleteType={'email'}
              autoCapitalize='none'
              returnKeyType='next'
              returnKeyLabel='next'
              onEndEditing={() => handleSubmit()}
            />
          </Box>
          <Box alignItems="center" marginTop="m">
            <Button variant="primary" label="Reset Password" onPress={handleSubmit}/>
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default ForgotPassword;