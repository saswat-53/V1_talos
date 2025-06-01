import React from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TabBar = ({ activeTab, onTabPress }) => {
  const tabs = [
    { key: 'home', icon: 'home-outline', activeIcon: 'home', label: 'Home' },
    { key: 'calendar', icon: 'calendar-outline', activeIcon: 'calendar', label: 'Calendar' },
    { key: 'chat', icon: 'chatbubble-outline', activeIcon: 'chatbubble', label: 'Chat' },
    { key: 'profile', icon: 'person-outline', activeIcon: 'person', label: 'Profile' },
  ];

  return (
    <View style={styles.container}>
      {tabs.map((tab) => (
        <TouchableOpacity
          key={tab.key}
          style={styles.tab}
          onPress={() => onTabPress(tab.key)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={activeTab === tab.key ? tab.activeIcon : tab.icon}
            size={24}
            color={activeTab === tab.key ? '#4169E1' : '#666'}
          />
          <Text style={[
            styles.tabLabel,
            { color: activeTab === tab.key ? '#4169E1' : '#666' }
          ]}>
            {tab.label}
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingBottom: 20,
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#E5E5E5',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
  },
  tabLabel: {
    fontSize: 12,
    marginTop: 4,
    fontWeight: '500',
  },
});

export default TabBar;