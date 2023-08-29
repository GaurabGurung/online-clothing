import { ReactComponent as CrwnLogo} from '../../assests/crown.svg'
import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';
import { Link, Outlet } from 'react-router-dom';
import './navigation.styles.scss';
import { Fragment, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import { signOutUser } from '../../utils/firebase/firebase.utils';
import { CartContext } from '../../contexts/cart.context';
const Navigation = () => {

    const {currentUser } = useContext (UserContext);
    const { isCartOpen} =useContext(CartContext)
    return (
        <Fragment>
          <div className="navigation">
            <Link className="link-container" to='/'>
              <CrwnLogo className="logo-container"/>         
            </Link>
  
            <div className="nav-links-container">
              <Link className="nav-link" to='/shop'>
                SHOP
              </Link>
  
              {currentUser ? (
                <span className="nav-link" onClick={signOutUser}> SIGN OUT </span>
              ) : (
                <Link className="nav-link" to='/auth'>
                SIGN IN
              </Link>
              )}
            <CartIcon />
            </div>
            {isCartOpen && <CartDropdown />}
          </div>
          <Outlet/>
        </Fragment>
      )
    }
  

export default Navigation;
