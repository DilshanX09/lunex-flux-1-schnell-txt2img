import { useEffect } from 'react';
import icon from '../assets/logo.svg';
import './style.css';

const SplashScreen = () => {

    useEffect(() => {
        const timer = setTimeout(() => {
            window.location.href = '/c';
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            gap: '10px',
            color: 'white',
            backgroundColor: '#212121'
        }}>

            <div className='splash-content' style={{ width: '40%' }}>

                <img src={icon} alt="logo" width={50} />

                <h1 className='inter-medium' style={{
                    paddingBottom: '10px',
                    paddingTop: '20px'
                }}>Lunex</h1>

                <p className='inter-light'>Transform words into stunning, Lunex-inspired visuals powered by AI. Whether it's a mountain at sunrise or a futuristic cityscape by the sea, just type your vision — and let Lunex bring it to life.</p>

            </div>

            <footer className="inter-light"
                style={{
                    position: 'fixed',
                    bottom: '10px',
                    color: 'gray'
                }}
            >
                <p>© Developed by Dilshan | Freely Usable Model</p>
            </footer>
        </div>
    )

}

export default SplashScreen;