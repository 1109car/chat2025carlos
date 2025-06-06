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
     const setSelectedFile = useFileStore((state:any) => state.setSelectedFile);




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
    console.log(data)
       setAmigos(prev => [...prev, data.name]);
  
      
   
  })

           emitEvent('get_usuarios')
           emitEvent('amigos_register') 
  
    },[])
async function nameFriend(e,email ){
  e.preventDefault()
  console.log(email )
 await emitEvent('get_usuarios', 
     email,
  )
  

  await setAmigos(prev => prev.includes(email) ? prev : [...prev, email]);
    await setIsFocused(false)
    await  setSearchTerm('');
}
function nameenvio(e,data){
  e.preventDefault()
  console.log(data)
  emitEvent('mensajeUser',
    data,
  )

}
        const filteredNames = dataFriends.filter((name:data) =>
            name.email.toLowerCase().includes(searchTerm.toLowerCase())
          );
          function salir(){
               localStorage.removeItem("email");
               localStorage.removeItem("token");


          }
       filteredNames.filter(rev=>rev <=3 )
  return (
    <div className='flex justify-between flex-col p-3 '>
    <div className='pt-10 flex flex-col p-6 gap-3'>
        <div>
            <input type="text" placeholder='Buscar...'
            className='focus:outline-none focus:ring-0'
            value={searchTerm}
            onChange={async(e)=>{await setSearchTerm(e.target.value);}}
            onFocus={()=> {setIsFocused(true)}}
          
            onBlur={()=>{setIsFocused(false)}}
            
            />      
       {isFocused && filteredNames.length > 0  &&(
        <ul className="z-10 bg-black mt-1 rounded shadow absolute w-[11rem] transition duration-300">
          {filteredNames.slice(0, 3).map((name:data) => (
            <li 
              key={`${name.email}`}
              className="p-2 hover:bg-slate-900 cursor-pointer bg-slate-800 "
              onMouseDown={(e) => {setSearchTerm(name.email);nameFriend(e,name.email)}} // Evita que el blur se dispare antes de hacer clic
              
              //  onSubmit={(e) => {setClick((e.target as HTMLLIElement).innerText);console.log(name.email)}}
             
            >
              {name.email}
            </li>
          ))}
        </ul>
      )}
      </div>
      {/* //............................................. */}
        <div>
      <ul>
        {amigos.map((email:string)=>(
          <li className='hover:bg-slate-400 hover:cursor-pointer p-2 mt-2 rounded' key={email} onMouseDown={(e)=>{nameenvio(e,email);setSelectedFile(email)}}>{email}</li>
        ))}
        </ul>    
        </div>
        </div>
        <div >
          <a href="/" className='border text-xl pl-5 pr-5 hover:bg-transparent hover:bg-slate-400 hover:cursor-pointer'  onClick={salir}>salir</a> 
        </div>
        </div>
  )
}
