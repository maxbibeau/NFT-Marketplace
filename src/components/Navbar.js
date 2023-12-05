import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useLocation } from 'react-router'
import { quais } from 'quais'
import logo from '../images/full_logo.png'
import { getAccounts, requestAccounts } from '../utils/usePelagus'

function Navbar() {
	const [isConnected, setIsConnected] = useState(false)
	const location = useLocation()
	const [currAddress, updateAddress] = useState({})

	// function that executes when the page is loaded
	// checks if the user is already connected to the wallet
	// if user is connected, account is set in state, connected is set to true
	// if user is not connected, nothing happens on the user side and no error is printed to the console
	useEffect(() => {
		if (window.ethereum !== undefined) {
			getAccounts().then((account) => {
				if (account !== undefined) {
					updateAddress(account)
					setIsConnected(true)
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
	async function connectWebsite() {
		await requestAccounts().then((account) => {
			console.log(account)
			if (account !== undefined) {
				updateAddress(account)
				setIsConnected(true)
			}
		})
	}

	return (
		<div className=''>
			<nav className='w-screen'>
				<ul className='flex items-end justify-between py-3 bg-transparent text-white pr-5'>
					<li className='flex items-end ml-5 pb-2'>
						<Link to='/'>
							<img
								src={logo}
								alt=''
								width={120}
								height={120}
								className='inline-block -mt-2'
							/>
							<div className='inline-block font-bold text-xl ml-2'>NFT Marketplace</div>
						</Link>
					</li>
					<li className='w-2/6'>
						<ul className='lg:flex justify-between font-bold mr-10 text-lg'>
							{location.pathname === '/' ? (
								<li className='border-b-2 hover:pb-0 p-2'>
									<Link to='/'>Marketplace</Link>
								</li>
							) : (
								<li className='hover:border-b-2 hover:pb-0 p-2'>
									<Link to='/'>Marketplace</Link>
								</li>
							)}
							{location.pathname === '/sellNFT' ? (
								<li className='border-b-2 hover:pb-0 p-2'>
									<Link to='/sellNFT'>List My NFT</Link>
								</li>
							) : (
								<li className='hover:border-b-2 hover:pb-0 p-2'>
									<Link to='/sellNFT'>List My NFT</Link>
								</li>
							)}
							{location.pathname === '/profile' ? (
								<li className='border-b-2 hover:pb-0 p-2'>
									<Link to='/profile'>Profile</Link>
								</li>
							) : (
								<li className='hover:border-b-2 hover:pb-0 p-2'>
									<Link to='/profile'>Profile</Link>
								</li>
							)}
							<li>
								<button
									className={
										isConnected
											? 'bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded text-sm'
											: 'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded text-sm'
									}
									onClick={connectWebsite}
									disabled={isConnected}
								>
									{isConnected ? 'Connected' : 'Connect Wallet'}
								</button>
							</li>
						</ul>
					</li>
				</ul>
			</nav>
			<div className='text-white text-bold text-right mr-10 text-sm'>
				{currAddress.addr ? 'Connected to' : 'Not Connected. Please login to view NFTs'}{' '}
				{currAddress.addr ? <strong>{currAddress.shard}: </strong> : ''}
				{currAddress.addr ? currAddress.addr.substring(0, 10) + '...' : ''}
			</div>
		</div>
	)
}

export default Navbar
