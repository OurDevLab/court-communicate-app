import React from "react";

interface Props {
    cases: { id: number; name: string }[];
    selectedCaseId: number | null;
    setSelectedCaseId: (id: number | null) => void;
}

const SidebarContent: React.FC<Props> = ({
    cases,
    selectedCaseId,
    setSelectedCaseId,
}: {
    cases: { id: number; name: string }[];
    selectedCaseId: number | null;
    setSelectedCaseId: (id: number | null) => void;
}) => {
    return (
        <div className="toggle-section">
            <div className="toggle-header">
                <h3>Twoje sprawy</h3>
            </div>
            <div className="toggle-content">
                <ul className="list">
                    {cases.map((caseItem) => (
                        <li
                            key={caseItem.id}
                            className={`list-item ${
                                selectedCaseId === caseItem.id
                                    ? "list-item-selected"
                                    : "list-item-default"
                            }`}
                            onClick={() => setSelectedCaseId(caseItem.id)}
                        >
                            {caseItem.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SidebarContent;
