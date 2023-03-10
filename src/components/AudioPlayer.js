import React, { useEffect, useRef } from 'react'

const AudioPlayer = ({user}) => {

    const ref=useRef()

    useEffect(()=>{
        user.videoTrack.play(ref.current)
    },[user.videoTrack])
  return (
    <div>
      <h1>{user.uid}</h1>
        <div 
        ref={ref}
        style={{width:"200px", height:"200px"}}>
        </div>
    </div>
  )
}

export default AudioPlayer