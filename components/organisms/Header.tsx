import Image from 'next/image';
import { useRouter } from 'next/router';
import { FC, useEffect, useState } from 'react';
import styles from '../../styles/components/organisms/Header.module.scss';
import { checkGreenIcon1, closeIcon, favoriteGrayIcon } from '../../public/icons';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

type PropsType = {

};

const currentColor = ['#A4C955', '#E88E49', '#2D6AAA'];

const HEADER_HEIGTH = '83px';

const Header: FC<PropsType> = (props) => {
  const router = useRouter();
  const { isShowNoti } = router.query;
  const [scrollDirection, setScrollDirection] = useState<string | null>(null);
  const [inputSearch, setInputSearch] = useState<string>('');

  let userInfo: { id: string; };
  if (typeof window !== 'undefined') {
    userInfo = JSON.parse(localStorage.getItem('user-info') || '[]');
  };

  const handleSearch = (event: any) => {
    setInputSearch(event.target.value);
    if (!event.target.value.trim()) return;
    if (event.key === 'Enter') {
      router.push(`/product?searchInput=${event.target.value}`);
    }
  };

  useEffect(() => {
    let lastScrollY = window.pageYOffset;
    const updateScrollDirection = () => {
      const scrollY = window.pageYOffset;
      const direction = scrollY > lastScrollY ? "down" : "up";
      if (direction !== scrollDirection && (scrollY - lastScrollY > 5 || scrollY - lastScrollY < -5)) {
        setScrollDirection(direction);
      }
      lastScrollY = scrollY > 0 ? scrollY : 0;
    };

    window.addEventListener("scroll", updateScrollDirection, { passive: true });
  }, [scrollDirection]);

  return (
    <>
      <header
        className={scrollDirection === 'up' ? `${styles.wrapper} ${styles.stiky}` : styles.wrapper}
        style={{ top: scrollDirection === 'up' ? '0' : `-${HEADER_HEIGTH}` }}
      >
        <div className={styles.header}>
          <div className={styles.leftArea}>
            <div className={styles.leftAreaMainlogo} onClick={() => router.push('/home')} role="presentation">
              <Image
                src="/assets/logo-topgiamgia-vuong.png"
                width={60}
                height={60}
                alt="main-logo"
              />
            </div>
            <Navbar bg="light" expand="lg">
              <Container>
                <Navbar.Brand onClick={() => router.push('/')}>Trang chủ</Navbar.Brand>
                <Navbar.Brand onClick={() => router.push('/website')}>Website liên kết</Navbar.Brand>
                <Navbar.Brand onClick={() => router.push('/shop')}>Shop liên kết</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
              </Container>
            </Navbar>
          </div>
          <div className={styles.rightArea}>

          </div>
        </div>

      </header>
    </>
  );
};

export default Header;
