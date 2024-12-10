// import UserIcon from "../assets/User.svg";

interface Props {
    username: string | null;
    logout: () => void;
}

const SidebarFooter: React.FC<Props> = ({ username, logout }) => {
    return (
        <div className="p-2 footer-container">
            <span className="mr-2 footer-username">
                {/* <img src={UserIcon} alt="User Icon" className="footer-icon" /> */}
                {username}
            </span>
            <button onClick={logout} className="form-button">
                Logout
            </button>
        </div>
    );
};

export default SidebarFooter;
