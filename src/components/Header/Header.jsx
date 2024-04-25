import './Header.css'
import logo from '../../images/Logo.svg'
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../providers/AuthProvider';


const Header = () => {

    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut()
            .then(result => { })
            .catch(error => console.error(error));
    }

    return (
        <nav className="header">
            <img src={logo} alt="" />

            <div>
                <Link to="/">Shop</Link>
                <Link to="/orders">Orders</Link>
                <Link to="/inventory">Inventory</Link>
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign up</Link>
                {
                    user &&
                    <span className='text-white p-5'>
                        Welcome! {user.email} <button onClick={handleLogout} className='btn btn-info'>Sign Out</button>
                    </span>
                }
            </div>
        </nav>
    );
};

export default Header;