import React, { useState } from "react";
import {
  Target,
  Menu,
  X,
  Sparkles,
  ArrowRight,
} from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <header className="header">
      <div className="header-gradient" />
      <nav className="nav">
        <div className="nav-container">
          <div className="logo">
            <a href="#" className="logo-link">
              <Target className="logo-icon" />
              <span className="logo-text">Jobscan</span>
            </a>
          </div>

          {/* Desktop Navigation */}
          <div className="nav-links">
            <a href="#" className="nav-item">Products</a>
            <a href="#" className="nav-item">Resources</a>
            <a href="#" className="nav-item">Pricing</a>
            <button className="login-btn">Login</button>
            <button
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
              className="cta-btn"
            >
              <span className="cta-text">
                Try for Free
                <Sparkles className={`cta-icon ${isHovered ? "hovered" : ""}`} />
              </span>
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="mobile-menu">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="menu-btn">
              {isMenuOpen ? <X className="menu-icon" /> : <Menu className="menu-icon" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="mobile-nav">
            <a href="#" className="mobile-nav-item">Products</a>
            <a href="#" className="mobile-nav-item">Resources</a>
            <a href="#" className="mobile-nav-item">Pricing</a>
            <a href="#" className="mobile-nav-item">Login</a>
            <a href="#" className="mobile-cta">Try for Free</a>
          </div>
        )}
      </nav>
    </header>
  );
}

export default Header;
