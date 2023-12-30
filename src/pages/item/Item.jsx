import React, {useState} from 'react';
import { useLocation } from 'react-router-dom';
import './item.css'
import creator from '../../assets/seller2.png'
import { quais } from 'quais'
import MarketplaceJSON from '../../Marketplace.json'
import { ThreeCircles } from 'react-loader-spinner'

const Item = () => {

  const location = useLocation();
  const receivedData = location.state;
  const nftItem = receivedData.data;
  const [loading, setLoading] = useState(false);

  async function buyNFT(tokenId, price) {
    setLoading(true);
		try {
			//After adding your Hardhat network to your metamask, this code will get providers and signers
			const provider = new quais.providers.Web3Provider(window.ethereum)
			const signer = provider.getSigner()

			//Pull the deployed contract instance
			let contract = new quais.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)
			const salePrice = quais.utils.parseUnits(price, 'ether')

			//run the executeSale function
			let transaction = await contract.executeSale(tokenId, { value: salePrice, gasLimit: quais.utils.hexlify(150000) })
			await transaction.wait()
			alert('You successfully bought the NFT!')
		} catch (e) {
			alert('Upload Error' + e)
		}
    finally {
      setLoading(false);
    }
	}


  return( 
      <div className='item section__padding'>
        <div className="item-image">
          <img src={nftItem.image} alt="item" />
        </div>
          <div className="item-content">
            <div className="item-content-title">
              <h1>{nftItem.name}</h1>
              <p><span>{nftItem.price} QUAI</span> - available</p>
            </div>
            <div className="item-content-creator">
              <div><p>Owner</p></div>
              <div>
                <p>{nftItem.owner} </p>
              </div>
            </div>
            <div className="item-content-creator">
              <div><p>Seller</p></div>
              <div>
                <img src={creator} alt="creator" />
                <p>{nftItem.seller} </p>
              </div>
            </div>
            <div className="item-content-detail">
              <p>{nftItem.description}</p>
            </div>
            <div className="item-content-buy">
              {!loading && <button onClick={() => buyNFT(nftItem.tokenId, nftItem.price)} className="primary-btn">Buy</button>}
              {!loading && <button className="secondary-btn">Make Offer (Coming Soon)</button>}
              
              <ThreeCircles
                visible={loading}
                height="90"
                width="90"
                justify-content="center"
                color="#EB1484"
                ariaLabel="three-circles-loading"
                wrapperStyle={{justifyContent: "center"}}
                wrapperClass=""
                />
              
            </div>
          </div>
      </div>
  )
};

export default Item;