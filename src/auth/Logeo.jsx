import { forwardRef, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import useSocketStore from "../store/useSocketStore";
// import { Main } from "../arquitectura/Main";

export const Logeo = ({ registerFunt}) => {
      const registerRef = useRef(null)
      const {connectSocket, disconnectSocket} = useSocketStore()
    const [formData, setFormData ] =  useState({
        email:"",
        password: ""
    });
  const showRegister = () =>{
        registerRef.current.classList.remove("pointer-events-none", "opacity-50")
        loginRef.current.classList.add("pointer-events-none", "opacity-50")
    }

    const navigate = useNavigate();
    async function info(parametro){
        
        
        parametro.preventDefault()
        
        const payload =  await fetch("https://chatopcional-1.onrender.com/api/v1/auth/login",
            {
                method: "POST",
        headers:{
            'content-type': 'application/json',
            credentials:'include' 
        }
                ,
                body: JSON.stringify(formData) 
            }
        )
        const respuesta =await  payload.json()
        if (respuesta.ok) {
            console.log(respuesta.token)   
            localStorage.setItem("token", respuesta.token) 
            
            localStorage.setItem("email", respuesta.email) 
            navigate("/pagina")
        }
        console.log(respuesta.token)
        localStorage.setItem("token", respuesta.token) 
        localStorage.setItem("email", respuesta.email) 
        navigate("/pagina")
        connectSocket()
        
    }
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
        
    }
 function enviar(){
    
 }
  return (
      
          <div  className="">

            <div className="h-full flex flex-col text-center">
                  <div className="mb-20">
                <h1 className="font-bold text-6xl">Inicia Sesion</h1>
            </div>
            <div className="">
                <form
                onSubmit={info} 
                className="flex flex-col items-center gap-5">
                    <input
                    className="min-w-[40%] pl-2 pr-2 pt-1 pb-1 rounded-sm outline-none"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}  placeholder="Nombre" />
                    <input
                    className="min-w-[40%] pl-2 pr-2 pt-1 pb-1 rounded-sm outline-none"
                    name="password"
                    onChange={handleChange}
                    value={formData.password} type="text" 
                    placeholder="Password"/>
                    <button className="border pl-5 pr-5 pt-1 pb-1 rounded hover:bg-slate-400 hover:border-transparent">Ingresar</button>
                </form>
            </div>
            </div>
           <div  className="flex justify-end">
                        <button className="font-sans hover:text-gray-700 border-b hover:border-b-gray-700" onClick={registerFunt}>Registrate</button>
            </div>
          </div>
   
  )
}
