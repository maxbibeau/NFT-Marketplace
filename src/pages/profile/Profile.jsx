import React,{ useState } from 'react';
import './profile.css'
import profile_banner from '../../assets/profile_banner.png'
import profile_pic from '../../assets/profile.jpg'
import MarketplaceJSON from '../../Marketplace.json'
import axios from 'axios'
import { quais } from 'quais'
import NFTTile from '../nftTile/NFTTile'

const Profile = () => {
	const [data, updateData] = useState([])
	const [address, updateAddress] = useState('0x')
	const [dataFetched, updateFetched] = useState(false)

  async function getNFTData() {
		//After adding your Hardhat network to your metamask, this code will get providers and signers
		const provider = new quais.providers.Web3Provider(window.ethereum)
		const signer = provider.getSigner()
		const addr = await signer.getAddress()
    
		updateAddress(addr)

		//Pull the deployed contract instance
		let contract = new quais.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)

		//create an NFT Token
		let transaction = await contract.getMyNFTs()

		/*
		 * Below function takes the metadata from tokenURI and the data returned by getMyNFTs() contract function
		 * and creates an object of information that is to be displayed
		 */

		const items = await Promise.all(
			transaction.map(async (i) => {
				const tokenURI = await contract.tokenURI(i.tokenId)
				let meta = await axios.get(tokenURI)
				meta = meta.data

				let price = quais.utils.formatUnits(i.price.toString(), 'ether')
				let item = {
					price,
					tokenId: i.tokenId.toNumber(),
					seller: i.seller,
					owner: i.owner,
					image: meta.image,
					name: meta.name,
					description: meta.description,
				}
				return item
			})
		)

		updateData(items)
		updateFetched(true)
	}

  if (!dataFetched) getNFTData()

  return (
    <div className='profile section__padding'>
      <div className="profile-top">
        <div className="profile-banner">
          <img src={profile_banner} alt="banner" />
        </div>
        <div className="profile-pic">
            <img src={profile_pic} alt="profile" />
            <h3>{address}</h3>
        </div>
      </div>
      <div className="profile-bottom">
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>Your NFT's</h1>
        </div>
        <div className="bids-container-card">
        {
        data.map((value, index) => {
          return (
              <NFTTile 
                data={value} 
                key={index}>
              </NFTTile>
            )
					})
        }  
        </div>
      </div>
    </div>
    </div>
  );
};

export default Profile;
