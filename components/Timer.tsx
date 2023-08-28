"use client"

import { useEffect, useState } from "react";

const Timer = () => {

  const [seconds, setSeconds] = useState(0)
  useEffect(() => {
    console.log("Mounting")
    const interval = setInterval(() => setSeconds((seconds) => seconds + 1), 1000)
    return () => {
      console.log("Unmounting")
      clearInterval(interval)
    }
  }, [])
  return ( 
    <div>
        {seconds}
    </div>
   );
}
 
export default Timer;