import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebookSquare,
} from 'react-icons/fa'

import './index.css'

export default function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-logo-container">
        <img
          src="https://res.cloudinary.com/dfgc7y56h/image/upload/v1674714103/Frame_275_uuuafh.png"
          alt="website-footer-logo"
          className="footer-logo"
        />
        <h1 className="footer-heading">Tasty Kitchens</h1>
      </div>
      <p className="footer-description">
        The only thing we are serious about is food. Contact us on
      </p>

      <div className="social-icons-container">
        <FaPinterestSquare
          className="social-icons"
          testid="pintrest-social-icon"
        />
        <FaInstagram className="social-icons" testid="instagram-social-icon" />
        <FaTwitter className="social-icons" testid="twitter-social-icon" />
        <FaFacebookSquare
          className="social-icons"
          testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
