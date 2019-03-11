import React from 'react';
import { Link } from 'react-router-dom';

// import logo from '../logo.png';
import note from '../img/file.svg';
import pencil from '../img/pencil.svg';

class Navigation extends React.Component {
    render() {
        return (
            <div className="side-nav">
                <ul>
                    <li><Link to=""><img src={note} alt="note icon" />Notes</Link></li>
                    <li><Link to="/create-note"><img src={pencil} alt="pencil icon" />Create Note</Link></li>
                </ul>
            </div>
        )
    }
}

export default Navigation;