import { useNavigate } from "react-router-dom";

const OfflineScreen = () => {

     const navigate = useNavigate();

     let isOnline = navigator.onLine;

     const handleIsOnline = () => {
          if (isOnline) navigate('/c');
          else return;
     }

     return (
          <div className="network-lost-container">
               <div>
                    <h4 className="inter-medium connection-status-text">You're Offline</h4>
                    <h5 className="inter-regular">Please check your internet connection and try again.</h5>
                    <button className="inter-regular" onClick={handleIsOnline}>Reload</button>
               </div>
          </div>
     );
};

export default OfflineScreen;
