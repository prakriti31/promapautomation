// client/src/hooks/useReveal.js
import { useEffect } from 'react';

export default function useReveal(ref) {
    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // start hidden
        el.classList.add('scroll-fade');

        // reveal when 20 % of it is in view
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    el.classList.add('reveal');
                    io.unobserve(el);           // run only once
                }
            },
            { threshold: 0.2 },
        );

        io.observe(el);
        return () => io.disconnect();
    }, [ref]);
}
