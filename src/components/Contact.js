import React from "react";
import "./Contact.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faGithub,
  faInstagram,
  faLinkedin,
  faDribbble,
  faBehance,
} from "@fortawesome/free-brands-svg-icons";

function Contact() {
  return (
    <div className="contact-container">
      {/* Left Column: About Me Section */}
      <div className="about-me">
        <img
          src="https://tejaspatil-portfolio.netlify.app/img/owner.jpg"
          alt="Profile"
          className="profile-img"
        />
        <h2>About Me</h2>

        <p>
          I'm Tejas Patil a passionate UI/UX designer and front-end developer
          with a keen eye for detail. I specialize in creating visually
          appealing and user-friendly interfaces. Let's connect and bring ideas
          to life!
        </p>
        <p>Founder of UI Studio & Co-Founder of NovaCops</p>
        {/* Social Links */}
        <div className="social-links">
          <a
            href="https://github.com/tejpatil064"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} className="social-icon" />
          </a>
          <a
            href="https://www.instagram.com/tejas_patil.02"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          </a>
          <a
            href="https://www.linkedin.com/in/tejas-patil064"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} className="social-icon" />
          </a>
          <a
            href="https://dribbble.com/tejaspatil064"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faDribbble} className="social-icon" />
          </a>
          <a
            href="https://www.behance.net/tejpatil064"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faBehance} className="social-icon" />
          </a>
        </div>
      </div>

      {/* Right Column: Contact Form */}
      <div className="contact-form">
        <h2>Contact Me</h2>
        <form>
          <div className="input-group">
            <label>Name</label>
            <input type="text" placeholder="Enter your name" required />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input type="email" placeholder="Enter your email" required />
          </div>

          <div className="input-group">
            <label>Message</label>
            <textarea placeholder="Write your message" required></textarea>
          </div>

          <button type="submit">Send Message</button>
        </form>
      </div>
    </div>
  );
}

export default Contact;
