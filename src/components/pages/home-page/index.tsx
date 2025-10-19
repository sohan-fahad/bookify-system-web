import Navbar from '@src/components/layouts/navbar';
import HeroBanner from './hero-banner';
import CategoriesSection from './categories-section';
import FeaturedBooksSection from './feature-books-section';
import Footer from './footer';

const HomePage = () => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <HeroBanner />
            {/* <CategoriesSection /> */}
            <FeaturedBooksSection />
            <Footer />
        </div>
    );
};

export default HomePage;