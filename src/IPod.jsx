import './IPod.scss';
import { useReducer } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Menu from './components/Menu';
import Wheel from './components/Wheel';

function IPod() {
    const menuItems = [
        { text: "Music", path: "music" },
        { text: "Cover Flow", path: "coverflow" },
        { text: "Games", path: "games" },
        { text: "Settings", path: "settings" }
    ];

    const navigate = useNavigate();
    const location = useLocation();

    // A useState hook would normally suffice here, but since useReducer returns a dispatcher function that
    // is stable across renders, it can be used to update state from within effectful code.

    const [currentItem, setCurrentItem] = useReducer((state, action) => {
        let nextItem = state;
        if (action.direction === "clockwise") {
            nextItem += 1;
        }
        else if (action.direction === "anticlockwise") {
            nextItem -= 1;
        }
        if (nextItem < 0) {
            nextItem = menuItems.length - 1;
        }
        else if (nextItem >= menuItems.length) {
            nextItem = 0;
        }
        return nextItem;
    }, 0);

    const handleWheelClick = () => {
        if (location.pathname === '/') {
            navigate(menuItems[currentItem].path);
        }
    };

    const handleMenuClick = () => {
        navigate("/");
    }

    return (
        <div id="ipod-main">
            <div id="screen">
                <Routes>
                    <Route path="/music" element={<h1>Music</h1>} />
                    <Route path="/settings" element={<h1>Settings</h1>} />
                    <Route path="/coverflow" element={<h1>Coverflow</h1>} />
                    <Route path="/games" element={<h1>Games</h1>} />
                    <Route path="/" element={<Menu title="iPod.js" menuItems={menuItems} currentItem={currentItem} />} />
                </Routes>
            </div>
            <Wheel scrollMenu={setCurrentItem} wheelClicked={handleWheelClick} menuClicked={handleMenuClick} />
        </div>
    )
}

export default IPod;