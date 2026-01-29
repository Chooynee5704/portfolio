import { useEffect, useRef, useState } from 'react';
import blackRunRight1 from 'tsneko/example/assets/black/erun1.gif';
import blackRunRight2 from 'tsneko/example/assets/black/erun2.gif';
import blackRunLeft1 from 'tsneko/example/assets/black/wrun1.gif';
import blackRunLeft2 from 'tsneko/example/assets/black/wrun2.gif';
import whiteRunRight1 from 'tsneko/example/assets/white/erun1.gif';
import whiteRunRight2 from 'tsneko/example/assets/white/erun2.gif';
import whiteRunLeft1 from 'tsneko/example/assets/white/wrun1.gif';
import whiteRunLeft2 from 'tsneko/example/assets/white/wrun2.gif';
import calicoRunRight1 from 'tsneko/example/assets/calico/erun1.gif';
import calicoRunRight2 from 'tsneko/example/assets/calico/erun2.gif';
import calicoRunLeft1 from 'tsneko/example/assets/calico/wrun1.gif';
import calicoRunLeft2 from 'tsneko/example/assets/calico/wrun2.gif';

type Skin = 'black' | 'white' | 'calico';

const skins: Record<Skin, { right: string[]; left: string[] }> = {
    black: {
        right: [blackRunRight1, blackRunRight2],
        left: [blackRunLeft1, blackRunLeft2],
    },
    white: {
        right: [whiteRunRight1, whiteRunRight2],
        left: [whiteRunLeft1, whiteRunLeft2],
    },
    calico: {
        right: [calicoRunRight1, calicoRunRight2],
        left: [calicoRunLeft1, calicoRunLeft2],
    },
};

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

type ScreenPetProps = {
    lane: number;
    speed: number;
    startOffset: number;
    jumpBoost?: number;
    skin: Skin;
};

const ScreenPet = ({ lane, speed, startOffset, jumpBoost = 1, skin }: ScreenPetProps) => {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const [frameIndex, setFrameIndex] = useState(0);
    const [direction, setDirection] = useState<1 | -1>(1);
    const skinFrames = skins[skin];

    useEffect(() => {
        const media = window.matchMedia('(prefers-reduced-motion: reduce)');
        if (media.matches) return;

        let frameTimer: number | undefined;
        let rafId: number | undefined;

        const state = {
            x: 0,
            y: 0,
            vx: speed,
            vy: 0,
            dir: 1,
            lastTime: performance.now(),
            nextJumpAt: performance.now() + randomBetween(1800, 4200),
            width: 64,
        };

        const syncBounds = () => {
            const rect = containerRef.current?.getBoundingClientRect();
            if (rect?.width) {
                state.width = rect.width;
            }
        };

        const step = (time: number) => {
            const dt = Math.min((time - state.lastTime) / 1000, 0.04);
            state.lastTime = time;

            const maxX = Math.max(window.innerWidth - state.width, 0);
            state.x += state.vx * state.dir * dt;

            if (state.x <= 0) {
                state.x = 0;
                state.dir = 1;
                setDirection(1);
            } else if (state.x >= maxX) {
                state.x = maxX;
                state.dir = -1;
                setDirection(-1);
            }

            if (time >= state.nextJumpAt && state.y === 0) {
                state.vy = -420 * jumpBoost;
                state.nextJumpAt = time + randomBetween(2500, 6200);
            }

            if (state.y < 0 || state.vy !== 0) {
                state.y += state.vy * dt;
                state.vy += 1400 * dt;
                if (state.y > 0) {
                    state.y = 0;
                    state.vy = 0;
                }
            }

            if (containerRef.current) {
                containerRef.current.style.transform = `translate3d(${state.x}px, ${state.y - lane}px, 0) scale(0.82)`;
            }

            rafId = window.requestAnimationFrame(step);
        };

        frameTimer = window.setInterval(() => {
            setFrameIndex(prev => (prev + 1) % skinFrames.right.length);
        }, 120);

        [...skinFrames.right, ...skinFrames.left].forEach((src) => {
            const img = new Image();
            img.src = src;
        });

        state.x = Math.max(startOffset, 0);
        syncBounds();
        window.addEventListener('resize', syncBounds);
        rafId = window.requestAnimationFrame(step);

        return () => {
            if (frameTimer) window.clearInterval(frameTimer);
            if (rafId) window.cancelAnimationFrame(rafId);
            window.removeEventListener('resize', syncBounds);
        };
    }, [skinFrames, lane, speed, startOffset, jumpBoost]);

    const frames = direction === 1 ? skinFrames.right : skinFrames.left;

    return (
        <div
            ref={containerRef}
            className="fixed bottom-0 left-0 z-30 pointer-events-none w-12 h-12"
            style={{ transform: 'translate3d(0, 0, 0)' }}
        >
            <img
                src={frames[frameIndex]}
                alt="Pet runner"
                className="w-full h-full object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.2)]"
            />
        </div>
    );
};

const ScreenPets = () => {
    return (
        <>
            <ScreenPet lane={0} speed={140} startOffset={40} skin="black" />
            <ScreenPet lane={0} speed={170} startOffset={260} jumpBoost={1.1} skin="white" />
            <ScreenPet lane={0} speed={120} startOffset={520} jumpBoost={0.9} skin="calico" />
        </>
    );
};

export default ScreenPets;
