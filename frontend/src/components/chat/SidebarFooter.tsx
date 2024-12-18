import PersonIcon from '@mui/icons-material/Person';

interface Props {
    username: string | null;
    logout: () => void;
}

const SidebarFooter: React.FC<Props> = ({ username, logout }) => {
    return (
        <div className="footer-container">
            <span className="footer-username">
                <PersonIcon className="footer-icon" />
                {username}
            </span>
            <button onClick={logout} className="form-button">
                Wyloguj
            </button>
        </div>
    );
};

export default SidebarFooter;
