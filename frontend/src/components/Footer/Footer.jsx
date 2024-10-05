import React from 'react'
import './Footer.css'

const Footer = () => {
  return (
    <div className='footer' id='footer'>
        <div className="footer-content">
            <div className="footer-content-left">
                <p>
                    At TogetherWeCan, we believe in the power of collective giving to transform lives and communities. 
                    Whether you're passionate about supporting education, healthcare, environmental conservation,
                    or humanitarian aid, our platform provides a seamless and secure way to make a difference. 
                    Join us in making an impact today, as together, we strive towards a brighter and more equitable future for all.
                </p>
           
            </div>
            <div className="footer-content-center">
                <h2>COMPANY</h2>
                <ul>
                    <li>Home</li>
                    <li>About Us</li>
                    <li>Delivery</li>
                    <li>Privacy Policy</li>
                </ul>
            </div>
            <div className="footer-content-right">
                <h2>GET IN TOUCH</h2>
                <ul>
                    <li>+20-103-000-6668</li>
                    <li>contact@togetherWeCan.com</li>
                </ul>
            </div>
        </div>
        <hr/>
        <p className="footer-copy-right">Copyright 2024 © TogetherWeCan.com - All Rights Reserved.</p>
    </div>
  )
}

export default Footer