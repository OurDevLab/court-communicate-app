import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api";

const DepartmentsList: React.FC = () => {
    const { id: courtId } = useParams();
    const navigate = useNavigate();

    const [departments, setDepartments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchDepartments = async () => {
        try {
            const response = await api.get(`/departments/byCourt/${courtId}`);
            setDepartments(response.data);
        } catch (err) {
            setError("Błąd podczas pobierania departamentów:");
        } finally {
            setLoading(false);
        }
    };

    const deleteDepartment = async (departmentId: number) => {
        if (window.confirm("Czy na pewno chcesz usunąć ten departament?")) {
            try {
                await api.delete(`/departments/${departmentId}`);
                alert("Departament został usunięty");
                setDepartments((prev) =>
                    prev.filter((department) => department.id !== departmentId)
                );
            } catch (err) {
                alert("Błąd podczas usuwania departamentu:" + err);
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
            <button onClick={() => navigate(`/courts/preview/${courtId}`)}>
                Wróć do podglądu sądu
            </button>
            <h1>Struktura organizacyjna sądu</h1>
            <button onClick={() => navigate(`/departments/add/${courtId}`)}>
                Dodaj departament
            </button>
            <ul>
                {departments.map((department) => (
                    <li key={department.id}>
                        <strong>{department.name}</strong>
                        <button
                            onClick={() =>
                                navigate(`/departments/edit/${department.id}`)
                            }
                        >
                            Edytuj
                        </button>
                        <button onClick={() => deleteDepartment(department.id)}>
                            Usuń
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default DepartmentsList;
