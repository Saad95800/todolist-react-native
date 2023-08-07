import {TouchableOpacity, Image, Text} from 'react-native'
import checkImg from '../../assets/check.png'
import { s } from './CardTodo.style'

export default function CardTodo({todo, onPress}) {
    return (
        <TouchableOpacity style={s.card} onPress={() => {onPress()}}>
            <Text style={[
                s.txt,
                todo.isCompleted && {textDecorationLine: "line-through"}
            ]}>
                {todo.title}
            </Text>
            {todo.isCompleted && <Image style={s.img} source={checkImg}/>}
        </TouchableOpacity>
    )
}