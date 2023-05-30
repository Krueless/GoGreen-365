import { Outlet, Link } from "react-router-dom";
import '../style.css'
import logo1 from "./images/logo1.jpeg"

const Layout = () => {
  return (
    <>
      <nav className="navBar" >
      <img className='navBarLogo' src = {logo1}/>
        <h1 className='navBarTitle'>GoGreen 365</h1>
        

        <ul className="horizontalNav" style={{ fontFamily: "Magilio" }}>
          <li>
            <Link to="/home">Home</Link>
          </li>
          <li>
            <Link to="/getstarted">Get started</Link>
          </li>
          <li>
            <Link to="/">Activities</Link>
          </li>
          <li>
            <Link to="/donate">Donate</Link>
          </li>
          <li>
            <Link to="/profile">Profile</Link>
          </li>
          <li>
            <Link to="/contact">Contact Us</Link>
          </li>

        </ul>
      </nav>

      <Outlet />
    </>
  )
};

export default Layout;