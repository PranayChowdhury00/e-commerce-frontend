import React from 'react';
import Banner from './Banner';
import FeaturedProducts from './FeaturedProducts';
import TrendingSection from './TrendingSection';
import CategoryPage from './CategoryPage';
import BrandsCarousel from './BrandsCarousel';
import DealsOfTheDay from './DealsOfTheDay';
import NewArrivals from './NewArrivals';
import WhyChooseUs from './WhyChooseUs';
import NewsletterCTA from './NewsletterCTA';
import Testimonials from './Testimonials';
import ContactUs from './ContactUs';
import FeaturedSellerItems from './FeaturedSellerItems';
import FAQSection from './FAQSection';

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <DealsOfTheDay></DealsOfTheDay>
            <CategoryPage></CategoryPage>
            <FeaturedProducts></FeaturedProducts>
            <TrendingSection></TrendingSection>
            <NewArrivals></NewArrivals>
            <WhyChooseUs></WhyChooseUs>
            <BrandsCarousel></BrandsCarousel>
            <FeaturedSellerItems></FeaturedSellerItems>
            <Testimonials></Testimonials>
            <NewsletterCTA></NewsletterCTA>
            <FAQSection></FAQSection>
            <ContactUs></ContactUs>

        </div>
    );
};

export default Home;