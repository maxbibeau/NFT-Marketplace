import React from 'react'
import './footer.css'
import nftlogo from '../../assets/logo.png'
import { AiOutlineInstagram,AiOutlineTwitter, } from "react-icons/ai";
import { RiDiscordFill } from "react-icons/ri";
import { FaTelegramPlane, FaGithub } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='footer section__padding'>
      <div className="footer-links">
        <div className="footer-links_logo">
        <div>
          <img src={nftlogo} alt="logo" />
          <p>Want more from MarginEX?</p>
        </div>
        <div>
          <h3>Get the lastest updates on MarginEX and Quai NFTs delivered right to your inbox.</h3>
        </div>
        <div>
          <input type="text" placeholder='Your Email' />
          <button>Email Me!</button>
        </div>
        </div>
        <div className="footer-links_div">
          <h4>MarginEX</h4>
          <p><a href="https://twitter.com/margin_exchange" target="_blank" rel="noopener noreferrer" className="footer-link">Twitter</a></p>
          <p>Discord [Coming Soon!]</p>
          <p>Docs [Coming Soon!]</p>
          <p><a href="https://t.me/Kyryllo22" target="_blank" rel="noopener noreferrer" className="footer-link">Contact</a></p>
        </div>
        <div className="footer-links_div">
          <h4>Quai Network</h4>
          <p><a href="https://discord.gg/quai" target="_blank" rel="noopener noreferrer" className="footer-link">Discord</a></p>
          <p><a href="https://twitter.com/QuaiNetwork" target="_blank" rel="noopener noreferrer" className="footer-link">Twitter</a></p>
          <p><a href="https://qu.ai/docs/category/tutorials/" target="_blank" rel="noopener noreferrer" className="footer-link">Develop on Quai</a></p>
          <p><a href="https://qu.ai/docs/category/miner/" target="_blank" rel="noopener noreferrer" className="footer-link">Mine Quai</a></p>
        </div>
      </div>
      <div className="footer-copyright">
        <div>
        <p>© MarginEX {(new Date().getFullYear())}. All Rights Reserved.</p>
        </div>
        
        </div>

        <div>
          {/* <AiOutlineInstagram size={25} color='white' className='footer-icon' /> */}
          <a href="https://twitter.com/margin_exchange">
            <AiOutlineTwitter size={25} color='white' className='footer-icon'/>
          </a>
          <a href="https://discord.gg/quai">
            <RiDiscordFill size={25} color='white' className='footer-icon'/>
          </a>
          <a href="https://t.me/Kyryllo22">
            <FaTelegramPlane size={25} color='white'  className='footer-icon' />
          </a>
          <a href="https://github.com/TsarenkoKir/NFT-Marketplace">
            <FaGithub size={25} color='white' className='footer-icon' />
          </a>
        </div>



      </div>
  )
}

export default Footer
