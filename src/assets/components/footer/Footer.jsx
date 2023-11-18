import React from 'react'

// Img
import Banner from '../../img/banner.jpg'
import Youtube from '../../img/youtube.svg'
import Instagram from '../../img/instagram.svg'
import Tiktok from '../../img/tiktok.svg'
import Linkedin from '../../img/Linkedin.svg'
import Facebook from '../../img/facebook-f.svg'
import GooglePlay from '../../img/play_store.png'

//Css
import './footer.css'


function Footer() {

  return (
    <div className="footer-container">
        <div>
        <h2>Grønnegyden 2, 5466 Asperup, Denmark<br>
        </br>
        VAT-ID: DK40630015</h2>
        </div>
        <div className="footer-info">
            <ul className="sos-icons">
                <li>
                    <img src={Youtube} 
                        style={{filter:"brightness(0) invert(1)", 
                        height: 40,
                        width: 40, 
                        padding: 8}}
                        alt="Youtube"
                        className="invert-on-hover"
                    />
                </li>
                <li>
                <img src={Instagram} 
                        style={{filter:"brightness(0) invert(1)", 
                        height: 40,
                        width: 40, 
                        padding: 8}}
                        alt="Instagram"
                    />
                </li>
                <li>
                <img src={Tiktok} 
                        style={{filter:"brightness(0) invert(1)", 
                        height: 40,
                        width: 40, 
                        padding: 8}}
                        alt="Tiktok"
                    />
                </li>
                <li>
                <img src={Linkedin} 
                        style={{filter:"brightness(0) invert(1)", 
                        height: 40,
                        width: 40, 
                        padding: 8}}
                        alt="Linkedin"
                    />
                </li>
                <li>
                <img src={Facebook} 
                        style={{filter:"brightness(0) invert(1)", 
                        height: 40,
                        width: 40, 
                        padding: 8}}
                        alt="Facebook"
                    />
                </li>
            </ul>
                <h2>webdock.io</h2>
            <div className="google-play">
                <img src={GooglePlay} 
                    style={{
                    height: 40,
                    }}
                    alt="GooglePlay"
                />
            </div>
        </div>
    </div>
  )
}

export default Footer