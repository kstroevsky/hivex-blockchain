import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Heading from '../shared/Heading';
const Error = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push('/');
    }, 3000);
  }, [router]);

  return (
    <div className="displayFlex section">
      <Head>
        <title>Error</title>
      </Head>
      <div className="displayFlex">
        <Heading text="404" />
        <Heading text="Something is going wrong ..." tag="h2" />
      </div>
    </div>
  );
};

export default Error;
