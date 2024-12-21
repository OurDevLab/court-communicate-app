const ClientMessages = {
    TOKEN_EXPIRED: "Token wygasł",
    TOKEN_VALIDATION_ERROR: "Wystąpił błąd podczas pobrania danych z tokena:",
    ERROR_FETCHING_TOKEN: "Brak tokena w odpowiedzi serwera.",
    LOGIN_ERROR: "Błąd podczas logowania",
    REGISTER_SUCCESS: "Rejestracja zakończona sukcesem",
    REGISTER_ERROR: "Błąd podczas rejestracji",
    ERROR_FETCHING_CASES: "Wystąpił błąd podczas wczytywania listy spraw:",
    ERROR_FETCHING_MESSAGES:
        "Wystąpił błąd podczas pobierania listy wiadomości:",
    MISSING_SENDER_OR_SELECTED_ID:
        "Wiadomość nie mogła zostać wysłana z uwagi na brak identyfikatora użytkownika bądź sprawy",
    CONFIRM_CASE_DELETION: "Czy na pewno chcesz usunąć tę sprawę?",
    CASE_DELETION_SUCCESS: "Sprawa została usunięta",
    CASE_DELETION_ERROR: "Błąd podczas usuwania sprawy:",
    ERROR_FETCHING_COURTS: "Błąd podczas pobierania sądów:",
    CONFIRM_COURT_DELETION: "Czy na pewno chcesz usunąć ten sąd?",
    COURT_DELETION_SUCCESS: "Sąd został usunięty.",
    COURT_DELETION_ERROR: "Błąd podczas usuwania sądu:",
    STATS_APP_INFO:
        "Uzyskaj dostęp do statystyk w zewnętrznej aplikacji StatsApp",
    ERROR_FETCHING_DEPARTMENTS: "Błąd podczas pobierania departamentów:",
    CONFIRM_DEPARTMENT_DELETION: "Czy na pewno chcesz usunąć ten departament?",
    DEPARTMENT_DELETION_SUCCESS: "Departament został usunięty",
    DEPARTMENT_DELETION_ERROR: "Błąd podczas usuwania departamentu:",
    ERROR_FETCHING_USERS: "Błąd podczas pobierania użytkowników:",
    CONFIRM_USER_DELETION: "Czy na pewno chcesz usunąć tego użytkownika?",
    USER_DELETION_SUCCESS: "Użytkownik został usunięty",
    USER_DELETION_ERROR: "Błąd podczas usuwania użytkownika:",
    ERROR_FETCHING_DATA: "Błąd podczas pobierania danych:",
    AUTHENTICATION_ERROR: "Nie jesteś zalogowany.",
    CASSATION_ADDING_SUCCESS: "Skarga kasacyjna została przesłana.",
    CASSATION_ADDING_ERROR: "Błąd podczas dodawania skargi kasacyjnej",
    CASSATION_ADDING_FAILED: "Nie udało się przesłać skargi kasacyjnej.",
    COMPLAINT_ADDING_SUCCESS: "Skarga została przesłana.",
    COMPLAINT_ADDING_ERROR: "Błąd podczas przesyłania skargi",
    COMPLAINT_ADDING_FAILED: "Nie udało się przesłać skargi.",
    JUDGMENT_ADDING_SUCCESS: "Wyrok został dodany.",
    JUDGMENT_ADDING_ERROR: "Błąd podczas dodawania wyroku",
    JUDGMENT_ADDING_FAILED: "Nie udało się dodać wyroku.",
    ORDINANCE_ADDING_SUCCESS: "Zarządzenie zostało dodane.",
    ORDINANCE_ADDING_ERROR: "Błąd podczas dodawania zarządzenia",
    ORDINANCE_ADDING_FAILED: "Nie udało się dodać zarządzenia.",
    CASE_ADDING_SUCCESS: "Sprawa została dodana",
    CASE_ADDING_ERROR: "Błąd podczas dodawania sprawy:",
    COURT_ADDING_SUCCES: "Sąd został dodany",
    COURT_ADDING_ERROR: "Błąd podczas dodawania sądu:",
    DEPARTMENT_ADDING_SUCCESS: "Departament został dodany",
    DEPARTMENT_ADDING_ERROR: "Błąd podczas dodawania departamentu:",
    USER_ADDING_SUCCESS: "Użytkownik został dodany",
    USER_ADDING_ERROR: "Błąd podczas dodawania użytkownika:",
    CASE_PREVIEW_ERROR: "Wystąpił błąd podczas pobierania szczegółów sprawy:",
    COURT_PREVIEW_ERROR: "Wystąpił błąd podczas pobierania danych sądu:",
    USERS_PREVIEW_ERROR: "Wystąpił błąd podczas pobierania danych użytkownika",
    CASE_EDITING_ERROR: "Błąd podczas pobierania sprawy:",
    CASE_EDITING_SUCCESS: "Sprawa została zaktualizowana",
    COURT_EDITING_ERROR: "Błąd podczas pobierania sądu:",
    COURT_EDITING_SUCCESS: "Sąd został zaktualizowany",
    DEPARTMENT_EDITING_ERROR: "Błąd podczas pobierania departamentu:",
    DEPARTMENT_EDITING_SUCCESS: "Departament został zaktualizowany",
    USER_EDITING_ERROR: "Błąd podczas pobierania użytkownika:",
    USER_EDITING_SUCCESS: "Użytkownik został zaktualizowany",
};

export default ClientMessages;