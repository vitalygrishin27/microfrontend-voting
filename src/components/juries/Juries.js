import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteJuryAsync, loadJuriesAsync, setToastShowing} from "../../redux/reducers/jury/jury.thunks";
import {loadContestsAsync} from "../../redux/reducers/contests/contest.thunks";
import ConfirmDelete from "../ConfirmDelete";
import {useTranslation} from "react-i18next";

const Juries = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isLoading, juries, error, isDeleting, isToastShowing} = useSelector(state => state.juries);
    const {contests} = useSelector(state => state.contests);
    const [modalOpen, setModalOpen] = useState(false);
    const [entityForDelete, setEntityForDelete] = useState(null);

    useEffect(() => {
        if (!contests) {
            dispatch(loadContestsAsync())
        }
        dispatch(loadJuriesAsync());
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

    const handleDeleteButton = (jury) => {
        setModalOpen(true);
        setEntityForDelete(jury)
    }

    return (
        <div className="container py-4">

            {modalOpen &&
                <ConfirmDelete
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    entityForDelete={entityForDelete}
                    setEntityForDelete={setEntityForDelete}
                    functionToExecute={deleteJuryAsync}
                />
            }

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2 className="mb-0 fw-bold">
                    {t("JURIES MANAGER")}
                </h2>

                <Link to="/juries/add" className="btn btn-dark">
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
                            <th>{t("Position")}</th>
                            <th>{t("Login")}</th>
                            <th>{t("Contests")}</th>
                            <th>{t("Actions")}</th>
                        </tr>
                        </thead>

                        <tbody className="text-center">

                        {juries?.map((jury, idx) => (
                            <tr key={jury.id}>

                                <td className="text-muted">
                                    {idx + 1}
                                </td>

                                <td>
                                    {jury.photo ? (
                                        <img
                                            src={jury.photo}
                                            alt="jury"
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

                                <td>{jury.lastName}</td>
                                <td>{jury.firstName}</td>
                                <td>{jury.secondName}</td>

                                <td className="text-muted">
                                    {jury.position}
                                </td>

                                <td className="text-muted small">
                                    {jury.login}
                                </td>

                                <td>
                                    {jury.contests?.map((contest) => (
                                        <span
                                            key={contest.id}
                                            className="badge bg-secondary me-1 mb-1"
                                        >
                                        {contest.name}
                                    </span>
                                    ))}
                                </td>

                                <td>
                                    <div className="d-flex gap-2 justify-content-center">

                                        <Link
                                            to={`/juries/edit/${jury.id}`}
                                            className="btn btn-sm btn-primary"
                                        >
                                            {t("Edit")}
                                        </Link>

                                        <button
                                            onClick={() => handleDeleteButton(jury)}
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
export default Juries