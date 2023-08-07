import {s} from './Header.style.js'
import { Text,Image } from 'react-native';
import headerLogo from '../../assets/logo.png'

export default function Header() {
  return (
    <>
        <Image style={s.img} source={headerLogo} resizeMode="contain"/>
        <Text style={s.subtitle}>Tu as probablement un truc à faire</Text>         
    </>
 
  )
}
