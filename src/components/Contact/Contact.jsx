import React, { useState } from 'react';
import styles from './contact.module.css';
import { FaInstagram, FaFacebook } from 'react-icons/fa'; 

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for contacting us!');
  };

  return (
    <div className={styles['contact-page']}>
      <section className={styles['contact-header']}>
        <p>Got questions or feedback? We're here to help!💁‍♂️</p>
      </section>

      <div className={styles['contact-content']}>
        <section className={styles['contact-form-section']}>
          <h2>Contact Form</h2>
          <form onSubmit={handleSubmit} className={styles['contact-form']}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
            <button type="submit" className={styles.btn}>Submit</button>
          </form>
        </section>

        <section className={styles['contact-info-section']}>
          <h2>Contact Information</h2>
          <ul>
            <li><strong>Email:</strong> support@fitnesstracker.com</li>
            <li><strong>Phone:</strong> (123) 456-7890</li>
            <li><strong>Follow Us: </strong> 
              <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                <FaInstagram size={30} style={{ marginRight: '10px' }} />
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <FaFacebook size={30} style={{ marginRight: '10px' }} />
              </a>
            </li>
          </ul>
        </section>
      </div>
    </div>
  );
}

export default Contact;