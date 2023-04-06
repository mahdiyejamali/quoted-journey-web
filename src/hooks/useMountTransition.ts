import { useEffect, useState } from "react";

export default function useMountTransition(isMounted: boolean, unmountDelay: number) {
    const [hasTransitionedIn, setHasTransitionedIn] = useState(false);
  
    useEffect(() => {
      let timeoutId: NodeJS.Timeout;
  
      if (isMounted && !hasTransitionedIn) {
        timeoutId = setTimeout(() => setHasTransitionedIn(true), unmountDelay);
      } else if (!isMounted && hasTransitionedIn) {
        timeoutId = setTimeout(() => setHasTransitionedIn(false), unmountDelay);
      }
  
      return () => {
        clearTimeout(timeoutId);
      }
    }, [unmountDelay, isMounted, hasTransitionedIn]);
  
    return hasTransitionedIn;
}