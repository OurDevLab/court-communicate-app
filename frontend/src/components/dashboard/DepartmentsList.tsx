import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";
import { isArray } from "lodash";

import { ServerPaths, RoutesPaths, ClientMessages } from "../../config";
const { COURTS, DEPARTMENTS, PREVIEW, ADD, EDIT } = RoutesPaths;
const {
    ERROR_FETCHING_DEPARTMENTS,
    CONFIRM_DEPARTMENT_DELETION,
    DEPARTMENT_DELETION_SUCCESS,
    DEPARTMENT_DELETION_ERROR,
} = ClientMessages;

const DepartmentsList: React.FC = () => {
    const { id: courtId } = useParams();
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDepartments = async () => {
        try {
            const response = await api.get(
                `${ServerPaths.DEPARTMENTS}${ServerPaths.COURT}/${courtId}`
            );
            setDepartments(response.data);
        } catch (err) {
            setError(ERROR_FETCHING_DEPARTMENTS + err);
        } finally {
            setLoading(false);
        }
    };

    const deleteDepartment = async (departmentId: number) => {
        if (window.confirm(CONFIRM_DEPARTMENT_DELETION)) {
            try {
                await api.delete(`${ServerPaths.DEPARTMENTS}/${departmentId}`);
                alert(DEPARTMENT_DELETION_SUCCESS);
                setDepartments((prev) =>
                    prev.filter((department) => department.id !== departmentId)
                );
            } catch (err) {
                alert(DEPARTMENT_DELETION_ERROR + err);
            }
        }
    };

    useEffect(() => {
        fetchDepartments();
    }, [courtId]);

    if (loading) return <p>Wczytywanie departamentów...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div className="container">
            <button onClick={() => navigate(`${COURTS}${PREVIEW}/${courtId}`)}>
                Wróć do podglądu sądu
            </button>
            <h1 className="header">Struktura organizacyjna</h1>
            <button
                className="add-button"
                onClick={() => navigate(`${DEPARTMENTS}${ADD}/${courtId}`)}
            >
                Dodaj departament
            </button>
            <ul className="list">
                {isArray(departments) &&
                    departments.map((department) => (
                        <li key={department.id} className="list-item">
                            <strong>{department.name}</strong>
                            <div className="actions">
                                <button
                                    className="edit-button"
                                    onClick={() =>
                                        navigate(
                                            `${DEPARTMENTS}${EDIT}/${department.id}`
                                        )
                                    }
                                >
                                    Edytuj
                                </button>
                                <button
                                    className="delete-button"
                                    onClick={() =>
                                        deleteDepartment(department.id)
                                    }
                                >
                                    Usuń
                                </button>
                            </div>
                        </li>
                    ))}
            </ul>
        </div>
    );
};

export default DepartmentsList;
