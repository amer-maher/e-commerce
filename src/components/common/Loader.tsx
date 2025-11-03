import React from 'react'
import { Spinner, Container } from 'react-bootstrap'

interface LoaderProps {
  size?: 'sm' | 'md' | 'lg'
  centered?: boolean
  text?: string
}

const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  centered = true,
  text = 'Loading...'
}) => {
  const spinnerSize = size === 'sm' ? '' : size === 'lg' ? ' spinner-border-lg' : ''
  
  const content = (
    <>
      <Spinner
        animation="border"
        role="status"
        className={`me-2${spinnerSize}`}
      >
        <span className="visually-hidden">Loading...</span>
      </Spinner>
      {text && <span>{text}</span>}
    </>
  )

  if (centered) {
    return (
      <Container className="d-flex justify-content-center align-items-center p-5">
        {content}
      </Container>
    )
  }

  return content
}

export default Loader
