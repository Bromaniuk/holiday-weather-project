import React from 'react';
import { Link } from 'react-router-dom'
import '../../App.css';

function Home() {
    return (
        <div className='home-wrapper'>
            <div className='popular-destinations-div'>
                <h2 className='home-headers'><i>Popular Destinations:</i></h2>
                <div className='popular-destinations-wrapper'>
                    <ul>
                        <Link to='/weather/Greece/Athens' className='popular-destination-anchor'><li className='popular-destination-items'>Athens, Greece ⤶</li></Link>
                        <Link to='/weather/Italy/Bologna' className='popular-destination-anchor'><li className='popular-destination-items'>Bologna, Italy ⤶</li></Link>
                        <Link to='/weather/Spain/Barcelona' className='popular-destination-anchor'><li className='popular-destination-items'>Barcelona, Spain ⤶</li></Link>
                        <Link to='/weather/Belgium/Brussels' className='popular-destination-anchor'><li className='popular-destination-items'>Brussels, Belgium ⤶</li></Link>
                        <Link to='/weather/United Kingdom/Edinburgh' className='popular-destination-anchor'><li className='popular-destination-items'>Edinburgh, Scotland ⤶</li></Link>
                    </ul>
                    <ul>
                        <Link to='/weather/France/Paris' className='popular-destination-anchor'><li className='popular-destination-items'>Paris, France ⤶</li></Link>
                        <Link to='/weather/Italy/Roma' className='popular-destination-anchor'><li className='popular-destination-items'>Rome, Italy ⤶</li></Link>
                        <Link to='/weather/Portugal/Lagos' className='popular-destination-anchor'><li className='popular-destination-items'>Lagos, Portugal ⤶</li></Link>
                        <Link to='/weather/Denmark/Copenhagen' className='popular-destination-anchor'><li className='popular-destination-items'>Copenhagen, Denmark ⤶</li></Link>
                        <Link to='/weather/Iceland/Reykjavik' className='popular-destination-anchor'><li className='popular-destination-items'>Reykjavik, Iceland ⤶</li></Link >
                    </ul >
                </div >
            </div >
        </div >
    )
};

export default Home;