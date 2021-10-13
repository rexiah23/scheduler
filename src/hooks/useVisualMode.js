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
        const copyState = [...prev]
        copyState[copyState.length - 1] = newMode
        return copyState;
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
        const copyState = [...prev];
        copyState.pop();
        return copyState;
      })
    }


    return {mode, transition, back};
  }

export default useVisualMode

