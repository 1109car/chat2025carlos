import React, { useEffect, useState } from 'react'
import useSocketStore, { useFileStore } from '../store/useSocketStore'

type data = {
    email:string
}
type info = {
  name:string
}

export const Friends = () => {
    const {onEvent, emitEvent } = useSocketStore();
    const [dataFriends, setDataFriends] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [isFocused, setIsFocused] = useState(false);
    const {connectSocket,disconnectSocket} = useSocketStore();
    const [click,setClick] = useState("")
    // const [amigos, setAmigos] = useState<{ name: string }[]>([]);
      // const [amigos, setAmigos] = useState([])
    // const [amigos, setAmigos] = useState<string[]>();
    // const [amigos, setAmigos] = useState<string[]>([]);
    const [amigos, setAmigos] = useState<string[]>([]);
     const setSelectedFile = useFileStore((state) => state.setSelectedFile);




    useEffect(()=>{
      connectSocket();
     
        return () => {
          disconnectSocket();
        };    
        },[connectSocket,click])


    useEffect(() => {
      onEvent('usuarios', async(data) => {  
        await setDataFriends(data)
  })
  onEvent('amigos_mostrar', async(data) => {
    console.log(data.name)
      setAmigos(prev => [...prev, data.name]);
  
   
  })

           emitEvent('get_usuarios')
           emitEvent('amigos_register') 
  
    },[])
function nameFriend(e,email ){
  e.preventDefault()
  console.log(email )
  emitEvent('get_usuarios', {
    friendiid: email,
  })
  // setAmigos(prev => prev.includes(email) ? prev : [...prev, email]);
       setAmigos(prev => [...prev, email]);
}
function nameenvio(e,data){
  e.preventDefault()
  console.log(data)
  emitEvent('mensajeUser',{
    userDos: data,
  })

}
        const filteredNames = dataFriends.filter((name:data) =>
            name.email.toLowerCase().includes(searchTerm.toLowerCase())
          );
          function salir(){
               localStorage.removeItem("email");
               localStorage.removeItem("token");


          }
  return (
    <div className='pt-10 border flex flex-col p-6 gap-3'>
        <div>
            <input type="text" placeholder='Buscar...'
            value={searchTerm}
            onChange={(e)=>{setSearchTerm(e.target.value)}}
            onFocus={()=> {setIsFocused(true)}}
            onBlur={()=>{setIsFocused(false)}}
            
            />      
       {isFocused && filteredNames.length > 0 &&(
        <ul className="z-10 bg-black border w-full mt-1 rounded shadow">
          {filteredNames.map((name:data) => (
            <li 
              key={name.email}
              className="p-2 hover:bg-slate-800 cursor-pointer"
              onMouseDown={(e) => {setSearchTerm(name.email);nameFriend(e,name.email)}} // Evita que el blur se dispare antes de hacer clic
              
              //  onSubmit={(e) => {setClick((e.target as HTMLLIElement).innerText);console.log(name.email)}}
             
            >
              {name.email}
            </li>
          ))}
        </ul>
      )}
      </div>
        <div>
      <ul>
        {amigos.map((email:string)=>(
          <li key={email} onMouseDown={(e)=>{nameenvio(e,email);setSelectedFile(email)}}>{email}</li>
        ))}
        </ul>    
        </div>
        <div>
          <a href="/" onClick={salir}>salir</a> 
        </div>
        </div>
  )
}
