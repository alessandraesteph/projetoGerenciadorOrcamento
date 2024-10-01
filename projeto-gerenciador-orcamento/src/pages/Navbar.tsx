import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importando o arquivo CSS

const Navbar: React.FC = () => {
    return (
        <nav className="navbar">
            <Link to="/home">Home</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/sobre">Sobre</Link>
            <Link to="/login">Login</Link>
        </nav>
    );
};

export default Navbar;
