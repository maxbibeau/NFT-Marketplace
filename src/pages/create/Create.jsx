import './create.css'
import { useState } from 'react'
import { uploadFileToIPFS, uploadJSONToIPFS } from '../../utils/pinata'
import MarketplaceJSON from '../../Marketplace.json'
import { quais } from 'quais'
import { ThreeCircles } from 'react-loader-spinner'

const Create = () => {
	const [formParams, updateFormParams] = useState({ name: '', description: '', price: '' })
	const [fileURL, setFileURL] = useState(null)
  const [loading, setLoading] = useState(false);

  //This function uploads the NFT image to IPFS
	async function OnChangeFile(e) {
    setLoading(true);
		var file = e.target.files[0]
		//check for file extension
		try {
			//upload the file to IPFS
			const response = await uploadFileToIPFS(file)
			if (response.success === true) {
				setFileURL(response.pinataURL)
			}
		} catch (e) {
			console.log('Error during file upload', e)
		}
    finally {
      setLoading(false);
    }
	}

	//This function uploads the metadata to IPFS
	async function uploadMetadataToIPFS() {
		const { name, description, price } = formParams
		//Make sure that none of the fields are empty
		if (!name || !description || !price || !fileURL) {
			return -1
		}

		const nftJSON = {
			name,
			description,
			price,
			image: fileURL,
		}
    
		try {
			//upload the metadata JSON to IPFS
			const response = await uploadJSONToIPFS(nftJSON)
			if (response.success === true) {
				return response.pinataURL
			}
		} catch (e) {
			console.log('error uploading JSON metadata:', e)
		}
	}

	async function listNFT(e) {
		e.preventDefault()
    
    setLoading(true);
		//Upload data to IPFS
		try {
			const metadataURL = await uploadMetadataToIPFS()
			if (metadataURL === -1) return

			//After adding your Hardhat network to your metamask, this code will get providers and signers
			const provider = new quais.providers.Web3Provider(window.ethereum)
			const signer = provider.getSigner()

			//Pull the deployed contract instance
			let contract = new quais.Contract(MarketplaceJSON.address, MarketplaceJSON.abi, signer)

			//massage the params to be sent to the create NFT request
			const price = quais.utils.parseUnits(formParams.price, 'ether')
			let listingPrice = await contract.getListPrice()
			listingPrice = listingPrice.toString()

			//actually create the NFT
			let transaction = await contract.createToken(metadataURL, price, { value: listingPrice, gasLimit: quais.utils.hexlify(350000) })
			
      await Promise.any([delayedTransaction(transaction), delayedAsyncFunction()])
      //await transaction.wait()

			updateFormParams({ name: '', description: '', price: '' })
			window.location.replace('/')
		} catch (e) {
			alert('Upload error' + e)
		}
    finally {
      setLoading(false);
    }
	}

  async function delayedTransaction(transaction) {
    return await new Promise(async resolve => {
        await transaction.wait()
        resolve(); // Resolve the promise when the asynchronous operation is complete
    });
  }

  function delayedAsyncFunction() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(); // Resolve the promise when the asynchronous operation is complete
      }, 3000);
    });
  }

  return (
    <div className='create section__padding'>
      <div className="create-container">
        <h1>Create new NFT</h1>
        
        <form className='writeForm' autoComplete='off'>
          
          
          <div className="formGroup">
            <label>Name</label>
            <input 
            type="text" 
            placeholder='NFT Name' 
            autoFocus={true} 
            id='name'
            onChange={(e) => updateFormParams({ ...formParams, name: e.target.value })}
            value={formParams.name}
            />
          </div>
          <div className="formGroup">
            <label>Description</label>
            <textarea 
            type="text" 
            rows={4}
            placeholder='Decription of your NFT' 
            id='description'
            value={formParams.description}
            onChange={(e) => updateFormParams({ ...formParams, description: e.target.value })}
          ></textarea>
          </div>
          <div className="formGroup">
            <label>Price</label>
            <div className="twoForm">
              <input 
              type='number'
							placeholder='Min 0.01 QUAI'
							step='0.01'
							value={formParams.price}
							onChange={(e) => updateFormParams({ ...formParams, price: e.target.value })}
              />
            </div>
          </div>
          <div className="formGroup">
            <label>Category</label>
            <select >
               <option>Art</option>
               <option>Photography</option>
               <option>MEME</option>
               <option>Sport</option>
               <option>Crypto</option>
               <option>Other</option>
            </select>
          </div>

          <p className='upload-file'>Upload File (Coming Soon)</p>
          <div className="upload-img-show">
              <h3>JPG, PNG, GIF, SVG, WEBM, MP3, MP4. Max 100mb.</h3>
              {/* <img src={Image} alt="banner" /> */}
              <p>Drag and Drop File</p>
          </div>
          <div className="formGroup">
            <label>Upload</label>
            <input 
            type="file" 
            className='custom-file-input'
            onChange={OnChangeFile}
          />
          </div>
          {!loading && <button className='writeButton' onClick={listNFT} id='list-button'>List My NFT</button>}
          <ThreeCircles
                visible={loading}
                height="90"
                width="90"
                color="#EB1484"
                justify-content="center"
                ariaLabel="three-circles-loading"
                wrapperStyle={{justifyContent: "center"}}
                wrapperClass=""
                />
        
        </form>
        
      </div>
    </div>
   
  )
};

export default Create;