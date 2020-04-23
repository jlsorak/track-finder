import React, { useState } from 'react'
import { FaPlay } from 'react-icons/fa'
import PropTypes from 'prop-types'

const Preview = ({ previewUrl }) => {
  const [showingTrackPreview, setShowingTrackPreview] = useState(false)

  if (!previewUrl) return <div>Preview unavailable</div>

  if (showingTrackPreview) {
    return (
      <video controls autoPlay data-testid='video' className='w-64 h-12 bg-white' name='media'>
        <source src={previewUrl} type='audio/mpeg' />
      </video>
    )
  }

  return (
    <button
      onClick={() => setShowingTrackPreview(true)}
      className='btn-indigo'
    >
      Preview track
      <FaPlay className='text-xs inline-icon-right' />
    </button>
  )
}

Preview.propTypes = {
  previewUrl: PropTypes.string
}

export default Preview
