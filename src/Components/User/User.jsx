import React, {useState, useEffect, useRef} from 'react';
import './User.css'
import { Link } from 'react-router-dom';
function App() {
  const [state, setState] = useState(false)
  const showDropdown=()=>{
    setState(true);
  } 
   

  return (
    <div className="dropdown">
        <div className="dropdown_menu" onClick={showDropdown} >
          {/* <img src="../Images/images (1).png"></img> */}
        <i className="fa-solid fa-user"></i>
        {/* <img src="images (1).png"></img> */}
        {state ?(<ul className='dropdown_list' onClick={showDropdown}>
              <li>Profile</li>
              <Link to="/signin" style={{textDecoration: 'none'}}>
              <li>Log out</li>
              </Link>  
           </ul>): null}
           
        </div>
    </div>
        
  )
}



export default App;