import './Wheel.scss';
import ZingTouch from 'zingtouch';
import { useRef, useCallback } from 'react';

function Wheel({ wheelClicked, menuClicked, scrollMenu }) {
    const angle = useRef(0);

    // When the wheel is rendered, this callback binds a rotation event listener to it
    const wheelRef = useCallback((ref) => {
        if (!ref) {
            return;
        }
        const region = ZingTouch.Region(ref);
        region.bind(ref, 'rotate', (event) => {
            angle.current += event.detail.distanceFromLast;
            if (Math.floor(angle.current) >= 30) {
                angle.current = 0;
                scrollMenu({ direction: 'clockwise' });
            }
            else if (Math.floor(angle.current) <= -30) {
                angle.current = 0;
                scrollMenu({ direction: 'anticlockwise' });
            }
        })
    }, [scrollMenu]);

    return (
        <div id="wheel-container">
            <div id="wheel-select" onClick={wheelClicked}></div>
            <div id="wheel-outer" ref={wheelRef} draggable="false">
                <div id="wheel-menu" draggable="false" onClick={menuClicked}>Menu</div>
                <div id="wheel-prev" draggable="false" >Prev</div>
                <div id="wheel-next" draggable="false" >Next</div>
                <div id="wheel-play-pause" draggable="false">Play</div>
            </div>
        </div>
    )
}

export default Wheel;