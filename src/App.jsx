import { BrowserRouter, Route, Routes } from "react-router-dom";
import Instapay from "./pages/Instapay";
import Homepage from "./pages/Homepage";
import LoginPage from "./pages/LoginPage";
import { Toaster } from "react-hot-toast";

export default function App() {
  return (
    <div className="w-full h-dvh overflow-auto flex justify-center bg-gray-900 text-white">
      <Toaster/>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />}/>
          <Route path="/insta" element={<Instapay />} />
          <Route path="/login" element={<LoginPage />}/>
           <Route path="/login"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
