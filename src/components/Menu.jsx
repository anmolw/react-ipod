import './Menu.scss';

// A menu component that receives a title, a list of menu items and the current item index as props
function Menu({ title, menuItems, currentItem }) {
    const menuElements = menuItems.map((item, index) => {
        let className = "menu-item";
        // Add an active class to the currently selected item
        if (index === currentItem) {
            className += " active";
        }
        return (<div className={className} key={index}>{item.text}</div>);
    });
    return (
        <div className="menu">
            <div className="header">{title}</div>
            {menuElements}
        </div>
    )
}

export default Menu;