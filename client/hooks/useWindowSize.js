import { useEffect, useState } from 'react'
import debounce from '../utils/debounce';

export default function useWindowSize() {
  const [rightFlush,setRightFlush] = useState(undefined);
  useEffect(()=>{
    if (typeof window !== 'undefined') {
      function handleResize() {
        setRightFlush(window.innerWidth)
      }

      const debounceRes = debounce(handleResize, 1000);

      window.addEventListener('resize', debounceRes)

      return () => window.removeEventListener('resize', debounceRes)
    }
  }, [])
  return {rightFlush}
}