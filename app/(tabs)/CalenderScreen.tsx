import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import CalendarCard from '../../components/Calendercard';

const CalendarScreen = () => {
  const [selectedDate, setSelectedDate] = useState(null);

  // Sample appointments data
  const appointments = [
    {
      id: 1,
      date: '2025-05-22',
      time: '10:00 AM',
      title: 'Dr. Smith - Cardiology',
      location: 'Main Hospital, Room 205',
      type: 'medical'
    },
    {
      id: 2,
      date: '2025-05-25',
      time: '2:30 PM',
      title: 'Lab Test - Blood Work',
      location: 'City Lab Center',
      type: 'lab'
    },
    {
      id: 3,
      date: '2025-05-27',
      time: '9:00 AM',
      title: 'Physical Therapy',
      location: 'Wellness Center',
      type: 'therapy'
    },
    {
      id: 4,
      date: '2025-05-30',
      time: '3:00 PM',
      title: 'Follow-up Consultation',
      location: 'Medical Center',
      type: 'medical'
    }
  ];

  // Create marked dates for appointments
  const markedDates = appointments.reduce((acc, appointment) => {
    acc[appointment.date] = {
      marked: true,
      dotColor: getAppointmentColor(appointment.type),
    };
    return acc;
  }, {});

  function getAppointmentColor(type) {
    switch (type) {
      case 'medical': return '#4169E1';
      case 'lab': return '#FF6B6B';
      case 'therapy': return '#4ECDC4';
      default: return '#4169E1';
    }
  }

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
  };

  const handleAppointmentPress = (appointment) => {
    Alert.alert(
      appointment.title,
      `Date: ${new Date(appointment.date).toLocaleDateString()}\nTime: ${appointment.time}\nLocation: ${appointment.location}`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Edit', onPress: () => console.log('Edit appointment') },
        { text: 'View Details', onPress: () => console.log('View details') }
      ]
    );
  };

  const getUpcomingAppointments = () => {
    const today = new Date().toISOString().split('T')[0];
    return appointments
      .filter(apt => apt.date >= today)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
      .slice(0, 5); // Show only next 5 appointments
  };

  const formatAppointmentDate = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (dateString === today.toISOString().split('T')[0]) {
      return 'Today';
    } else if (dateString === tomorrow.toISOString().split('T')[0]) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric' 
      });
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Calendar & Appointments</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => Alert.alert('Add Appointment', 'This would open the add appointment screen')}
        >
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <CalendarCard 
        onDayPress={handleDayPress}
        selectedDate={selectedDate}
        markedDates={markedDates}
      />
      
      <View style={styles.upcomingContainer}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Upcoming Appointments</Text>
          <TouchableOpacity onPress={() => Alert.alert('View All', 'This would show all appointments')}>
            <Text style={styles.viewAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        {getUpcomingAppointments().length > 0 ? (
          getUpcomingAppointments().map((appointment) => (
            <TouchableOpacity
              key={appointment.id}
              style={styles.appointmentCard}
              onPress={() => handleAppointmentPress(appointment)}
              activeOpacity={0.7}
            >
              <View style={styles.appointmentIndicator}>
                <View 
                  style={[
                    styles.colorDot, 
                    { backgroundColor: getAppointmentColor(appointment.type) }
                  ]} 
                />
              </View>
              
              <View style={styles.appointmentTime}>
                <Text style={styles.timeText}>
                  {formatAppointmentDate(appointment.date)}
                </Text>
                <Text style={styles.timeSubtext}>{appointment.time}</Text>
              </View>
              
              <View style={styles.appointmentDetails}>
                <Text style={styles.appointmentTitle}>{appointment.title}</Text>
                <Text style={styles.appointmentLocation}>{appointment.location}</Text>
              </View>

              <View style={styles.appointmentActions}>
                <Ionicons name="chevron-forward" size={20} color="#ccc" />
              </View>
            </TouchableOpacity>
          ))
        ) : (
          <View style={styles.noAppointmentsContainer}>
            <Ionicons name="calendar-outline" size={48} color="#ccc" />
            <Text style={styles.noAppointmentsText}>No upcoming appointments</Text>
            <TouchableOpacity 
              style={styles.addAppointmentButton}
              onPress={() => Alert.alert('Add Appointment', 'This would open the add appointment screen')}
            >
              <Text style={styles.addAppointmentText}>Add New Appointment</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>

      {/* Legend */}
      <View style={styles.legendContainer}>
        <Text style={styles.legendTitle}>Legend</Text>
        <View style={styles.legendItems}>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4169E1' }]} />
            <Text style={styles.legendText}>Medical</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#FF6B6B' }]} />
            <Text style={styles.legendText}>Lab Test</Text>
          </View>
          <View style={styles.legendItem}>
            <View style={[styles.legendDot, { backgroundColor: '#4ECDC4' }]} />
            <Text style={styles.legendText}>Therapy</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 16,
    marginLeft:16,
    marginRight:16, // Creates gap on all sides
    backgroundColor: '#ffffff',
    borderTopLeftRadius:20,
    borderTopRightRadius:20
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  addButton: {
    backgroundColor: '#4169E1',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  upcomingContainer: {
    padding: 20,
    paddingTop: 10,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  viewAllText: {
    fontSize: 14,
    color: '#4169E1',
    fontWeight: '600',
  },
  appointmentCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    alignItems: 'center',
  },
  appointmentIndicator: {
    marginRight: 12,
  },
  colorDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  appointmentTime: {
    alignItems: 'center',
    marginRight: 16,
    minWidth: 60,
  },
  timeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#4169E1',
  },
  timeSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  appointmentDetails: {
    flex: 1,
  },
  appointmentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  appointmentLocation: {
    fontSize: 14,
    color: '#666',
  },
  appointmentActions: {
    marginLeft: 12,
  },
  noAppointmentsContainer: {
    alignItems: 'center',
    paddingVertical: 40,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginTop: 8,
  },
  noAppointmentsText: {
    fontSize: 16,
    color: '#666',
    marginTop: 12,
    marginBottom: 20,
  },
  addAppointmentButton: {
    backgroundColor: '#4169E1',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  addAppointmentText: {
    color: '#fff',
    fontWeight: '600',
  },
  legendContainer: {
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginBottom: 20,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  legendTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  legendItems: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  legendItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  legendDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    marginRight: 6,
  },
  legendText: {
    fontSize: 12,
    color: '#666',
  },
});

export default CalendarScreen;