import React from 'react';
import email from '../../assets/contacts_email.svg';
import phone from '../../assets/contacts_phone.svg';
import styles from './Contacts.module.scss';

const Contacts = () => {
    return (
        <div className={styles.container}>
            <div className={styles.contacts}>
                {/* Левая часть */}
                <div className={styles.infoBlock}>
                    <div className={styles.callUs}>
                        <img src={phone} alt="Phone" />
                        <h5>Call to us</h5>
                        <span>We are available 24/7, 7 days a week</span>
                        <span>Phone: +996 313 26 34 2</span>
                    </div>

                    <div className={styles.writeUs}>
                        <img src={email} alt="Email" />
                        <h5>Write to us</h5>
                        <span>Fill out our form and we will contact you within 24 hours.</span>
                        <span>Emails: customer@shopify.com</span>
                        <span>Support: support@shopify.com</span>
                    </div>
                </div>

                {/* Правая часть */}
                <div className={styles.contactForm}>
                    <input type="text" placeholder="Your Name" />
                    <input type="email" placeholder="Your Email" />
                    <input type="text" placeholder="Your Phone" />
                    <textarea rows="5" placeholder="Your Message"></textarea>
                    <button>Send Message</button>
                </div>
            </div>
        </div>
    );
};

export default Contacts;
