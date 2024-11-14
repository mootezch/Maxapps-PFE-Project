import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import SideBar from './components/Sidebar';
import Login from './pages/Login/Login';
import './App.css';
import Dashboard from './pages/dashboard/dashboard';
import { Toaster } from 'react-hot-toast';
import Users from './pages/Users/users';
import Projects from './pages/Project/projet';
import Ticket from './pages/ticket/ticket';
import ConvTicket from './pages/ticket/ConvTicket';
import Profile from './pages/profile';
import Member from './components/stats/member';

const ProtectedRoute = ({ isAuthenticated, redirectPath = '/login', children }) => {
  if (!isAuthenticated) {
    return <Navigate to={redirectPath} replace />;
  }
  return children ? children : <Outlet />;
};

function createData(id, projectName, clientName, description, date, status, ticketType) {
  return { id, projectName, clientName, description, date, status, ticketType };
}

function App() {
  const { state, logout } = useAuth();
  let { isAuthenticated } = state;

  const [tickets, setTickets] = useState([
    createData(1, "Project A", "Client X", "Description for Ticket 1", "2 March 2022", "New", "Type A"),
    createData(2, "Project B", "Client Y", "Description for Ticket 2", "2 March 2022", "Open", "Type B"),
    createData(3, "Project C", "Client Z", "Description for Ticket 3", "2 March 2022", "Answered", "Type C"),
    createData(4, "Project D", "Client W", "Description for Ticket 4", "2 March 2022", "New", "Type D"),
  ]);

  const handleUpdateTicketStatus = (id, newStatus) => {
    setTickets(tickets.map(t => t.id === id ? { ...t, status: newStatus } : t));
  };

  return (
    <Router>
      <SideBar logout={logout}>
        <Toaster />
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/users" element={<Users />} />
            <Route path="/projet" element={<Projects />} />
            <Route path="/projects" element={<Projects />} />

            <Route path="/ticket" element={<Ticket tickets={tickets} setTickets={setTickets} />} />
            <Route
              path="/ticket/:idTicket"
              element={<ConvTicket  />}
            />
            <Route path="/profile" element={<Profile />} />
            <Route path="/member" element={<Member />} />
          </Route>
          <Route path="*" element={<p>There's nothing here: 404!</p>} />
        </Routes>
      </SideBar>
    </Router>
  );
}

export default App;
