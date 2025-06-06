import React, { useEffect, useRef, useState } from 'react'
import useSocketStore, { useFileStore } from '../store/useSocketStore';

type ev = {
  user: string,
  content: string,
  room?: number,
  email:string
}

export const Chat = () => {
  const { onEvent, emitEvent } = useSocketStore();
  const [messages, setMessages] = useState<ev[]>([]);
  const [room, setRoom] = useState<number | null>(null);
  const [content, setContent] = useState('')
  const [nombre,setNombre] = useState('');
      const selectedFile = useFileStore((state:any) => state.selectedFile);
      const messagesEndRef = useRef<HTMLDivElement | null>(null);

      // const bottomRef = useRef(null);
  
      useEffect(() => {
     
    onEvent('mostrarMensaje', (data) => {
      if (Array.isArray(data) && data.length > 0) {
        
        setMessages(data);
      
      }
    });

    onEvent('mensajeNuevo', (nuevoMensaje) => {
       let otr = messages.some(m => m.room === 4);
       console.log(otr)
       console.log(nuevoMensaje.room)
     
         setMessages(prev => [...prev, nuevoMensaje]);
  
      
    });
    emitEvent('serverRoom')
     emitEvent('mensajeUser')
    onEvent('serverRoom', (data)=>{
setRoom(data)

})

  }, []);
  useEffect(()=>{
     setMessages([]);
   setRoom(null);
  
  },[selectedFile])

  function mensajeENviado(e: React.FormEvent) {
    e.preventDefault();
    setContent('');
     console.log(room)
   
        emitEvent('mensajon', { room: room, message: content,select:selectedFile });
        

      
    // }
      
   
  }
  useEffect(() => {
  messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
}, [messages]);


  return (
    <>
    {selectedFile ? ( <div className='grid grid-rows-[1fr_10fr_1fr] gap-4'>
     
      <div className='bg-slate-600 p-3 rounded '><h3 className='font-bold text-xl'>{selectedFile}</h3></div>
      
     <div className=''>
       <div className=' overflow-y-auto h-[33rem]' >
        {messages.filter((ev) => ev.room === room).map((ev, index) => 
         
        {
          let getEmail =  localStorage.getItem("email")

          const isCurrentUser = ev.email === getEmail;
  
    
        return(
          <div 
          key={index}
          className={`flex w-full mb-2 ${isCurrentUser ? 'justify-start' : 'justify-end'}`}
        >
          <div  className={` max-w-[75%] p-2 rounded-xl ${isCurrentUser ? 'ml-4 bg-emerald-800 text-white' : 'mr-4 bg-gray-200 text-black'}`}>
            <span className='font-bold'>{ev.user}:</span> <br />
            <span className='break-words'>{ev.content}</span>
          </div>
        </div>  
          
        )})}
       <div ref={messagesEndRef} />
      </div>
     </div>

      <div className=' flex items-center '>
        <form className='w-full flex gap-2' onSubmit={mensajeENviado}>
          <input
            className='w-[90%] border focus:outline-none focus:ring-0 p-2 rounded'
            type="text"
            placeholder='Escribe un mensaje'
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <button className='hover:bg-white h-auto m-auto p-1 rounded hover:text-black' type="submit">Enviar</button>
        </form>
      </div>
    </div>):<div className='grid grid-rows-[1fr_10fr_1fr] gap-4 p-10'>
       <span className='font-bold text-2xl'> No hay usuario selecionado</span>
      </div>}
 
    </>
  
  )
}
