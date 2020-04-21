import React, { useState } from 'react'
import { FaHeart, FaRegHeart } from 'react-icons/fa'

const Track = ({ track, index }) => {
  const [showTrackPreview, setShowTrackPreview ] = useState(false)

  const { artists, album, name, uri, durationMs, previewUrl } = track

  const artistNames = artists.map((artist, index) => {
    const link = <a href={artist.uri}>{artist.name}</a>
    return artists.length - 1 !== index
      ? <>{link}, </>
      : link
  })

  const hasTrackPreview = track.previewUrl

  return (
    <li className='flex my-6' key={`track-${index}`}>
      <div className='flex-shrink-0'>
        <div className='flex items-center'>
          <button>
            <FaRegHeart className='text-gray-600 hover:text-pink-600' />
            <span className='sr-only'>Favourite {track.name}</span>
          </button>
          <img className='w-12 h-12 md:w-24 md:h-24 rounded ml-3 md:ml-6' src={album.images[1].url}></img>
        </div>
      </div>
      <div className='md:flex justify-between w-full mx-1 md:m-4'>
        <div>
          <div>
            <div className='font-bold text-lg'>{track.name}</div>
            <div>{artistNames}</div>
          </div>
        </div>
        {hasTrackPreview && (
          <div>
            {showTrackPreview ?
              <video autoplay controls className='w-64 h-12' name="media">
                <source src={track.previewUrl} type="audio/mpeg" ></source>
              </video>
              :
              <button onClick={() => setShowTrackPreview(true)}>Preview track</button>
            }
          </div>
        )}
      </div>
    </li>
  )
}

export default Track
