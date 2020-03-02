import React from 'react';
import './Header.css';

class Header extends React.Component {
    render() {
        return (
            <header className="page-header">
                <div className="logo">
                    <h1><a href="./" title = "main">Star<br></br>Wars</a></h1>
                </div>

                <div className="top-menu">
                    <nav>
                        <ul>
                            <li><a href="./">People</a></li>
                            <li><a href="./">Planets</a></li>
                            <li><a href="./">Starships</a></li>
                        </ul>
                    </nav>
                </div>
            </header>
        );
    }
}

export default Header;