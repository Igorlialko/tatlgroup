import Head from 'next/head';

import { AboutPage } from '@/build-pages/about';

export default function About() {
  return (
    <>
      <Head>
        <title>About</title>
        <meta name="description" content="next app" />
      </Head>
      <AboutPage />
    </>
  );
}
