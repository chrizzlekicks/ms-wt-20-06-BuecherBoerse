import React from 'react';
import { footer } from '../utils/linksDB';
import FooterLink from './FooterLink';
import { FaHeart, FaGithub, FaInstagram } from 'react-icons/fa';

const Footer = () => {
    return (
        <>
            <footer className='footer'>
                <section className='footer-container'>
                    <article className='footer-wrapper'>
                        <aside className='footer-link-container'>
                            <p>© 2021 Kodebi. All rights reserved</p>
                            <ul className='footer-links'>
                                {footer.map((link) => {
                                    return (
                                        <FooterLink key={link.id} {...link} />
                                    );
                                })}
                            </ul>
                        </aside>
                        <aside className='footer-link-container'>
                            <p>
                                coded with{' '}
                                <span className='heart'>
                                    <FaHeart />
                                </span>{' '}
                                in Berlin und München
                            </p>
                            <div className='footer-social'>
                                <a
                                    href='https://github.com/chrizzlekicks/ms-wt-20-06-BuecherBoerse'
                                    style={{
                                        color: 'var(--fnt-clr)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <FaGithub style={{ margin: '0 0.25rem' }} />
                                </a>
                                <a
                                    href='https://www.instagram.com/kodebi_bookshare/'
                                    style={{
                                        color: 'var(--fnt-clr)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    <FaInstagram
                                        style={{ marginLeft: '0.75rem' }}
                                    />
                                </a>
                            </div>
                        </aside>
                    </article>
                </section>
            </footer>
        </>
    );
};

export default Footer;
