import React from 'react'
import { Link } from 'react-router-dom'

export default function ErrorPage() {
  return (
    <div style={{"fontSize":"4rem","textAlign":'center'}}>
        <h3 >Error 404</h3>
        <Link to="/">Go Back</Link>
    </div>
  )
}
