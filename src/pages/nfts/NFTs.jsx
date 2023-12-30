import React, { useState }  from 'react'
import './nfts.css'
import { AiFillHeart,AiOutlineHeart } from "react-icons/ai";
import bids1 from '../../assets/bids1.png'
import bids2 from '../../assets/bids2.png'
import bids3 from '../../assets/bids3.png'
import bids4 from '../../assets/bids4.png'
import bids5 from '../../assets/bids5.png'
import bids6 from '../../assets/bids6.png'
import bids7 from '../../assets/bids7.png'
import bids8 from '../../assets/bids8.png'
import { Link } from 'react-router-dom';
import MarketplaceJSON from '../../Marketplace.json'
import axios from 'axios'
import { GetIpfsUrlFromPinata } from '../../utils/IpfsUrlUtil'
import { quais } from 'quais'
import NFTTile from '../nftTile/NFTTile'

const sampleData = [
  {
    id: 1,
    name: 'Abstact Smoke Red',
    description: "Abstact Smoke Red",
    image: bids1,
    price: '0.55 QUAI',
    currentlySelling: 'True',
    address: '0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13',
  },
  {
    id: 2,
    name: 'Mountain Landscape',
    description: "Mountain Landscape",
    image: bids2,
    price: '0.55 QUAI',
    currentlySelling: 'True',
    address: '0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13',
  },
  {
    id: 3,
    name: 'Paint Color on Wall',
    description: "Paint Color on Wall",
    image: bids3,
    price: '0.55 QUAI',
    currentlySelling: 'True',
    address: '0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13',
  },
  {
    id: 4,
    name: 'Abstract Patern',
    description: "Abstract Patern",
    image: bids4,
    price: '0.55 QUAI',
    currentlySelling: 'True',
    address: '0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13',
  },
  {
    id: 5,
    name: 'White Line Grafiti',
    description: "White Line Grafiti",
    image: bids5,
    price: '0.55 QUAI',
    currentlySelling: 'True',
    address: '0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13',
  },
  {
    id: 6,
    name: 'Abstract Triangle',
    description: "Abstract Triangle",
    image: bids6,
    price: '0.55 QUAI',
    currentlySelling: 'True',
    address: '0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13',
  },
  {
    id: 7,
    name: 'Lake Landscape',
    description: "Lake Landscape",
    image: bids7,
    price: '0.55 QUAI',
    currentlySelling: 'True',
    address: '0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13',
  },
  {
    id: 8,
    name: 'Blue Red Art',
    description: "Blue Red Art",
    image: bids8,
    price: '0.55 QUAI',
    currentlySelling: 'True',
    address: '0xe81Bf5A757CB4f7F82a2F23b1e59bE45c33c5b13',
  },
]

const NFTs = ({title}) => {
  const [data, updateData] = useState(sampleData)
  const [dataFetched, updateFetched] = useState(false)
  
  async function getAllNFTs() {
    //After adding your Hardhat network to your metamask, this code will get providers and signers
    const provider = new quais.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner()
    //Pull the deployed contract instance
    let contract = new quais.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
    //create an NFT Token
    let transaction = await contract.getAllNFTs()
  
    //Fetch all the details of every NFT from the contract and display
    const items = await Promise.all(
      transaction.map(async (i) => {
        var tokenURI = await contract.tokenURI(i.tokenId)
        tokenURI = GetIpfsUrlFromPinata(tokenURI)
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
  
    updateFetched(true)
    updateData(items)
  }
  
  if (!dataFetched) getAllNFTs()

  return (
    <div className='bids section__padding'>
      <div className="bids-container">
        <div className="bids-container-text">
          <h1>{title}</h1>
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
      <div className="load-more">
        <button>Load More</button>
      </div>
    </div>
  )
};

export default NFTs;
