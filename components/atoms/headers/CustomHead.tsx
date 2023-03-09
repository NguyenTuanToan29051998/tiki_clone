import type { NextPage } from 'next';
import Head from 'next/head';

type PropsType = {
  title?: string;
  description?: string;
  img?: string;
};

const CustomHead: NextPage<PropsType> = (props) => {
  const { title, description, img } = props;

  return (
    <Head>
      <title>{title ? `${title} | TiKi - mua hàng online` : 'TiKi - mua hàng online'}</title>
      <link rel="icon" href="/assets/logo.jpg" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="ISEECOVID" />
      <meta property="og:image" content="https://iseecovid.rikaidev.cf/assets/LOGO-PARTNER-01.svg" />
    </Head>
  );
};

export default CustomHead;
