import { useEffect } from 'react';

export default function useClickOutside<T extends HTMLElement>(
    ref: React.RefObject<T>, 
    handleClickOutside: () => void, 
    ignoreRef?: React.RefObject<HTMLElement>,
) {
    useEffect(() => {
        function handleClick(event: MouseEvent) {
            if (
                (ref.current && !ref.current.contains(event.target as Node)) &&
                (!ignoreRef || (ignoreRef?.current && !ignoreRef.current.contains(event.target as Node)))
            ) {
                handleClickOutside();
            }
        }

        document.addEventListener('mousedown', handleClick);

        return () => {
            document.removeEventListener('mousedown', handleClick);
        };
    }, [ref, handleClickOutside]);
}