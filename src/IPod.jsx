import './IPod.scss';
import { useReducer } from 'react';
import { Routes, Route, useLocation, useNavigate } from 'react-router-dom';
import Menu from './components/Menu';
import Wheel from './components/Wheel';
import AppPlaceholder from './components/AppPlaceholder';

// Main iPod component
function IPod() {
    // List of menu items & destination URL paths
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

    // When the wheel is clicked, navigate to the currently selected menu item
    const handleWheelClick = () => {
        if (location.pathname === '/') {
            navigate(menuItems[currentItem].path);
        }
    };

    // Return to the main screen when the menu button is clicked
    const handleMenuClick = () => {
        navigate("/");
    }

    return (
        <div id="ipod-main">
            <div id="screen">
                {/* Route definitions */}
                <Routes>
                    <Route path="/music" element={<AppPlaceholder imagePath="/itunes.jpg" title="Music" />} />
                    <Route path="/settings" element={<AppPlaceholder imagePath="/settings.png" title="Settings" />} />
                    <Route path="/coverflow" element={<AppPlaceholder imagePath="/coverflow.png" title="Cover Flow" />} />
                    <Route path="/games" element={<AppPlaceholder imagePath="/dice.png" title="Games" />} />
                    <Route path="/" element={<Menu title="iPod.js" menuItems={menuItems} currentItem={currentItem} />} />
                </Routes>
            </div>
            <Wheel scrollMenu={setCurrentItem} wheelClicked={handleWheelClick} menuClicked={handleMenuClick} />
        </div>
    )
}

export default IPod;