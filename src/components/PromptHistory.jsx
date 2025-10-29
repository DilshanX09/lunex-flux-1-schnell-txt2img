import { useEffect, useReducer, useRef, useState } from 'react'
import { FiPlus } from 'react-icons/fi';
import { MdOutlineCollections, MdOutlineLogout } from "react-icons/md";
import { useNavigate, useParams } from 'react-router';

import icon from '../assets/logo.svg';

const PromptHistory = ({ fetchConversation, promptList, loading }) => {

     let _id;
     let user;

     const navigate = useNavigate();

     const [isSelected, setIsSelected] = useState('');

     const checkAuthorization = () => {
          if (localStorage.getItem('user')) _id = JSON.parse(localStorage.getItem('user')).id;
          user = JSON.parse(localStorage.getItem('user'));
          return;
     }

     checkAuthorization();

     const shortenPrompt = (prompt) => {
          if (prompt.length > 30) return prompt.substring(0, 36) + ' ...';
          else return prompt;
     }

     const handleChatClick = (conversationId) => {
          navigate(`/c/${conversationId}`);
          fetchConversation(conversationId);
          return;
     }

     const logOut = () => {
          localStorage.removeItem('user');
          window.location.reload();
          return;
     }

     return (
          <div className='history-container'>

               {user &&
                    <div className='prompt-history-user-info'>
                         <div>
                              <h5 className='inter-regular'>Hello, {user.username}</h5>
                              <h5 className='inter-light'>{user.email}</h5>
                         </div>
                         <MdOutlineLogout onClick={logOut} />
                    </div>
               }

               <img src={icon} alt="Logo" className='logo' />

               <h5 className='inter-regular sub-title'>Application</h5>

               <div className='sub-navigation-links'>

                    <div className='sub-link' onClick={() => { navigate('/c'); window.location.reload(); }}>
                         <FiPlus style={{ color: '#D3D3D3' }} /> <p className='inter-regular' style={{ fontSize: '14px', color: '#D3D3D3' }}>Create new image</p>
                    </div>

                    <div className='sub-link' onClick={() => { navigate(`/u/collection/${_id}`) }}>
                         <MdOutlineCollections style={{ color: '#D3D3D3' }} /> <p className='inter-regular' style={{ fontSize: '14px', color: '#D3D3D3' }}>Collection</p>
                    </div>

               </div>

               <h5 className='inter-regular sub-title'>Chats</h5>

               <div className="history-list inter-regular">

                    {loading && user &&
                         Array.from({ length: 13 }).map((_, index) => {
                              return <div className='loading-animation' key={index}></div>
                         })
                    }

                    <ul>

                         {promptList?.map((prompt, index) => (

                              <a key={index}>
                                   <li className={isSelected === prompt.conversationId ? 'selected' : ''} onClick={() => {
                                        handleChatClick(prompt.conversationId);
                                        setIsSelected(prompt.conversationId);
                                   }}>
                                        {shortenPrompt(prompt.prompt)}
                                   </li>
                              </a>

                         ))}

                         {!user && <p className='inter-regular' style={{ paddingLeft: '20px' }}>Please log in to see your chat history.</p>}
                    </ul>
               </div>

          </div >
     )
}

export default PromptHistory;