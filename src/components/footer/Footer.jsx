import React from 'react'
import './footer.css'
import nftlogo from '../../assets/logo.png'
import { AiOutlineInstagram,AiOutlineTwitter, } from "react-icons/ai";
import { RiDiscordFill } from "react-icons/ri";
import { FaTelegramPlane } from "react-icons/fa";
const Footer = () => {
  return (
    <div className='footer section__padding'>
      <div className="footer-links">
        <div className="footer-links_logo">
        <div>
          <img src={nftlogo} alt="logo" />
          <p>Thanks, Jud!</p>
        </div>
        <div>
          <h3>Get the lastes Updates</h3>
        </div>
        <div>
          <input type="text" placeholder='Your Email' />
          <button>Email Me!</button>
        </div>
        </div>
        <div className="footer-links_div">
          <h4>MarginEX</h4>
          <p><a href="https://twitter.com/margin_exchange" target="_blank" rel="noopener noreferrer" className="footer-link">Twitter</a></p>
          <p>Discord (soon)</p>
          <p>Docs (Soon)</p>
          <p><a href="https://t.me/Kyryllo22" target="_blank" rel="noopener noreferrer" className="footer-link">Contuct Us</a></p>
        </div>
        <div className="footer-links_div">
          <h4>Quai Network</h4>
          <p><a href="https://discord.gg/quai" target="_blank" rel="noopener noreferrer" className="footer-link">Discord</a></p>
          <p><a href="https://twitter.com/QuaiNetwork" target="_blank" rel="noopener noreferrer" className="footer-link">Twitter</a></p>
          <p><a href="https://qu.ai/docs/category/tutorials/" target="_blank" rel="noopener noreferrer" className="footer-link">Build on Quai</a></p>
          <p><a href="https://qu.ai/docs/category/miner/" target="_blank" rel="noopener noreferrer" className="footer-link">Run Miner</a></p>
        </div>
      </div>
      <div className="footer-copyright">
        <div>
        <p> © {(new Date().getFullYear())} MarginEX & Quai, Inc. All Rights Reserved</p>
        </div>
        <div>
          <AiOutlineInstagram size={25} color='white' className='footer-icon' />
          <AiOutlineTwitter size={25} color='white' className='footer-icon'/>
          <RiDiscordFill size={25} color='white' className='footer-icon'/>
          <FaTelegramPlane size={25} color='white'  className='footer-icon' />
        </div>

      </div>
    </div>
  )
}

export default Footer
