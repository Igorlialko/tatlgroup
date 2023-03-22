import React, { useEffect } from 'react';

import Head from 'next/head';
import Link from 'next/link';

import s from './index.module.scss';

export const CommonInclusions = ({ children }) => {
  useEffect(() => {
    /** app height on client*/
    const appHeight = () => {
      document.documentElement.style.setProperty('--app-height', `${window.innerHeight}px`);
    };

    appHeight();

    window.addEventListener('resize', appHeight);
    return () => {
      window.removeEventListener('resize', appHeight);
    };
  }, []);

  const links = [
    {
      text: 'Home',
      href: '/',
    },
    {
      text: 'About',
      href: '/about',
    },
  ];

  return (
    <main className="main">
      <Head>
        {process.env.NEXT_PUBLIC_ENV === 'development' && (
          <meta name="robots" content="noindex, nofollow" />
        )}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <style
          dangerouslySetInnerHTML={{
            __html: `
@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  src: local(''),url('/fonts/inter/inter-v12-latin-regular.eot'); /* IE9 Compat Modes */
  src: local(''),url('/fonts/inter/inter-v12-latin-regular.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('/fonts/inter/inter-v12-latin-regular.woff2') format('woff2'), /* Super Modern Browsers */
  url('/fonts/inter/inter-v12-latin-regular.woff') format('woff'), /* Modern Browsers */
  url('/fonts/inter/inter-v12-latin-regular.ttf') format('truetype'), /* Safari, Android, iOS */
  url('/fonts/inter/inter-v12-latin-regular.svg#Inter') format('svg'); /* Legacy iOS */
}

@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  src: local(''),url('/fonts/inter/inter-v12-latin-600.eot'); /* IE9 Compat Modes */
  src: local(''),url('/fonts/inter/inter-v12-latin-600.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('/fonts/inter/inter-v12-latin-600.woff2') format('woff2'), /* Super Modern Browsers */
  url('/fonts/inter/inter-v12-latin-600.woff') format('woff'), /* Modern Browsers */
  url('/fonts/inter/inter-v12-latin-600.ttf') format('truetype'), /* Safari, Android, iOS */
  url('/fonts/inter/inter-v12-latin-600.svg#Inter') format('svg'); /* Legacy iOS */
}

@font-face {
  font-display: swap; /* Check https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-display for other options. */
  font-family: 'Inter';
  font-style: normal;
  font-weight: 700;
  src: local(''),url('/fonts/inter/inter-v12-latin-700.eot'); /* IE9 Compat Modes */
  src: local(''),url('/fonts/inter/inter-v12-latin-700.eot?#iefix') format('embedded-opentype'), /* IE6-IE8 */
  url('/fonts/inter/inter-v12-latin-700.woff2') format('woff2'), /* Super Modern Browsers */
  url('/fonts/inter/inter-v12-latin-700.woff') format('woff'), /* Modern Browsers */
  url('/fonts/inter/inter-v12-latin-700.ttf') format('truetype'), /* Safari, Android, iOS */
  url('/fonts/inter/inter-v12-latin-700.svg#Inter') format('svg'); /* Legacy iOS */
}`,
          }}
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/inter/inter-v12-latin-regular.woff2"
        />

        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/inter/inter-v12-latin-600.woff2"
        />
        <link
          rel="preload"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
          href="/fonts/inter/inter-v12-latin-700.woff2"
        />
      </Head>
      <header>
        <nav>
          <ul className={s.section}>
            {links.map(({ text, href }) => (
              <li key={href}>
                <Link href={href} className="link">
                  {text}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      {children}
      <footer className={s.section}>
        <p>test site</p>
      </footer>
    </main>
  );
};
