import React from 'react'
import PropTypes from 'prop-types';

const Alert = ({ description, title }) => {

  return (
    <div className='alert' role='alert'>
      <strong className='font-bold'>{title} </strong>
      <span className='block sm:inline'>{description}</span>
    </div>
  )
}

Alert.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
}

export default Alert
