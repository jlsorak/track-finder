import React, { useState } from 'react'
import { FaPlay } from 'react-icons/fa'

const Preview = ({ previewUrl }) => {
  const [showingTrackPreview, setShowingTrackPreview] = useState(false)

  if (!previewUrl) return <div>Preview unavailable</div>

  if (showingTrackPreview) return (
    <video controls autoPlay className='w-64 h-12 bg-white' name="media">
      <source src={previewUrl} type="audio/mpeg" ></source>
    </video>
  )

  return (
    <button
      onClick={() => setShowingTrackPreview(true)}
      className='btn-indigo'
    >
      Preview track
      <FaPlay className='text-xs inline-icon-right'/>
    </button>
  )
}

export default Preview
