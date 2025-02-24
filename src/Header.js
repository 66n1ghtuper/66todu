import React, { useState, useRef, useEffect } from 'react';
import './Header.css';

const Header = ({ onFilterChange }) => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const menuRef = useRef(null);
    const toggleMenu = () => {
        setIsMenuOpen((prevState) => !prevState); 
    };

  
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsMenuOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [menuRef]);


    const handleFilterChange = (filter) => {
        onFilterChange(filter);
        setIsMenuOpen(false); 
    };

    return (
        <header className="header">
            <div className="logo">66todu</div>
            <button className="burger-menu" onClick={toggleMenu}>
                {isMenuOpen ? '✖' : '☰'}
            </button>
            {isMenuOpen && <div className="overlay" onClick={toggleMenu} />} 
            <nav ref={menuRef} className={`menu ${isMenuOpen ? 'open' : ''}`}>
                <ul>
                    <li onClick={() => handleFilterChange('all')}>Общие задачи</li>
                    <li onClick={() => handleFilterChange('completed')}>Выполненные задачи</li>
                    <li onClick={() => handleFilterChange('incomplete')}>Невыполненные задачи</li>
                </ul>
            </nav>
        </header>
    );
};

export default Header;

