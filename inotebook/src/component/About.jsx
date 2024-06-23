import React from 'react'

const About = (props) => {
  console.log(props);
  return (
    <div>
      <h1>{props.noteDesc}</h1>
    </div>
  )
}

export default About
