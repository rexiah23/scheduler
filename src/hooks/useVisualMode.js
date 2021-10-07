import { useEffect, useState } from 'react'; 

const useVisualMode = initial => {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([initial]);
  
  useEffect(() => {
    setMode(history.slice(-1)[0])
  }, [history])

  const transition = (newMode, replace = false) => {
   
    if (replace) {
      setHistory(prev => {
        const copy = [...prev]
        copy[copy.length - 1] = newMode
        return copy;
      })
      return;
    }

    setHistory(prev => {
        return  [...prev, newMode];
      })
    }
    
    
    const back = () => {
      if (history.length === 1) {
        return mode; 
      }
      
      setHistory(prev => {
        const copy = [...prev];
        copy.pop();
        return copy;
      })
    }


    return {mode, transition, back};
  }

export default useVisualMode

