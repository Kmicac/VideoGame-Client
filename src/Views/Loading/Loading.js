import React from 'react'
import './loading.css';

const Loading = () => {
  
  return (
    <div className='container_loader'>
      <div className="lds-ripple">
        <div></div>
        <div></div>
        </div>
    </div>
  )
}

export default Loading