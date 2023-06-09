import Head from 'next/head';

import { HomePage } from '@/build-pages/home';

export default function Home() {
  return (
    <>
      <Head>
        <title>Home</title>
        <meta name="description" content="next app" />
      </Head>
      <HomePage />
    </>
  );
}
