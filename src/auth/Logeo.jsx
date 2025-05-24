import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import useSocketStore from "../store/useSocketStore";
// import { Main } from "../arquitectura/Main";

export const Logeo = () => {
      const {connectSocket, disconnectSocket} = useSocketStore()
    const [formData, setFormData ] =  useState({
        email:"",
        password: ""
    });


    const navigate = useNavigate();
    async function info(parametro){
        
        
        parametro.preventDefault()
        
        const payload =  await fetch("http://localhost:3000/api/v1/auth/login",
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
   <main className="grid grid-cols-2 h-screen"> 
       
          <div className="pt-20">
            <div className="h-full flex flex-col text-center">
                  <div className="mb-20">
                <h1 className="font-bold text-6xl">Login</h1>
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
                    <button className="border pl-5 pr-5 pt-1 pb-1 rounded hover:bg-slate-400 hover:border-none">Ingresar</button>
                </form>
            </div>
            </div>
          </div>
              <div className="pt-20">
            <div className="h-full flex flex-col text-center">
                  <div className="mb-20">
                <h1 className="font-bold text-6xl">Register</h1>
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
                    onChange={handleChange}  placeholder="Ingresa tu correo " />
                    <input
                    className="min-w-[40%] pl-2 pr-2 pt-1 pb-1 rounded-sm outline-none"
                    name="password"
                    onChange={handleChange}
                    value={formData.password} type="text" 
                    placeholder="Ingresa tu contraseña"/>
                      <input
                    className="min-w-[40%] pl-2 pr-2 pt-1 pb-1 rounded outline-none"
                    name="password"
                    onChange={handleChange}
                    value={formData.password} type="text" 
                    placeholder="Ingresa tu nombre"/>
                    <button className="border pl-5 pr-5 pt-1 pb-1 rounded hover:bg-slate-400 hover:border-none">Ingresar</button>
                </form>
            </div>
            </div>
          </div>
       
    </main>
  )
}
