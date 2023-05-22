import Image from "next/image" 
import logo from '../public/logo.png';
const Logo = () => {
  return (
    <Image src='/logo.png' alt='logo' height='64' width='64' />
  )
}

export default Logo