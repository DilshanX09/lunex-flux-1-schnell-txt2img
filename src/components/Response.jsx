import { FiDownload } from 'react-icons/fi'
import icon from '../assets/logo.svg';

const Response = ({ message, handleImageOpen, handleDownload }) => {

     function formatDateTime(date) {
          if (!(date instanceof Date) || isNaN(date)) {
               console.error("Invalid date:", date);
               return "";
          }

          const year = date.getFullYear();
          const month = String(date.getMonth() + 1).padStart(2, "0");
          const day = String(date.getDate()).padStart(2, "0");

          let hours = date.getHours();
          const minutes = String(date.getMinutes()).padStart(2, "0");
          const ampm = hours >= 12 ? "PM" : "AM";
          hours = hours % 12 || 12;

          return `${year}-${month}-${day} , ${hours}.${minutes} ${ampm}`;
     }

     return (
          <div className='chat-bubble bot'>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={icon} alt='lunex-logo' />
                    <p className='inter-regular bot-name'>Lunex</p>
               </div>
               <div className='images-list'>
                    {message.images.map((src, i) => (
                         <div className='generated-image-box' key={i}>
                              <div className='images-con' onClick={() => handleImageOpen(src)}>
                                   <img src={src} className='generated-image' alt={`Generated ${i + 1}`} />
                              </div>
                              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                   <h5 className='inter-medium' style={{ color: 'gray', paddingLeft: '5px' }}>{formatDateTime(message.time)}</h5>
                                   <FiDownload className='download-icon' onClick={() => handleDownload(src)} />
                              </div>
                         </div>
                    ))}
               </div>
          </div >
     )
}

export default Response;