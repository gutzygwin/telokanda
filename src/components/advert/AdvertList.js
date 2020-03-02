import React from 'react'
import AdvertSummary from './AdvertSummary';
import { Link } from 'react-router-dom';

const AdvertList = ({adverts}) => {
    return (
        <div className="advert-list">
            <div className="ad-summary">
                { adverts && adverts.map(advert => {
                    return (
                        <Link to={'/advert/' + advert.id}>
                            <AdvertSummary advert={advert} key={advert.id} />
                        </Link>
                    )
                })}
            </div>
        </div>
    )
}

export default AdvertList
