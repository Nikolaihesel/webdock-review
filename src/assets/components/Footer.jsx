import React from 'react'

// Img
import Banner from '../banner.jpg'
import Youtube from '../youtube.svg'
import Instagram from '../instagram.svg'
import Tiktok from '../tiktok.svg'
import Linkedin from '../Linkedin.svg'
import Facebook from '../facebook-f.svg'
import GooglePlay from '../play_store.png'

//Css
import '../stylesheet/footer.css'


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