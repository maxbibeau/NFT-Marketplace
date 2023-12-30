import React, { useEffect, useState }  from 'react'
import './navbar.css'
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import logo from '../../assets/logo.png'
import {  Link } from "react-router-dom";
import { getAccounts, requestAccounts } from '../../utils/usePelagus'

const Menu = () => (
  <>
     <Link to="/profile"><p>Profile</p> </Link>
     <Link to="/create"><p>Create</p> </Link>
    
  </>
 )

 const Navbar = () => {
  const [toggleMenu,setToggleMenu] = useState(false)
  const [user,setUser] = useState(false)
	const [walletAddress, updateAddress] = useState({})
  const cyprus2Zone = "zone-0-1"

  const handleLogout = () => {
    setUser(false);
  }
  const handleLogin = () => {
    setUser(true);
  }

  useEffect(() => {
		if (window.ethereum !== undefined) {
			getAccounts().then((account) => {
				if (account !== undefined) {
          if(account.shard !== cyprus2Zone) {
        
            setUser(false)
            alert('Please use Cyprus2 wallet')
          }
          else
          {
            updateAddress(account)
            setUser(true)
          }
				}
			})
		} else {
			console.log('Window.ethereum is undefined')
			return
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	// function that executes when the connect button is clicked
	// sends a request for accounts to the wallet
	// if user accepts, account is set in state, connected is set to true
	// if user denies, nothing happens on the user side and no error is printed to the console
	async function connectWallet() {
		await requestAccounts().then((account) => {
			if (account !== undefined) {
        if(account.shard !== cyprus2Zone) {
          setUser(false)
          alert('Please use Cyprus-2 wallet')
        }
        else
        {
          updateAddress(account)
          setUser(true)
          window.location.replace('/')
        }
			}
		})
	}

  return (
    <div className='navbar'>
      <div className="navbar-links">
        <div className="navbar-links_logo">
          <img src={logo} alt="logo" />
          <Link to="/"> 
            <h2>| MarginEX</h2>
          </Link>
        </div>
        <div className="navbar-links_container">
         <Menu />
         {user && <Link to="/"><p onClick={handleLogout}>Logout</p></Link> }
        
        </div>
      </div>

      <div className="navbar-sign">
      {user ? (
        <>
        <p>{walletAddress.addr}</p>
        <p>{walletAddress.shard}</p>
        <button type='button' className='secondary-btn'>Connected</button>
        </>
      ): (
        <>
        <button type='button' className='primary-btn' onClick={connectWallet} >Connect</button>
        </>
      )}
      </div>

      <div className="navbar-menu">
        {toggleMenu ? 
        <RiCloseLine  color="#fff" size={27} onClick={() => setToggleMenu(false)} /> 
        : <RiMenu3Line color="#fff" size={27} onClick={() => setToggleMenu(true)} />}
        {toggleMenu && (
          <div className="navbar-menu_container scale-up-center" >
            <div className="navbar-menu_container-links">
             <Menu />
            </div>
            <div className="navbar-menu_container-links-sign">
            {user ? (
              <>
              <button type='button' className='secondary-btn'>Connected</button>
              </>
            ): (
              <>
              <button type='button' className='primary-btn' onClick={connectWallet} >Connect</button>
              </>
            )}
           
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Navbar
