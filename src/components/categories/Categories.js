import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
    deleteCategoryAsync,
    loadCategoriesAsync,
    setToastShowing
} from "../../redux/reducers/categories/category.thunks";
import {loadCriteriaAsync} from "../../redux/reducers/criteria/criteria.thunks";
import ConfirmDelete from "../ConfirmDelete";
import {useTranslation} from "react-i18next";

const Categories = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isLoading, categories, error, isDeleting, isToastShowing} = useSelector(state => state.categories);
    const {criteria} = useSelector(state => state.criteria);
    const [modalOpen, setModalOpen] = useState(false);
    const [entityForDelete, setEntityForDelete] = useState(null);

    useEffect(() => {
        if (!criteria) {
            dispatch(loadCriteriaAsync())
        }
        if (!categories) {
            dispatch(loadCategoriesAsync());
            dispatch(setToastShowing(false));
        }// eslint-disable-next-line react-hooks/exhaustive-deps
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
                    functionToExecute={deleteCategoryAsync}
                />
            }

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-3">

                <h2 className="mb-0 fw-bold">
                    {t("CATEGORIES MANAGER")}
                </h2>

                <Link to="/categories/add" className="btn btn-dark">
                    + {t("Create")}
                </Link>

            </div>

            {/* STATUS */}
            {isLoading && <div className="alert alert-info">Loading...</div>}
            {error && (
                <div className="alert alert-danger">
                    {JSON.stringify(error)}
                </div>
            )}

            {/* TABLE CARD */}
            <div className="card shadow-sm border-0">
                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-dark text-center">
                        <tr>
                            <th>#</th>
                            <th>{t("Title")}</th>
                            <th>{t("Description")}</th>
                            <th>{t("Criteria")}</th>
                            <th>{t("Actions")}</th>
                        </tr>
                        </thead>

                        <tbody className="text-center">

                        {categories?.map((category, idx) => (
                            <tr key={category.id}>

                                <td className="text-muted">
                                    {idx + 1}
                                </td>

                                <td className="fw-semibold">
                                    {category.name}
                                </td>

                                <td className="text-muted small" style={{ maxWidth: "300px" }}>
                                    {category.description}
                                </td>

                                <td>
                                    {category.criteria?.map((c) => (
                                        <span
                                            key={c.id}
                                            className="badge bg-secondary me-1 mb-1"
                                        >
                                        {c.name}
                                    </span>
                                    ))}
                                </td>

                                <td>
                                    <div className="d-flex gap-2 justify-content-center">

                                        <Link
                                            to={`/categories/edit/${category.id}`}
                                            className="btn btn-sm btn-primary"
                                        >
                                            {t("Edit")}
                                        </Link>

                                        <button
                                            onClick={() => handleDeleteButton(category)}
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
export default Categories