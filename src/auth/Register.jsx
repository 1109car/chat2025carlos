import { forwardRef, useEffect, useRef, useState } from "react"
import { useNavigate } from "react-router-dom";
import useSocketStore from "../store/useSocketStore";
// import { Main } from "../arquitectura/Main";

export const Register =forwardRef(({ loginFunt }, ref) => {
   const loginRef = useRef(null)
      const {connectSocket, disconnectSocket} = useSocketStore()
      const [loading, setLoading] = useState(false);
    const [formData, setFormData ] =  useState({
        name:"",
        email:"",
        password: ""
    });


    const navigate = useNavigate();
    async function info(parametro){
        setLoading(true)
        
        parametro.preventDefault()
        
        const payload =  await fetch("http://localhost:3000/api/v1/auth/register",
            {
                method: "POST",
                headers:{
                    'content-type': 'application/json',
                }
                ,
                body: JSON.stringify(formData) ,
                 //credentials:'include' 
            }
        )
        const respuesta =await  payload.json()
        if (respuesta.ok) {
            console.log(respuesta.token,"token")   
            localStorage.setItem("token", respuesta.token) 
            
            localStorage.setItem("email", respuesta.email) 
            navigate("/")
        }
        console.log(respuesta.token)
        localStorage.setItem("token", respuesta.token) 
        localStorage.setItem("email", respuesta.email) 
        navigate("/")
       
        connectSocket()
         setTimeout(() => {
    window.location.reload(); // 👈 recarga la página después de 2 segundos
      
  }, 3000);
    }
    function handleChange(event) {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value
        });
     
    }
console.log(formData)
  return (
  
       
          <div  >
           
            <div className="h-full flex flex-col text-center">
                  <div className="mb-20">
                <h1 className="font-bold text-6xl">Registrate</h1>
            </div>
            <div className="">
                <form
                onSubmit={info} 
                className="flex flex-col items-center gap-5">
                    <input
                    className=" pl-2 pr-2 pt-1 pb-1 rounded-[7px] outline-none"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}  placeholder="Nombre..." />
                     <input
                    className=" pl-2 pr-2 pt-1 pb-1 rounded-[7px] outline-none"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}  placeholder="Gmail..." />
                    <input
                    className=" pl-2 pr-2 pt-1 pb-1 rounded-[7px] outline-none"
                    name="password"
                    onChange={handleChange}
                    value={formData.password} type="text" 
                    placeholder="Password..."/>
                    <button className="border pl-5 pr-5 pt-1 pb-1 rounded hover:bg-slate-400 hover:border-transparent">Ingresar</button>
                </form>
            </div>
            </div>
   <div ref={ref} className="w-auto flex justify-end">
                        <button className="font-sans hover:text-gray-700 border-b hover:border-b-gray-700" onClick={loginFunt}>Inicia Sesion</button><br />
                 
            </div>
                  <div>
                         {loading && (
 <div>
     <p className="text-blue-500 text-center font-semibold">Cargando...</p>
  <p className="text-white text-center font-semibold">Cuando cargue por favor logearse con normalidad..</p>
 </div>
)}
                       </div>
          </div>
   
  )})