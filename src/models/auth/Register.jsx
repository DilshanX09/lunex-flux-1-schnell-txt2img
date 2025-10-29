import React from 'react'
import { IoClose } from 'react-icons/io5'

export default function Register({ setAuthModelIsOpen, setEmail, setPassword, setUsername, register, setAuthOption }) {
     return (
          <div className='second-container' style={{ height: '530px' }}>
               <IoClose className='close-btn-auth-model' onClick={() => setAuthModelIsOpen(false)} />
               <div className="content">
                    <span className='inter-semibold'>Create a new Account</span>
                    <p className='inter-thin'>Sign in to explore, create, and save breathtaking images generated from your ideas.</p>

                    <div className="auth">

                         <input type="text" id="username" name="username" onChange={(e) => setUsername(e.target.value)} placeholder='Username' className='inter-regular' required />

                         <input type="text" id="email" name="email" onChange={(e) => setEmail(e.target.value)} placeholder='Email' className='inter-regular' required />

                         <input type="password" id="password" name="password" onChange={(e) => setPassword(e.target.value)} placeholder='Password' className='inter-regular' required />

                         <button className='submit-btn inter-regular' onClick={register}>Create a new account</button>

                         <span className='inter-regular'>Do you have an account? <a href="#" className='inter-regular text-white' onClick={() => setAuthOption('login')}>Authenticate your account</a></span>
                    </div>
               </div>
          </div>
     )
}
