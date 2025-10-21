import Navbar from '@src/components/layouts/navbar';
import HeroBanner from './hero-banner';
import FeaturedBooksSection from './feature-books-section';
import Footer from './footer';
import { BookEntity } from '@src/models/entities';

interface HomePageProps {
    books: BookEntity[];
}

const HomePage = ({ books }: HomePageProps) => {
    return (
        <div className="min-h-screen">
            <Navbar />
            <HeroBanner />
            {/* <CategoriesSection /> */}
            <FeaturedBooksSection books={books} />
            <Footer />
        </div>
    );
};

export default HomePage;