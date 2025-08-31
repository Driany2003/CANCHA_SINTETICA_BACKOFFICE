import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/layout/Sidebar';
import Header from './components/layout/Header';
import Dashboard from './pages/Dashboard';
import Reservas from './pages/Reservas';
import NuevaReserva from './pages/NuevaReserva';
import Canchas from './pages/Canchas';
import Reportes from './pages/Reportes';
import Clientes from './pages/Clientes';

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Router>
      <div className="min-h-screen">
        <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
        
        {/* Contenido principal */}
        <div className="lg:pl-72">
          <Header setSidebarOpen={setSidebarOpen} />
          
          {/* Contenido de la página */}
          <main className="p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/reservas" element={<Reservas />} />
              <Route path="/nueva-reserva" element={<NuevaReserva />} />
              <Route path="/canchas" element={<Canchas />} />
              <Route path="/clientes" element={<Clientes />} />
              <Route path="/reportes" element={<Reportes />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
