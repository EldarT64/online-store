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
                        <h2>Наша история</h2>
                        <p>
                            Запущенная в 2025 году, компания Shopify является ведущей онлайн-платформой для покупок
                            в Кыргызстане.
                            Поддерживаемая широким спектром адаптированных маркетинговых,
                            аналитических и сервисных решений, Shopify сотрудничает с 10 500 продавцами и
                            300 брендами и обслуживает 2 миллиона клиентов по всей стране.
                        </p>
                        <p>
                            Shopify предлагает более 1 миллиона товаров, и их число быстро растёт.
                            Компания предлагает разнообразный ассортимент в категориях,
                            охватывающих товары для потребителей.
                        </p>
                    </div>
                    <img src={ourStoryImg} alt=""/>
                </div>

                <div className={styles.achievements}>
                    <div className={styles.achievementsBlock}>
                        <img src={aboutUsStore} alt=""/>
                        <span>10.5k</span>
                        <span>Продавцы, активные на нашем сайте</span>
                    </div>
                    <div className={styles.achievementsBlock}>
                        <img src={aboutUsCustomer} alt=""/>
                        <span>45.5k</span>
                        <span>Клиенты, активные на нашем сайте</span>
                    </div>
                    <div className={styles.achievementsBlock}>
                        <img src={aboutUsMoney} alt=""/>
                        <span>25k</span>
                        <span>Годовой валовой объём продаж на нашем сайте</span>
                    </div>
                </div>

                <div className={styles.people}>
                    <div className={styles.peopleBox}>
                        <img src={tomCruise} alt=""/>
                        <h4>Эльдар Тайыпов</h4>
                        <span>Основатель и председатель</span>
                        <div className={styles.peopleSocials}>
                            <img src={facebook} alt=""/>
                            <img src={twitterIcon} alt=""/>
                            <img src={instagramIcon} alt=""/>
                        </div>
                    </div>
                    <div className={styles.peopleBox}>
                        <img src={emmaWatson} alt=""/>
                        <h4>Емма Вотсон</h4>
                        <span>Исполнительный директор</span>
                        <div className={styles.peopleSocials}>
                            <img src={facebook} alt=""/>
                            <img src={twitterIcon} alt=""/>
                            <img src={instagramIcon} alt=""/>
                        </div>
                    </div>
                    <div className={styles.peopleBox}>
                        <img src={willSmith} alt=""/>
                        <h4>Нурислам Салибаев</h4>
                        <span>Продуктовый дизайнер</span>
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
                            <h4>Бесплатная и быстрая доставка</h4>
                            <span>Бесплатная доставка для всех заказов свыше 2000сом</span>
                        </div>
                    </div>
                    <div className={styles.featureBox}>
                        <div className={styles.featureContent}>
                            <img src={headphones} alt=""/>
                            <h4>24/7 Обслуживание клиентов</h4>
                            <span>Дружелюбная поддержка клиентов 24/7</span>
                        </div>
                    </div>
                    <div className={styles.featureBox}>
                        <div className={styles.featureContent}>
                            <img src={guard} alt=""/>
                            <h4>Возврат денег гарантирован</h4>
                            <span>Мы возвращаем деньги в течении 30 дней</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;