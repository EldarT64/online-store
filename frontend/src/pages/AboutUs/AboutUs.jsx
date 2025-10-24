import React from 'react';
import ourStoryImg from '../../assets/our_story_img.png';
import aboutUsStore from '../../assets/about_us_store.png';
import aboutUsCustomer from '../../assets/about_us_customer.svg';
import aboutUsMoney from '../../assets/about_us_money.svg';
import tomCruise from '../../assets/tom_cruize.png';
import emmaWatson from '../../assets/emma_watson.png';
import willSmith from '../../assets/will_smith.png';
import facebook from '../../assets/facebook_icon.svg';
import twitterIcon from '../../assets/twitter_icon.svg';
import instagramIcon from '../../assets/instagram_icon.svg';
import guard from '../../assets/guard.svg';
import headphones from '../../assets/headphones.svg';
import bus from '../../assets/bus.svg';
import styles from './AboutUs.module.scss';

const AboutUs = () => {
    return (
        <div>
            <div className={styles.container}>
                <div className={styles.ourStory}>
                    <div className={styles.ourStoryText}>
                        <h2>Our Story</h2>
                        <p>
                            Founded in 2025, Shopify is the leading online shopping platform in Kyrgyzstan.
                            Supported by a wide range of tailored marketing, analytics, and service solutions,
                            Shopify collaborates with 10,500 sellers and 300 brands, serving 2 million customers nationwide.
                        </p>
                        <p>
                            Shopify offers over 1 million products, and the number is growing rapidly.
                            The company provides a diverse assortment of consumer goods across various categories.
                        </p>
                    </div>
                    <img src={ourStoryImg} alt="Our Story"/>
                </div>

                <div className={styles.achievements}>
                    <div className={styles.achievementsBlock}>
                        <img src={aboutUsStore} alt=""/>
                        <span>10.5k</span>
                        <span>Active sellers on our platform</span>
                    </div>
                    <div className={styles.achievementsBlock}>
                        <img src={aboutUsCustomer} alt=""/>
                        <span>45.5k</span>
                        <span>Active customers on our platform</span>
                    </div>
                    <div className={styles.achievementsBlock}>
                        <img src={aboutUsMoney} alt=""/>
                        <span>25k</span>
                        <span>Annual gross sales on our platform</span>
                    </div>
                </div>

                <div className={styles.people}>
                    <div className={styles.peopleBox}>
                        <img src={tomCruise} alt=""/>
                        <h4>Eldar Taiypov</h4>
                        <span>Founder & Chairman</span>
                        <div className={styles.peopleSocials}>
                            <img src={facebook} alt=""/>
                            <img src={twitterIcon} alt=""/>
                            <img src={instagramIcon} alt=""/>
                        </div>
                    </div>
                    <div className={styles.peopleBox}>
                        <img src={emmaWatson} alt=""/>
                        <h4>Emma Watson</h4>
                        <span>Chief Executive Officer</span>
                        <div className={styles.peopleSocials}>
                            <img src={facebook} alt=""/>
                            <img src={twitterIcon} alt=""/>
                            <img src={instagramIcon} alt=""/>
                        </div>
                    </div>
                    <div className={styles.peopleBox}>
                        <img src={willSmith} alt=""/>
                        <h4>Nurislom Salibaev</h4>
                        <span>Product Designer</span>
                        <div className={styles.peopleSocials}>
                            <img src={facebook} alt=""/>
                            <img src={twitterIcon} alt=""/>
                            <img src={instagramIcon} alt=""/>
                        </div>
                    </div>
                </div>

                <div className={styles.features}>
                    <div className={styles.featureBox}>
                        <div className={styles.featureContent}>
                            <img src={bus} alt=""/>
                            <h4>Free & Fast Shipping</h4>
                            <span>Free shipping on all orders over 2000 KGS</span>
                        </div>
                    </div>
                    <div className={styles.featureBox}>
                        <div className={styles.featureContent}>
                            <img src={headphones} alt=""/>
                            <h4>24/7 Customer Support</h4>
                            <span>Friendly support available 24/7</span>
                        </div>
                    </div>
                    <div className={styles.featureBox}>
                        <div className={styles.featureContent}>
                            <img src={guard} alt=""/>
                            <h4>Money-Back Guarantee</h4>
                            <span>We refund money within 30 days</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
