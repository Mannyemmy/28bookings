import React from "react";
import TextLoop from "react-text-loop"

const RotatingText = () => {

 const rotatingtxt = [ "anything","cameras", "scooters", "DJ sets", "bikes", "tools", "consoles"];

  return (
     <TextLoop children={ rotatingtxt  } />
  )
}

export default RotatingText