export const AuthMessages = {
    REGISTER_SUCCESS: "Rejestracja zakończona sukcesem",
    REGISTER_BAD_DATA:
        "Podane dane są nieprawidłowe, rejestracja nie powiodła się",
    REGISTER_ERROR: "Błąd podczas rejestracji",

    LOGIN_NOT_FOUND: "Nie znaleziono użytkownika",
    LOGIN_BAD_PASSWORD: "Nieprawidłowe hasło",
    LOGIN_SUCCESS: "Zalogowano pomyślnie",
    LOGIN_AUTHORIZATION_FAIL:
        "Nieprawidłowe dane do uwierzytelnienia przez token",
    LOGIN_ERROR: "Błąd podczas logowania",

    AUTHORIZATION_VERIFICATION: "Masz dostęp do chronionego zasobu",
};

export const CaseMessages = {
    CREATE_CASE_ERROR: "Nie udało się utworzyć sprawy",
    NONE_CASE_FOUND: "Nie znaleziono żadnych spraw",
    GET_CASE_LIST_ERROR: "Nie udało się pobrać listy spraw",
    SELECTED_CASE_NOT_FOUND: "Sprawa nie została znaleziona",
    GET_SELECTED_CASE_ERROR: "Błąd podczas pobierania sprawy",
    UPDATE_CASE_SUCCESS: "Wybrana sprawa została zaktualizowana",
    USER_CASES_NOT_AUTHORIZED: "Unauthorized access",
    CASE_TO_UPDATE_NOT_FOUND:
        "Nie znaleziono sprawy przeznaczonej do aktualizacji",
    UPDATE_CASE_ERROR: "Aktualizacja sprawy nie powiodła się",
    CASE_DELETE_SUCCES: "Wybrana sprawa została usunięta",
    CASE_TO_DELETE_NOT_FOUND:
        "Nie znaleziono sprawy przeznaczonej do usunięcia",
    CASE_DELETE_ERROR: "Nie udało się usunąć sprawy",
};

export const CourtMessages = {
    CREATE_COURT_ERROR: "Nie udało się utworzyć sądu",
    NONE_COURT_FOUND: "Nie znaleziono żadnych sądów",
    GET_COURTS_ERROR: "Nie udało się pobrać listy sądów",
    SELECTED_COURT_NOT_FOUND: "Sąd nie został znaleziony",
    GET_SELECTED_COURT_ERROR: "Błąd podczas pobierania danych sądu",
    UPDATE_COURT_SUCCESS: "Dane wybranego sądu zostały zaktualizowane",
    COURT_TO_UPDATE_NOT_FOUND:
        "Nie znaleziono sądu przeznaczonego do aktualizacji danych",
    UPDATE_COURT_ERROR: "Aktualizacja danych sądu nie powiodła się",
    DELETE_COURT_SUCCES: "Wybrany sąd został usunięty",
    COURT_TO_DELETE_NOT_FOUND:
        "Nie znaleziono sądu przeznaczonego do usunięcia",
    DELETE_COURT_ERROR: "Nie udało się usunąć sądu",
};

export const DepartmentMessages = {
    CREATE_DEPARTMENT_ERROR: "Nie udało się utworzyć departamentu",
    NONE_DEPARTMENT_FOUND: "Nie znaleziono żadnych departamentów",
    NONE_DEPARTMENT_FOUND_FOR_COURT:
        "Nie znaleziono departamentów przypisanych do wybranego sądu",
    GET_DEPARTMENTS_ERROR: "Nie udało się pobrać listy departamentów",
    SELECTED_DEPARTMENT_NOT_FOUND: "Departament nie został znaleziony",
    GET_SELECTED_DEPARTMENT_ERROR:
        "Błąd podczas pobierania danych departamentu",
    UPDATE_DEPARTMENT_SUCCESS:
        "Dane wybranego departamentu zostały zaktualizowane",
    DEPARTMENT_TO_UPDATE_NOT_FOUND:
        "Nie znaleziono departamentu przeznaczonego do aktualizacji danych",
    UPDATE_DEPARTMENT_ERROR: "Aktualizacja departamentu nie powiodła się",
    DELETE_DEPARTMENT_SUCCES: "Departament został usunięty",
    DEPARTMENT_TO_DELETE_NOT_FOUND:
        "Nie znaleziono departamentu przeznaczonego do usunięcia",
    DELETE_DEPARTMENT_ERROR: "Nie udało się usunąć departamentu",
};

export const MessageMessages = {
    CREATE_MESSAGE_ERROR: "Nie udało się utworzyć wiadomości",
    GET_CASE_MESSAGES_ERROR: "Nie udało się pobrać wiadomości",
    UPDATE_MESSAGE_ERROR: "Nie udało się zaktualizować wiadomości",
    DELETE_MESSAGE_ERROR: "Nie udało się usunąć wiadomości",
};

export const UserMessages = {
    CREATE_USER_ERROR: "Nie udało się utworzyć użytkownika",
    NONE_USER_FOUND: "Nie znaleziono żadnych użytkowników",
    GET_USERS_ERROR: "Nie udało się pobrać listy użytkowników",
    SELECTED_USER_NOT_FOUND: "Użytkownik nie został znaleziony",
    GET_SELECTED_USER_ERROR: "Błąd podczas pobierania danych użytkownika",
    UPDATE_USER_SUCCESS: "Dane wybranego użytkownika zostały zaktualizowane",
    USER_TO_UPDATE_NOT_FOUND:
        "Nie znaleziono użytkownika przeznaczonego do aktualizacji danych",
    UPDATE_USER_ERROR: "Aktualizacja użytkownika nie powiodła się",
    DELETE_USER_SUCCES: "Użytkownik został usunięty",
    USER_TO_DELETE_NOT_FOUND:
        "Nie znaleziono użytkownika przeznaczonego do usunięcia",
    DELETE_USER_ERROR: "Nie udało się usunąć użytkownika",
};

export const DocumentMessages = {
    ADD_DOCUMENT_ERROR: "Nie udało się dodać dokumentu",
    GET_DOCUMENTS_ERROR: "Nie udało się pobrać listy dokumentów",
    UPDATE_DOCUMENT_ERROR: "Nie udało się zaktualizować dokumentu",
    DELETE_DOCUMENT_ERROR: "Nie udało się usunąć dokumentu",
};

export const TestMessage = "Hello World!";

export const ServerLaunchMessage = (port: number) =>
    `Serwer uruchomiono na porcie ${port}`;
