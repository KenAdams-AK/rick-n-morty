import { useState, useEffect } from 'react';

export default function useDebounce<T>(value: T | (() => T), delay: number) {
  
  const [debouncedValue, setDebouncedValue] = useState<T>(() => {
    if (typeof value === 'function') {
      return (value as ()=> T)()
    } else {
      return value
    }
  })

  useEffect(() => {
    const timeoutId = setTimeout(() => {
    setDebouncedValue(value)
    }, delay)
    
    return () => clearTimeout(timeoutId)
  }, [value])
  
  return debouncedValue;
}