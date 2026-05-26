import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteContestAsync, loadContestsAsync, setToastShowing} from "../../redux/reducers/contests/contest.thunks";
import {loadCategoriesAsync} from "../../redux/reducers/categories/category.thunks";
import ConfirmDelete from "../ConfirmDelete";
import {useTranslation} from "react-i18next";


const Contests = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isLoading, contests, error, isDeleting, isToastShowing} = useSelector(state => state.contests);
    const {categories} = useSelector(state => state.categories);
    const [modalOpen, setModalOpen] = useState(false);
    const [entityForDelete, setEntityForDelete] = useState(null);

    useEffect(() => {
        if (!categories) {
            dispatch(loadCategoriesAsync())
        }
        dispatch(loadContestsAsync());
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

    const handleDeleteButton = (contest) => {
        setModalOpen(true);
        setEntityForDelete(contest)
    }

    return (
        <div className="container py-4">

            {modalOpen &&
                <ConfirmDelete
                    modalOpen={modalOpen}
                    setModalOpen={setModalOpen}
                    entityForDelete={entityForDelete}
                    setEntityForDelete={setEntityForDelete}
                    functionToExecute={deleteContestAsync}
                />
            }

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2 className="mb-0 fw-bold">
                    {t("CONTESTS MANAGER")}
                </h2>

                <Link to="/contests/add" className="btn btn-dark">
                    + {t("Create")}
                </Link>

            </div>

            {/* STATUS */}
            {isLoading && <div className="alert alert-info">Loading...</div>}
            {error && <div className="alert alert-danger">{error}</div>}

            {/* TABLE */}
            <div className="card shadow-sm border-0">
                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-dark text-center">
                        <tr>
                            <th>#</th>
                            <th>{t("Photo")}</th>
                            <th>{t("Title")}</th>
                            <th>{t("Description")}</th>
                            <th>{t("Categories")}</th>
                            <th>{t("Actions")}</th>
                        </tr>
                        </thead>

                        <tbody className="text-center">

                        {contests?.map((contest, idx) => (
                            <tr key={contest.id}>

                                <td className="text-muted">
                                    {idx + 1}
                                </td>

                                <td>
                                    {contest.photo ? (
                                        <img
                                            src={contest.photo}
                                            alt="contest"
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

                                <td className="fw-semibold">
                                    {contest.name}
                                </td>

                                <td className="text-muted small" style={{ maxWidth: "300px" }}>
                                    {contest.description}
                                </td>

                                <td>
                                    {contest.categories?.map((category) => (
                                        <span
                                            key={category.id}
                                            className="badge bg-secondary me-1 mb-1"
                                        >
                                        {category.name}
                                    </span>
                                    ))}
                                </td>

                                <td>
                                    <div className="d-flex gap-2 justify-content-center flex-wrap">

                                        <Link
                                            to={`/contests/edit/${contest.id}`}
                                            className="btn btn-sm btn-primary"
                                        >
                                            {t("Edit")}
                                        </Link>

                                        <button
                                            onClick={() => handleDeleteButton(contest)}
                                            className="btn btn-sm btn-danger"
                                        >
                                            {t("Delete")}
                                        </button>

                                        <Link
                                            to={`/contests/sort/${contest.id}`}
                                            className="btn btn-sm btn-warning"
                                        >
                                            {t("ONLINE")}
                                        </Link>

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
export default Contests