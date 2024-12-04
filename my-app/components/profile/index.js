import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  Switch,
  Alert,
} from 'react-native';

const Component2 = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);

  const toggleNotifications = () => {
    setNotificationsEnabled((prevState) => !prevState);
  };

  const handleLogout = () => {
    Alert.alert('Вихід', 'Ви впевнені, що хочете вийти?', [
      { text: 'Скасувати', style: 'cancel' },
      { text: 'Так', onPress: () => console.log('Logout confirmed') },
    ]);
  };

  return (
      <ScrollView style={styles.container}>
        {/* Аватар и имя */}
        <View style={styles.profileHeader}>
          <Image
              source={{
                uri: 'https://via.placeholder.com/100',
              }}
              style={styles.avatar}
          />
          <Text style={styles.name}>Ім'я Користувача</Text>
          <Text style={styles.email}>user@example.com</Text>
        </View>

        {/* Настройки */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Налаштування</Text>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Сповіщення</Text>
            <Switch
                value={notificationsEnabled}
                onValueChange={toggleNotifications}
            />
          </View>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Темна тема</Text>
            <Switch value={false} onValueChange={() => {}} />
          </View>
        </View>

        {/* Личная информация */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Особиста інформація</Text>
          <TouchableOpacity style={styles.infoRow}>
            <Text style={styles.infoLabel}>Редагувати профіль</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.infoRow}>
            <Text style={styles.infoLabel}>Змінити пароль</Text>
          </TouchableOpacity>
        </View>

        {/* Вихід */}
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Вийти з профілю</Text>
        </TouchableOpacity>
      </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  profileHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
  },
  email: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  infoRow: {
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    fontSize: 16,
    color: '#007BFF',
  },
  logoutButton: {
    backgroundColor: '#FF3B30',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  logoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default Component2;
