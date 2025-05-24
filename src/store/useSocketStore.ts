import { create } from "zustand";
import { Socket, io } from "socket.io-client";



interface SocketStore {
  socket: Socket | null;
  connectSocket: () => void;
  disconnectSocket: () => void;
  waitForConnection: () => Promise<void>;       // ← Nuevo
  emitEvent: (eventName: string, data?: any) => Promise<void>; // ahora devuelve Promise
  onEvent: (eventName: string, callback: (data: any) => void) => void;
}
const SOCKET_URL = "https://chatopcional.onrender.com";
    
    const useSocketStore = create<SocketStore>((set, get) => {
      return {
        socket: null,
    
        connectSocket: () => {
          if (get().socket) return;
          const socket = io(SOCKET_URL, { transports: ["websocket"],auth: { token: localStorage.getItem("token") } });
          set({ socket });
        },
    
        disconnectSocket: () => {
          const { socket } = get();
          if (socket) {
            socket.disconnect();
            set({ socket: null });
          }
        },
    
        // Espera al evento 'connect'
        waitForConnection: () => {
          const { socket } = get();
          if (!socket) {
            return Promise.reject(new Error("Socket no inicializado"));
          }
          if (socket.connected) {
            return Promise.resolve();
          }
          return new Promise<void>(resolve => {
            socket.once("connect", () => resolve());
          });
        },
    
        // Ahora emite solo cuando waitForConnection resuelva
        emitEvent: async (eventName, data) => {
          try {
            await get().waitForConnection();
            get().socket!.emit(eventName, data);
          } catch (err) {
            console.error("🔴 Error emitiendo evento:", err);
          }
        },
    
        onEvent: (eventName, callback) => {
          const { socket } = get();
          if (socket) {
            socket.on(eventName, callback);
          } else {
            console.error("El socket no está inicializado");
          }
        },
      };
    });

   export const useFileStore = create((set) => ({
  selectedFile: null,
  setSelectedFile: (fileName) => set({ selectedFile: fileName }),
}));
    
      export default useSocketStore;