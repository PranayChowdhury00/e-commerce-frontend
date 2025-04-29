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

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <FeaturedProducts></FeaturedProducts>
            <TrendingSection></TrendingSection>
            <NewsletterCTA></NewsletterCTA>
            <CategoryPage></CategoryPage>
            <BrandsCarousel></BrandsCarousel>
            <DealsOfTheDay></DealsOfTheDay>
            <WhyChooseUs></WhyChooseUs>
            <NewArrivals></NewArrivals>
            <Testimonials></Testimonials>
            <FeaturedSellerItems></FeaturedSellerItems>
            <ContactUs></ContactUs>
        </div>
    );
};

export default Home;