import React from 'react';
import Banner from './Banner';
import ElectronicsCategorySection from './ElectronicsCategorySection';
import ElectronicsDeals from './ElectronicsDeals';
import RefrigeratorsSection from './RefrigeratorsSection';
import WashingMachinesSection from './WashingMachinesSection';
import ElectronicsAccessoriesSection from './ElectronicsAccessoriesSection';

const Electronics = () => {
    return (
        <div>
            <Banner></Banner>
            <ElectronicsAccessoriesSection></ElectronicsAccessoriesSection>
            <ElectronicsCategorySection></ElectronicsCategorySection>
            <ElectronicsDeals></ElectronicsDeals>
            <RefrigeratorsSection></RefrigeratorsSection>
            <WashingMachinesSection></WashingMachinesSection>
        </div>
    );
};

export default Electronics;