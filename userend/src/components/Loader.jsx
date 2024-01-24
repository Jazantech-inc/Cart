import React from 'react'

const Loader = () => {
  return  (
      <div className='fixed inset-0 bg-primary z-[9999] flex items-center justify-center opacity-80'>
             <div className="w-10 h-10 border-2 border-dashed border-white border-t-transparent rounded-full animate-spin"> </div>
      </div>
  )
}
export default Loader
