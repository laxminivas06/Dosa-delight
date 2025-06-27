import { useState, useEffect } from 'react';
import { ThemeProvider } from './contexts/ThemeContext';
import { CartProvider } from './contexts/CartContext';
import Header from './components/Header';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import Gallery from './components/Gallery';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BanquetHall from './components/BanquetHall';
import BarDrinks from './components/BarDrinks';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1).toLowerCase() || 'home';
      setCurrentPage(hash);
      window.scrollTo(0, 0);
    };

    // Initial load
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const renderPage = () => {
    switch(currentPage) {
      case 'home':
        return (
          <div className="page-container">
            <Hero />
            <Gallery />
            <Contact />
          </div>
        );
      case 'about':
        return (
          <div className="page-container">
            <About />
            <Contact />
          </div>
        );
      case 'menu':
        return (
          <div className="page-container">
            <Menu />
            <Contact />
          </div>
        );
      case 'bar':
        return (
          <div className="page-container">
            <BarDrinks />
            <Contact />
          </div>
        );
      case 'banquet':
        return (
          <div className="page-container">
            <BanquetHall />
            <Contact />
          </div>
        );
      case 'gallery':
        return (
          <div className="page-container">
            <Gallery />
            <Contact />
          </div>
        );
      case 'contact':
        return (
          <div className="page-container">
            <Contact />
          </div>
        );
      default:
        return (
          <div className="page-container">
            <Hero />
            <Gallery />
            <Contact />
          </div>
        );
    }
  };

  return (
    <ThemeProvider>
      <CartProvider>
        <div className="App min-h-screen flex flex-col">
          <Header />
          <main className="flex-grow">
            {renderPage()}
          </main>
          <Footer />
        </div>
      </CartProvider>
    </ThemeProvider>
  );
}

export default App;