import Image from "next/image" 
 
const Logo = () => {
  return (
    <Image src='/logo.png' alt='logo' height={30}  width={205}   />
  )
}

export default Logo