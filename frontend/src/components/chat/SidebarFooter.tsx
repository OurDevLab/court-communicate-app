import UserIcon from "../assets/User.svg";

const SidebarFooter = ({
    username,
    logout,
}: {
    username: string | null;
    logout: () => void;
}) => {
    return (
        <div className="p-2 footer-container">
            <span className="mr-2 footer-username">
                <img src={UserIcon} alt="User Icon" className="footer-icon" />
                {username}
            </span>
            <button onClick={logout} className="form-button">
                Logout
            </button>
        </div>
    );
};

export default SidebarFooter;
