import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteMemberAsync, loadMembersAsync, setToastShowing} from "../../redux/reducers/members/member.thunks";
import {useTranslation} from "react-i18next";
import ConfirmDelete from "../ConfirmDelete";

const Members = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const {isLoading, members, error, isDeleting, isToastShowing} = useSelector(state => state.members);
    const [modalOpen, setModalOpen] = useState(false);
    const [entityForDelete, setEntityForDelete] = useState(null);

    useEffect(() => {
        dispatch(loadMembersAsync());
        dispatch(setToastShowing(false));// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error)
                dispatch(setToastShowing(false));
            } else if (!isDeleting) {
                toast.warning("Delete was successful!")
                dispatch(setToastShowing(false));
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeleting])

    const handleDeleteButton = (entity) => {
        setModalOpen(true);
        setEntityForDelete(entity)
    }

    return (
        <div className="container py-4">

            {modalOpen &&
                <ConfirmDelete
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    entityForDelete={entityForDelete}
                    setEntityForDelete={setEntityForDelete}
                    functionToExecute={deleteMemberAsync}
                />
            }

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2 className="mb-0 fw-bold">
                    {t("MEMBER MANAGER")}
                </h2>

                <Link to="/members/add" className="btn btn-dark">
                    + {t("Add")}
                </Link>

            </div>

            {/* STATUS */}
            {isLoading && <div className="alert alert-info">Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* TABLE CARD */}
            <div className="card shadow-sm border-0">
                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-dark text-center">
                        <tr>
                            <th>#</th>
                            <th>{t("Photo")}</th>
                            <th>{t("Last name")}</th>
                            <th>{t("Name")}</th>
                            <th>{t("Second name")}</th>
                            <th>{t("Institution/Place")}</th>
                            <th>{t("Contest")}</th>
                            <th>{t("Performances")}</th>
                            <th>{t("Actions")}</th>
                        </tr>
                        </thead>

                        <tbody className="text-center">

                        {members?.map((member, idx) => (
                            <tr key={member.id}>

                                <td className="text-muted">
                                    {idx + 1} ({member.id})
                                </td>

                                <td>
                                    {member.photo ? (
                                        <img
                                            src={member.photo}
                                            alt="member"
                                            className="rounded"
                                            style={{
                                                width: "45px",
                                                height: "60px",
                                                objectFit: "cover"
                                            }}
                                        />
                                    ) : (
                                        <span className="text-muted">—</span>
                                    )}
                                </td>

                                <td>{member.lastName}</td>
                                <td>{member.firstName}</td>
                                <td>{member.secondName}</td>
                                <td className="text-muted small">
                                    {member.description}
                                </td>

                                <td>
                                    {member.contest?.name}
                                </td>

                                <td>
                                    {member.performances?.map((p) => (
                                        <span
                                            key={p.id}
                                            className="badge bg-secondary me-1 mb-1"
                                        >
                                        {p.name}
                                    </span>
                                    ))}
                                </td>

                                <td>
                                    <div className="d-flex gap-2 justify-content-center">

                                        <Link
                                            to={`/members/edit/${member.id}`}
                                            className="btn btn-sm btn-primary"
                                        >
                                            {t("Edit")}
                                        </Link>

                                        <button
                                            onClick={() => handleDeleteButton(member)}
                                            className="btn btn-sm btn-danger"
                                        >
                                            {t("Delete")}
                                        </button>

                                    </div>
                                </td>

                            </tr>
                        ))}

                        </tbody>
                    </table>

                </div>
            </div>

        </div>
    );
}
export default Members