import React, { useEffect, useState } from 'react'
import { Chat } from '../layouts/Chat'
import { Friends } from '../layouts/Friends'
import useSocketStore from '../store/useSocketStore'
import { InfoUser } from '../layouts/InfoUser'

export const Global = () => {

    const [isConnected, setIsConnected] = useState(true)
    const {connectSocket, disconnectSocket } = useSocketStore();
    const {onEvent, emitEvent } = useSocketStore();
    const [data, setData] = useState(null);

    useEffect(()=>{
 
      connectSocket();
   
      onEvent('connect', () => {
        setIsConnected(true);
      })
      onEvent('disconnect', () => {
        setIsConnected(false);
      })

      return () => {
        disconnectSocket();
      
      };
    },[connectSocket, disconnectSocket])
    
    
    return (
      <div>
      { isConnected?
                <main className='h-screen grid grid-cols-[1fr_3fr_1fr] '>
                    <Friends></Friends>
                    <Chat></Chat>
                    <InfoUser></InfoUser>
                </main>
                    :
                    <div>
                    <h2 className='text-2xl'>La informacion esta cargando espere un momento...</h2> 
                    <span>en caso demore mas de 1 minutos por favor recargue la pagina o intentelo mas tarde</span>
                    <div className='w-full'><img className='w-full h-full' src={'../assets/image/sinconexion.avif'} alt="sin Conexion" /></div> 
                </div>
              }
          <div>
              
            </div>    
    </div>
  )
}
//  setTimeout(() => {

//   setIsConnected(false);
// }, 10000);
