import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-web';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import { s } from './App.style';
import { useState } from 'react';
import CardTodo from './components/CardTodo/CardTodo';
import Header from './components/Header/Header';
import TabBottomMenu from './components/TabBottomMenu/TabBottomMenu';

export default function App() {

  const [selectedTabName, setSelectedTabName] = useState("all")

  const [todoList, setTodoList] = useState([
    {id: 1, title: "Sortir le chien", isCompleted: true},
    {id: 2, title: "Aller chez le garagisteeeeeee", isCompleted: false},
    {id: 3, title: "Faire les courses", isCompleted: false},
    {id: 4, title: "Appeler le vétérinaire", isCompleted: false},
    {id: 5, title: "Sortir le chien", isCompleted: true},
    {id: 6, title: "Aller chez le garagiste", isCompleted: false},
    {id: 7, title: "Faire les courses", isCompleted: false},
    {id: 8, title: "Appeler le vétérinaire", isCompleted: false}
  ])

  function renderTodoList(){
    return getFilteredList().map((todo, i) => (
        <View style={s.cardItem}>
          <CardTodo onPress={() => updateTodo(todo)} todo={todo}/>
        </View>)
    )
  }

  function getFilteredList(){
    switch(selectedTabName){
      case "all":
        return todoList
        break;
      case "inProgress":
        return todoList.filter(todo => !todo.isCompleted)
      case "done":
        return todoList.filter(todo => todo.isCompleted)
        
    }
  }

  function updateTodo(todo){
    const updateTodo = {
      ...todo,
      isCompleted: !todo.isCompleted
    }
    const indexToUpdate = todoList.findIndex((todo)=> todo.id === updateTodo.id)

    let todoListCopy = [...todoList]
    todoListCopy[indexToUpdate] = updateTodo
    setTodoList(todoListCopy)
  }
  
  return (
    <>
      <SafeAreaProvider>
        <SafeAreaView style={s.app}>
          <Header />
          <ScrollView>
            {renderTodoList()}
          </ScrollView>
          <View style={s.footer}>
            <TabBottomMenu 
              todoList={todoList} 
              onPress={setSelectedTabName} 
              selectedTabName={selectedTabName}/>
          </View>
        </SafeAreaView>
      </SafeAreaProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
