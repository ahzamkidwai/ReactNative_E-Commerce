import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  KeyboardAvoidingView,
  TextInput,
  Pressable,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {useNavigation} from '@react-navigation/native';

export default function RegisterScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();

  return (
    <SafeAreaView
      style={{flex: 1, backgroundColor: 'white', alignItems: 'center'}}>
      <View>
        <Image
          style={{width: 150, height: 150}}
          source={{
            uri: 'https://upload.wikimedia.org/wikipedia/commons/3/32/Amazon_logo._CB635397845.png',
          }}
        />
      </View>

      <KeyboardAvoidingView>
        <View style={{alignItems: 'center'}}>
          <Text
            style={{
              fontSize: 17,
              fontWeight: 'bold',
              marginTop: 12,
              color: '#041E42',
            }}>
            Register to your Account
          </Text>
        </View>

        {/* UserName Placeholder  */}

        <View style={{marginTop: 40}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#D0D0D0',
              paddingVertical: 1,
              paddingHorizontal: 20,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Icon name="rocket" size={30} color="gray" />
            <TextInput
              style={{
                color: 'gray',
                marginVertical: 5,
                width: 300,
                fontSize: name ? 16 : 16,
              }}
              placeholder="Enter your Name"
              value={name}
              onChangeText={text => {
                setName(text);
                console.log('Name is : ', name);
              }}
            />
          </View>
        </View>

        {/* Email Text Input  */}

        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#D0D0D0',
              paddingVertical: 1,
              paddingHorizontal: 20,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Icon name="rocket" size={30} color="gray" />
            <TextInput
              style={{
                color: 'gray',
                marginVertical: 5,
                width: 300,
                fontSize: email ? 16 : 16,
              }}
              placeholder="Enter your Email"
              value={email}
              onChangeText={text => {
                setEmail(text);
                console.log('Email is : ', email);
              }}
            />
          </View>
        </View>

        {/* Password Text Input */}

        <View style={{marginTop: 10}}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              backgroundColor: '#D0D0D0',
              paddingVertical: 1,
              paddingHorizontal: 20,
              borderRadius: 5,
              marginTop: 10,
            }}>
            <Icon name="rocket" size={30} color="gray" />
            <TextInput
              style={{
                color: 'gray',
                marginVertical: 5,
                width: 300,
                fontSize: password ? 16 : 16,
              }}
              placeholder="Enter your Password"
              value={password}
              secureTextEntry={true}
              onChangeText={text => {
                setPassword(text);
                console.log('Password is : ', password);
              }}
            />
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            marginTop: 12,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text>Keep me Logged In</Text>
          <Text style={{color: '#007FFF'}}>Forgot Password</Text>
        </View>

        <View style={{marginTop: 90}}>
          <Pressable
            style={{
              width: 200,
              backgroundColor: '#FEBE10',
              borderRadius: 6,
              marginLeft: 'auto',
              marginRight: 'auto',
              padding: 15,
            }}>
            <Text
              style={{
                color: 'white',
                textAlign: 'center',
                fontSize: 16,
                fontWeight: 'bold',
              }}>
              Register
            </Text>
          </Pressable>

          <Pressable
            onPress={() => {
              navigation.goBack();
            }}
            style={{marginTop: 15}}>
            <Text style={{textAlign: 'center', color: 'gray', fontSize: 16}}>
              Already have an Account? Sign In
            </Text>
          </Pressable>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({});
