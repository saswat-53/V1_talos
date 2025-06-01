import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Calendar } from 'react-native-calendars';

const CalendarCard = ({ onDayPress, selectedDate, markedDates }) => {
  const today = new Date().toISOString().split('T')[0];

  // Sample events for demonstration
  const events = {
    '2025-05-22': [
      { time: '10:00 AM', text: 'Dr. Smith - Cardiology' },
    ],
    '2025-05-25': [
      { time: '2:30 PM', text: 'Lab Test - Blood Work' },
    ],
    '2025-05-27': [
      { time: '9:00 AM', text: 'Physical Therapy' },
    ],
    [today]: [
      { time: '9:00 AM', text: 'Medication Reminder - Take morning pills' },
      { time: '10:00 AM', text: 'Doctor Appointment' },
    ]
  };

  const getTodayEvents = () => {
    return events[today] || [];
  };

  const getSelectedDateEvents = () => {
    if (!selectedDate) return [];
    return events[selectedDate] || [];
  };

  // Prepare marked dates for the calendar
  const calendarMarkedDates = {
    ...markedDates,
    [today]: {
      ...markedDates?.[today],
      marked: true,
      dotColor: '#4169E1',
      customStyles: {
        container: {
          backgroundColor: today === selectedDate ? '#4169E1' : 'transparent',
          borderRadius: 16,
        },
        text: {
          color: today === selectedDate ? 'white' : '#333',
          fontWeight: 'bold',
        }
      }
    },
    ...(selectedDate && selectedDate !== today && {
      [selectedDate]: {
        ...markedDates?.[selectedDate],
        selected: true,
        selectedColor: '#4169E1',
        selectedTextColor: 'white',
      }
    })
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar & Schedule</Text>
      </View>
      
      <Calendar
        style={styles.calendar}
        current={today}
        onDayPress={onDayPress}
        markedDates={calendarMarkedDates}
        markingType={'custom'}
        theme={{
          backgroundColor: '#ffffff',
          calendarBackground: '#ffffff',
          textSectionTitleColor: '#666',
          selectedDayBackgroundColor: '#4169E1',
          selectedDayTextColor: '#ffffff',
          todayTextColor: '#4169E1',
          dayTextColor: '#333',
          textDisabledColor: '#ccc',
          dotColor: '#4169E1',
          selectedDotColor: '#ffffff',
          arrowColor: '#4169E1',
          disabledArrowColor: '#ccc',
          monthTextColor: '#333',
          indicatorColor: '#4169E1',
          textDayFontWeight: '400',
          textMonthFontWeight: '600',
          textDayHeaderFontWeight: '500',
          textDayFontSize: 14,
          textMonthFontSize: 16,
          textDayHeaderFontSize: 12,
        }}
      />

      <View style={styles.eventsSection}>
        {/* Today's Events */}
        {getTodayEvents().length > 0 && (
          <>
            <Text style={styles.sectionTitle}>TODAY</Text>
            {getTodayEvents().map((event, index) => (
              <View key={`today-${index}`} style={styles.eventItem}>
                <Text style={styles.eventTime}>{event.time}</Text>
                <Text style={styles.eventText}>{event.text}</Text>
              </View>
            ))}
          </>
        )}

        {/* Selected Date Events */}
        {selectedDate && selectedDate !== today && getSelectedDateEvents().length > 0 && (
          <>
            <Text style={styles.sectionTitle}>
              {new Date(selectedDate).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric' 
              }).toUpperCase()}
            </Text>
            {getSelectedDateEvents().map((event, index) => (
              <View key={`selected-${index}`} style={styles.eventItem}>
                <Text style={styles.eventTime}>{event.time}</Text>
                <Text style={styles.eventText}>{event.text}</Text>
              </View>
            ))}
          </>
        )}

        {/* No events message */}
        {selectedDate && selectedDate !== today && getSelectedDateEvents().length === 0 && (
          <View style={styles.noEventsContainer}>
            <Text style={styles.noEventsText}>No events for this date</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginHorizontal: 20,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    overflow: 'hidden',
  },
  header: {
    padding: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  calendar: {
    paddingHorizontal: 16,
  },
  eventsSection: {
    padding: 16,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
    marginTop: 8,
  },
  eventItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
    paddingVertical: 4,
  },
  eventTime: {
    fontSize: 12,
    color: '#4169E1',
    fontWeight: '600',
    width: 70,
    marginRight: 8,
  },
  eventText: {
    fontSize: 14,
    color: '#333',
    flex: 1,
    lineHeight: 18,
  },
  noEventsContainer: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  noEventsText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
  },
});

export default CalendarCard;