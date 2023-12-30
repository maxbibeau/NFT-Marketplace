import { Link } from 'react-router-dom'

function NFTTile(data) {
    const item = data.data
	return (
		<div className="card-column" >
                <div className="bids-card">
                  <div className="bids-card-top">
                    <img src={item.image} alt="" />

                    <Link to={'/item/'+item.tokenId} state={{ data: item, key: item.tokenId }}>
                    <p className="bids-title">{item.name}</p>
                    </Link>
                  </div>
                  <div className="bids-card-bottom">
                    <p>{item.price} QUAI</p>
                  </div>
                </div>
              </div>
	)
}

export default NFTTile