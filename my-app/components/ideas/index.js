import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, TextInput, Alert } from 'react-native';

const ideasData = [
  { id: '1', title: 'Створити нову ілюстрацію', date: new Date(2023, 10, 30) },
  { id: '2', title: 'Розробити логотип', date: new Date(2023, 11, 1) },
  { id: '3', title: 'Ідея для книги', date: new Date(2023, 9, 25) },
];

export const Ideas = () => {
  const [ideas, setIdeas] = useState(ideasData);
  const [sortBy, setSortBy] = useState('date');
  const [newIdea, setNewIdea] = useState('');
  const [editingIdea, setEditingIdea] = useState(null);

  const addIdea = () => {
    if (newIdea.trim()) {
      if (editingIdea) {
        setIdeas((prevIdeas) =>
            prevIdeas.map((idea) =>
                idea.id === editingIdea.id
                    ? { ...idea, title: newIdea.trim(), date: new Date() }
                    : idea
            )
        );
        setEditingIdea(null);
      } else {
        setIdeas([
          ...ideas,
          { id: String(ideas.length + 1), title: newIdea.trim(), date: new Date() },
        ]);
      }
      setNewIdea('');
    }
  };

  const deleteIdea = (id) => {
    Alert.alert('Підтвердження', 'Ви впевнені, що хочете видалити цю ідею?', [
      { text: 'Скасувати', style: 'cancel' },
      {
        text: 'Видалити',
        style: 'destructive',
        onPress: () => {
          setIdeas((prevIdeas) => prevIdeas.filter((idea) => idea.id !== id));
        },
      },
    ]);
  };

  const editIdea = (idea) => {
    setEditingIdea(idea);
    setNewIdea(idea.title);
  };

  const sortIdeas = () => {
    const sorted = [...ideas].sort((a, b) => {
      if (sortBy === 'date') {
        return new Date(b.date) - new Date(a.date);
      } else {
        return a.title.localeCompare(b.title);
      }
    });
    setIdeas(sorted);
  };

  return (
      <View style={styles.container}>
        <Text style={styles.header}>Сборщик Ідей</Text>

        <View style={styles.inputContainer}>
          <TextInput
              style={styles.input}
              placeholder="Нова ідея..."
              value={newIdea}
              onChangeText={setNewIdea}
          />
          <TouchableOpacity style={styles.addButton} onPress={addIdea}>
            <Text style={styles.addButtonText}>
              {editingIdea ? 'Оновити' : 'Додати'}
            </Text>
          </TouchableOpacity>
        </View>

        <View style={styles.sortContainer}>
          <TouchableOpacity
              style={[styles.sortButton, sortBy === 'date' && styles.activeSort]}
              onPress={() => {
                setSortBy('date');
                sortIdeas();
              }}
          >
            <Text style={styles.sortText}>За датою</Text>
          </TouchableOpacity>
          <TouchableOpacity
              style={[styles.sortButton, sortBy === 'alphabet' && styles.activeSort]}
              onPress={() => {
                setSortBy('alphabet');
                sortIdeas();
              }}
          >
            <Text style={styles.sortText}>За алфавітом</Text>
          </TouchableOpacity>
        </View>

        <FlatList
            data={ideas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
                <View style={styles.ideaItem}>
                  <Text style={styles.ideaTitle}>{item.title}</Text>
                  <Text style={styles.ideaDate}>
                    {item.date.toLocaleDateString('uk-UA', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric',
                    })}
                  </Text>
                  <View style={styles.actionsContainer}>
                    <TouchableOpacity onPress={() => editIdea(item)} style={styles.actionButton}>
                      <Text style={styles.actionText}>Редагувати</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={() => deleteIdea(item.id)} style={styles.actionButton}>
                      <Text style={styles.actionText}>Видалити</Text>
                    </TouchableOpacity>
                  </View>
                </View>
            )}
        />
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
    backgroundColor: '#fff',
  },
  addButton: {
    marginLeft: 10,
    backgroundColor: '#007BFF',
    borderRadius: 8,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  sortContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  sortButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#007BFF',
    borderRadius: 8,
    flex: 1,
    alignItems: 'center',
    marginHorizontal: 5,
  },
  activeSort: {
    backgroundColor: '#4a74ae',
  },
  sortText: {
    color: '#000000',
    fontWeight: 'bold',
  },
  ideaItem: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  ideaTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  ideaDate: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  actionsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  actionButton: {
    marginHorizontal: 5,
  },
  actionText: {
    color: '#007BFF',
    fontWeight: 'bold',
  },
});
