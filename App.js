import { useState } from 'react';
import { View, SafeAreaView, ScrollView, Alert, Modal, TextInput, Button, Text, TouchableOpacity } from 'react-native';
import { s } from './App.style';
import {SafeAreaProvider} from 'react-native-safe-area-context'
import Header from './components/Header/Header';
import CardTodo from './components/CardTodo/CardTodo';
import TabBottomMenu from './components/TabBottomMenu/TabBottomMenu';
// import Dialog from "react-native-dialog"
import ButtonAdd from './components/ButtonAdd/ButtonAdd';
import { v4 as uuidv4 } from 'uuid';
import 'react-native-get-random-values';

export default function App() {

  const [selectedTabName, setSelectedTabName] = useState("all")
  const [isAddDialogVisible, setIsAddDialogVisible] = useState(false)
  const [inputValue, setInputValue] = useState("")
  
    const [todoList, setTodoList] = useState([
    {id: 1, title: "Sortir le chien", isCompleted: true},
    {id: 2, title: "Aller chez le garagisteeeeeee", isCompleted: false},
    {id: 3, title: "Faire les courses", isCompleted: false},
    {id: 4, title: "Appeler le vétérinaire", isCompleted: false},
    {id: 5, title: "Sortir le chien", isCompleted: true},
    {id: 6, title: "Aller chez le garagiste", isCompleted: false},
    {id: 7, title: "Faire les courses", isCompleted: false},
    {id: 8, title: "Appeler le vétérinaire", isCompleted: false},
  ])

  function deleteTodo(todoToDelete){
    Alert.alert('Suppression', 'Supprimer cette tâche ?', [
      {
        text: 'Supprimer',
        style: 'desctructive',
        onPress: ()=>{
          setTodoList(todoList.filter(todo => todo.id !== todoToDelete.id))
        }
      },
      {
        text: 'Annuler',
        style: 'cancel'
      }
    ])
  }

  function renderTodoList(){
    return getFilteredList().map((todo, i) => 
    <View style={s.cardItem} key={i}>
      <CardTodo onLongPress={deleteTodo} onPress={()=> updateTodo(todo)} todo={todo}/>
    </View>) 
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

  function showAddDialog(){
    setIsAddDialogVisible(true)
  }

  function addTodo(){
    const newTodo = {
      id: uuidv4(),
      title: inputValue,
      isCompleted: false,
    }

    setTodoList([...todoList, newTodo])
    setIsAddDialogVisible(false)
    setInputValue('')
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
          </View>
          <ButtonAdd onPress={showAddDialog} />
          <TabBottomMenu 
        todoList={todoList} 
        onPress={setSelectedTabName} 
        selectedTabName={selectedTabName}/>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <Modal
            transparent={true}
            visible={isAddDialogVisible}
            onRequestClose={()=> setIsAddDialogVisible(false)}>
            <TouchableOpacity
              style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}
              activeOpacity={1}
              onPress={()=> setIsAddDialogVisible(false)}>
              <View onStartShouldSetResponder={() => true} style={{ width: 300, padding: 20, backgroundColor: 'white', borderRadius: 10, elevation: 5 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}>Créer une tâche</Text>
                <Text style={{ marginVertical: 10 }}>Choisi un nom pour la nouvelle tâche</Text>
                <TextInput
                  style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 10 }}
                  onChangeText={setInputValue}
                  value={inputValue}
                />
                <Button title="Créer" onPress={addTodo} disabled={inputValue.trim().length === 0} />
              </View>
            </TouchableOpacity>
          </Modal>
        </View>
        </SafeAreaView>   
      </SafeAreaProvider>
    </>
  );
}