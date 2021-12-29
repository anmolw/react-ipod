import './AppPlaceholder.scss';

// A placeholder component that displays an app icon and title
function AppPlaceholder({ title, imagePath }) {
    return (
        <div className="app-container">
            <img src={imagePath} className="app-icon" alt={title} />
            <div className="app-title">{title}</div>
        </div>

    )
}

export default AppPlaceholder;