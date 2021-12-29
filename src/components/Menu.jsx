import './Menu.scss';

// A menu component that receives a title, a list of menu items and the current item index as props
function Menu({ title, menuItems, currentItem }) {
    // Turns the list of menu items into an array of JSX Elements
    const menuElements = menuItems.map((item, index) => {
        let className = "menu-item";
        // Add an active class to the currently selected item
        if (index === currentItem) {
            className += " active";
        }
        return (<div className={className} key={index}>{item.text}</div>);
    });
    return (
        <div className="menu-container">
            <div className="menu">
                <div className="header">{title}</div>
                {menuElements}
            </div>
        </div>
    )
}

export default Menu;