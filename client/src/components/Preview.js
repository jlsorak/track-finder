import React, { useState } from 'react'
import { FaPlay } from 'react-icons/fa'

const Preview = ({ previewUrl }) => {
  const [showingTrackPreview, setShowingTrackPreview] = useState(false)

  if (!previewUrl) return <div>Preview unavailable</div>

  if (showingTrackPreview) return (
    <video controls autoPlay className='w-64 h-12' name="media">
      <source src={previewUrl} type="audio/mpeg" ></source>
    </video>
  )

  return (
    <button
      onClick={() => setShowingTrackPreview(true)}
      className='bg-indigo-100 hover:bg-indigo-200 rounded-lg py-2 px-4 inline-flex items-center'
    >
      Preview track
      <FaPlay className='ml-1 text-xs'/>
    </button>
  )
}

export default Preview
