import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="container">
          <h1>Lighting the Path to Change</h1>
          <p>Join Basti Ki Pathshala Foundation in our mission to empower communities through education</p>
          <div className="hero-buttons">
            <Link to="/register" className="btn btn-primary">
              Join Our Team
            </Link>
            <a href="#about" className="btn btn-secondary">
              Learn More
            </a>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="section about-section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2>About Basti Ki Pathshala Foundation</h2>
              <p>
                At Basti Ki Pathshala Foundation, we are more than just an organization – we are a movement, 
                driven by the belief that education is the cornerstone of empowerment. Established under the 
                Indian Societies Act of 1860, we stand as a beacon of hope in underserved communities, 
                dedicated to breaking the chains of poverty through the transformative power of learning.
              </p>
              <p>
                Our foundation operates with a simple yet powerful vision: to create educational opportunities 
                where none exist, to nurture dreams where hope seems lost, and to build futures where 
                possibilities appear limited.
              </p>
              <div className="about-stats">
                <div className="stat">
                  <h3>1000+</h3>
                  <p>Students Helped</p>
                </div>
                <div className="stat">
                  <h3>50+</h3>
                  <p>Volunteers</p>
                </div>
                <div className="stat">
                  <h3>10+</h3>
                  <p>Years of Service</p>
                </div>
              </div>
            </div>
            <div className="about-image">
              <div className="about-images-grid">
                <img src="/images/image2.jpg" alt="Foundation Activity 1" className="about-image-item" />
                <img src="/images/image3.jpg" alt="Foundation Activity 2" className="about-image-item" />
                <img src="/images/image4.jpg" alt="Foundation Activity 3" className="about-image-item" />
                <img src="/images/image5.jpg" alt="Foundation Activity 4" className="about-image-item" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section">
        <div className="container">
          <h2 className="section-title">Our Mission & Values</h2>
          <div className="grid grid-3">
            <div className="feature-card">
              <div className="feature-icon">🎓</div>
              <h3>Quality Education</h3>
              <p>Providing accessible, high-quality education to children in underserved communities, ensuring every child has the opportunity to learn and grow.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🤝</div>
              <h3>Community Support</h3>
              <p>Building strong partnerships with local communities to create sustainable educational programs that address specific needs and challenges.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌟</div>
              <h3>Empowerment</h3>
              <p>Empowering individuals through knowledge, skills, and confidence to break the cycle of poverty and create better futures.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Us Section */}
      <section className="section join-section">
        <div className="container">
          <div className="join-content">
            <h2>Join Our Mission</h2>
            <p>
              We're looking for passionate individuals who want to make a difference. 
              Whether you're a student looking for an internship or a professional wanting to volunteer, 
              we have opportunities for you to contribute to our cause.
            </p>
            <div className="join-buttons">
              <Link to="/register" className="btn btn-primary">
                Apply Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <h3>Basti Ki Pathshala Foundation</h3>
              <p>Where learning knows no boundaries</p>
            </div>
            <div className="footer-section">
              <h4>Contact</h4>
              <p>Email: info@bastikipathshala.org</p>
              <p>Website: www.bastikipathshala.org</p>
            </div>
            <div className="footer-section">
              <h4>Quick Links</h4>
              <Link to="/register">Join Us</Link>
              <Link to="/admin">Admin</Link>
            </div>
          </div>
          <div className="footer-bottom">
            <p>&copy; 2024 Basti Ki Pathshala Foundation. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home; 