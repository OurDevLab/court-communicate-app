import React, { useEffect, useState } from "react";
import api from "../../api";

const Dashboard: React.FC = () => {
    const [message, setMessage] = useState("");

    useEffect(() => {
        api.get("/protected")
            .then((response) => setMessage(response.data.message))
            .catch((error) => console.error("Brak dostępu:", error));
    }, []);

    return (
        <div>
            <h1>Panel użytkownika</h1>
            <p>{message}</p>
        </div>
    );
};

export default Dashboard;
