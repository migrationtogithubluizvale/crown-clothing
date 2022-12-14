import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { auth } from '../../firebase/firebase.utils';
import CartIcont from '../cart-icon/cart-icon.component'
import { ReactComponent as Logo } from '../../assets/crown.svg';
import CartDropdown from '../cart-dropdown/cart-dropdown.component'

import './header-styles.scss';

const Header = ({ currentUser, hidden }) => {
     return (
     <div class='header'>
            <Link className='logo-container' to='/' > 
                <Logo className='logo' />
            </Link>
        <div class='options'>
            <Link className='option' to='/shop' >
                SHOP
            </Link>
            <Link className='option' to='/shop' >
                CONTACT
            </Link>
            {
                currentUser ?
                <div className='option' onClick={() => auth.signOut()}> SIGN OUT </div>
                :
                <Link className='option' to='/signin'>SIGN IN</Link>
            }
            <CartIcont />
        </div>
        {hidden ? null : <CartDropdown />}
    </div>
     )
}
const mapStateToProps = ({ user: { currentUser }, cart: { hidden } }) => ({
    currentUser,
    hidden
  });
export default connect(mapStateToProps)(Header);