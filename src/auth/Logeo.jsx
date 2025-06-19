import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSocketStore from "../store/useSocketStore";

export const Logeo = ({ registerFunt }) => {
  const registerRef = useRef(null);
  const { connectSocket, waitForConnection } = useSocketStore(); // ✅ también usamos waitForConnection
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();

  async function info(e) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const response = await fetch("https://chatopcional-1.onrender.com/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        if (response.status === 401) {
          setErrorMsg("Correo o contraseña incorrectos.");
        } else {
          setErrorMsg(`Error al conectar. Código: ${response.status}`);
        }
        return;
      }

      const data = await response.json();
      console.log("Respuesta del backend:", data);

      if (data.token) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("email", data.email);

        connectSocket();
        await waitForConnection(); // ✅ espera a que el socket esté conectado

        navigate("/pagina");
      } else {
        setErrorMsg("Respuesta inesperada del servidor.");
      }

    } catch (error) {
      console.error("Login error:", error);
      setErrorMsg("No se pudo conectar al servidor. Intenta nuevamente.");
    } finally {
      setLoading(false); // ✅ se ejecuta siempre
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
  }

  return (
    <div className="">
      <div className="h-full flex flex-col text-center">
        <div className="mb-20">
          <h1 className="font-bold text-6xl">Inicia Sesión</h1>
        </div>
        <div className="">
          <form
            onSubmit={info}
            className="flex flex-col items-center gap-5"
          >
            <input
              className="min-w-[40%] pl-2 pr-2 pt-1 pb-1 rounded-sm outline-none"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Correo"
              required
            />
            <input
              className="min-w-[40%] pl-2 pr-2 pt-1 pb-1 rounded-sm outline-none"
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Contraseña"
              required
            />
            <button
              className="border pl-5 pr-5 pt-1 pb-1 rounded hover:bg-slate-400 hover:border-transparent disabled:opacity-50"
              disabled={loading}
            >
              {loading ? "Ingresando..." : "Ingresar"}
            </button>
          </form>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          className="font-sans hover:text-gray-700 border-b hover:border-b-gray-700"
          onClick={registerFunt}
        >
          Regístrate
        </button>
      </div>

      {loading && (
        <p className="text-blue-500 text-center font-semibold">Cargando...</p>
      )}

      {errorMsg && (
        <p className="text-red-500 text-center mt-4">{errorMsg}</p>
      )}
    </div>
  );
};
