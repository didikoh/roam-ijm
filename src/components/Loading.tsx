import bg from '@assets/loading/background.png'
import logo from '@assets/loading/logo.png'
import { useEffect } from 'react';
import { useAppContext } from '../context/AppContext';

const Loading = () => {
    const { progress, isLoading, setIsLoading } = useAppContext();

    useEffect(() => {
        if (progress >= 101) {
            setIsLoading(false);
        }
    }, [progress])

    return (
        <>
            {isLoading &&
                <div className='loading'>
                    <div className='loading__background'>
                        <img src={bg} alt="background" />
                    </div>
                    <div className='loading__logo'>
                        <img src={logo} alt="logo" />
                    </div>
                    <div className='loading__content'>
                        <p>FROM STARTUPS TO SCALE-UPS.</p>
                        <p>THIS IS YOUR SPACE TO SHINE!</p>
                    </div>
                    <div className="loading__progress">
                        <div className='loading__progress-bar'>
                            <div className='loading__progress-bar-fill' style={{ width: `${progress}%` }}></div>
                        </div>
                        <div className='loading__progress-text'>Loading...</div>
                    </div>
                </div>
            }
        </>
    )
}

export default Loading