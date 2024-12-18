import React from "react";

interface Props {
    cases: { case_id: number; case_identifier: string }[];
    selectedCaseId: number | null;
    setSelectedCaseId: (id: number | null) => void;
}

const SidebarContent: React.FC<Props> = ({
    cases,
    selectedCaseId,
    setSelectedCaseId,
}:Props) => {
    return (
        <div className="toggle-section">
            <div className="toggle-header">
                <h3>Twoje sprawy</h3>
            </div>
            <div className="toggle-content">
                <ul className="list">
                    {cases.map((caseItem) => (
                        <li
                            key={caseItem.case_id}
                            className={`list-item ${
                                selectedCaseId === caseItem.case_id
                                    ? "list-item-selected"
                                    : "list-item-default"
                            }`}
                            onClick={() => setSelectedCaseId(caseItem.case_id)}
                        >
                            {caseItem.case_identifier}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SidebarContent;
