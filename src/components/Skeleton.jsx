import icon from '../assets/logo.svg';

export default function Skeleton({ message }) {
     return (
          <>
               <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <img src={icon} alt='lunex-logo' />
                    <p className='inter-regular bot-name'>Lunex • <span className='inter-regular' style={{ fontSize: '13px' }}>Loading...</span></p>
               </div>
               <div className='parent'>
                    {Array.from({ length: message.count }).map((_, i) => (
                         <div key={i} className='image-skeleton' />
                    ))}
               </div>
          </>
     )
}
