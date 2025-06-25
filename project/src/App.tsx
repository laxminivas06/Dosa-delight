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
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';



function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.substring(1) || 'home';
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
    if (currentPage === 'admin') {
      return isAdmin ? (
        <AdminDashboard onLogout={() => setIsAdmin(false)} />
      ) : (
        <AdminLogin onLogin={() => setIsAdmin(true)} />
      );
    }

    switch(currentPage) {
      case 'home':
        return (
          <>
            <Hero />
            <Gallery />
            <Contact />
          </>
        );
      case 'about':
        return (
          <>
            <About />
            <Contact />
          </>
        );
      case 'menu':
        return (
          <>
            <Menu />
            <Contact />
          </>
        );
      case 'gallery':
        return (
          <>
            <Gallery />
            <Contact />
          </>
        );
      case 'contact':
        return <Contact />;
      default:
        return (
          <>
            <Hero />
            <Gallery />
            <Contact />
          </>
        );
    }
  };

  return (
    <ThemeProvider>
    <CartProvider>
      <div className="App">
        {currentPage !== 'admin' && <Header />}
        {renderPage()}
        {currentPage !== 'admin' && <Footer />}
       
      </div>
    </CartProvider>
  </ThemeProvider>
  );
}

export default App;

