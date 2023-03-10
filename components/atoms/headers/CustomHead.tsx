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
      <title>Top giảm giá online</title>
      <link rel="icon" href="/assets/logo-topgiamgia-vuong.png" />
      <meta property="og:type" content="article" />
      <meta property="og:title" content="Top giảm giá online" />
      <meta property="og:image" content="https://topgiamgia.vn/wp-content/uploads/2023/01/logo-topgiamgia-vuong.png" />
    </Head>
  );
};

export default CustomHead;
