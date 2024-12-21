const ConfigVariables = {
    serverURL: import.meta.env.VITE_API_URL || "http://localhost:5001",
    webSocketURL: import.meta.env.VITE_WS_URL,
    webSocketTimeout: 1000,
    appVersion: import.meta.env.VITE_VERSION,
    tokenKey: "token",
    authHeader: "Bearer",
    storageEvent: "storage",
    messageEvent: "message",
    closeEvent: "close",
};

export default ConfigVariables;
