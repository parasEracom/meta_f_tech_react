import React from 'react'
import './Loader.css'
const Loader = () => {
    return (
        <div className='Loaderbg'>
            <div className='LoaderDiv'>
                <div className="lds-spinner"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
            </div>
        </div>
    )
}

export default Loader