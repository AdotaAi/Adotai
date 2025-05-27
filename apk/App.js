import { StatusBar } from 'react-native';
import { StyleSheet, Text, SafeAreaView } from 'react-native';
import { WebView } from 'react-native-webview';
import * as NavigationBar from 'expo-navigation-bar';
import { useEffect } from 'react';

export default function App() {

  useEffect(() => {
    NavigationBar.setBackgroundColorAsync('#dfdfdf');
    NavigationBar.setButtonStyleAsync('dark');
  }, []);
  return (
    <>
      <StatusBar barStyle="light-content" backgroundColor="#202020" />
      <SafeAreaView style={styles.container}>
        <WebView
          source={{ uri: 'http://192.168.0.105:5173/' }}
          style={{ flex: 1 }}
        />
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#202020'
  },
});
