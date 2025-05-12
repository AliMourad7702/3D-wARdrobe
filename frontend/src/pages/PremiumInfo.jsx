import React from 'react';
import styled from 'styled-components';
import './PremiumInfo.css';

// Styled components
const Container = styled.div`
    max-width: 800px;
    margin: 7% auto;
    padding: 40px;
    background-color: #f9f9f9;
    border-radius: 10px;
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
    font-size: 36px;
    color: #333;
    text-align: center;
    margin-bottom: 20px;
`;

const InfoList = styled.ul`
    list-style-type: none;
    padding: 0;
`;

const InfoItem = styled.li`
    font-size: 20px;
    color: #555;
    margin-bottom: 10px;
`;

const PremiumInfo = () => {
    return (
        <Container className='premium-container'>
            <Title className='premium-title'>Coming Soon!</Title>
            <p style={{ textAlign: 'center', marginBottom: '30px', fontSize: '18px', color: "black" }}>
                Go premium and unlock exclusive features and elevate your experience!
            </p>
            <InfoList >
                <InfoItem className='premium-title'>Mannequin for kids</InfoItem>
                <InfoItem className='premium-title'>Mannequin for females</InfoItem>
                <InfoItem className='premium-title'>AI chatbot for personalized clothing recommendations based on weather forecast</InfoItem>
                <InfoItem className='premium-title'>Wardrobe feature for saving and naming outfits</InfoItem>
            </InfoList>
            <p style={{ textAlign: 'center', marginTop: '40px', fontSize: '16px', color: 'rgba(0, 0, 0, 0.826)' }}>
                Subscribe and stay ahead of the curve!
            </p>
        </Container>
    );
};

export default PremiumInfo;
