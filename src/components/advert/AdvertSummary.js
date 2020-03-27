import React from 'react';
import basketball from './advert_assests/basketball.png'; 

const AdvertSummary = ({advert}) => {
    return (
        <div className="advert-card">
            <div className="top-section">
                <img
                src={`${advert.url}` || {basketball} } 
                alt=""/>
            </div>
            
            <div className="advert-info">
            <h2>{advert.title}</h2>
                <p>{advert.content}</p>
                <div className="advert-name">
                    <span>Created by {advert.authorFirstName} {advert.authorLastName}</span>
                </div>
                <a href={ advert.link }><button className="get-p">Get</button></a>
            </div>
        </div>
    )
}

export default AdvertSummary
