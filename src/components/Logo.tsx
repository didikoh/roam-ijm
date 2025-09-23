import { useAppContext } from '../context/AppContext';
import logo from '@assets/loading/logo.png';

const Logo = () => {
    const { resetCamRef } = useAppContext();
    
    return (
        <div className="logo" onClick={() => resetCamRef.current?.()}>
            <img src={logo} alt="Logo" />
        </div>
    )
}

export default Logo