import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
    changeSelectedCriteria,
    setToastShowing,
    updateCategoryAsync, updateSelectedCriteriaList
} from "../../redux/reducers/categories/category.thunks";
import {isEmpty} from "lodash";
import {useTranslation} from "react-i18next";

const EditCategory = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const {
        categories,
        isSaving,
        error,
        selectedCriteria,
        isToastShowing
    } = useSelector(state => state.categories);
    const {criteria} = useSelector(state => state.criteria);
    const currentCategory = categories ? categories.find(category => category.id === parseInt(id)) : null;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    const handleChangeCriteriaToCategory = (checked, criteria) => {
        dispatch(changeSelectedCriteria({checked, criteria}))
    }

    useEffect(() => {
        if (currentCategory) {
            setName(currentCategory.name);
            setDescription(currentCategory.description);
            dispatch(updateSelectedCriteriaList({currentCategory, criteria}))
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentCategory])

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error)
                dispatch(setToastShowing(false));
            } else if (!isSaving) {
                toast.success("Update was successful!")
                dispatch(setToastShowing(false));
                navigate("/categories");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaving])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedCategory = {};
        for (let key in currentCategory) {
            updatedCategory[key] = currentCategory[key]
        }
        updatedCategory.name = name;
        updatedCategory.description = description;
        updatedCategory.criteria = selectedCriteria;
        dispatch(updateCategoryAsync(updatedCategory));
    };


    return (
        <div className="container py-4">

            <h2 className="fw-bold mb-4 text-center">
                {t("Edit")}
            </h2>

            <div className="row justify-content-center">

                <div className="col-md-6">

                    {!currentCategory ? (
                        <div className="alert alert-danger text-center">
                            Category with id {id} not found
                        </div>
                    ) : (
                        <div className="card shadow-sm border-0 p-4">

                            {isSaving && (
                                <div className="alert alert-info">
                                    Saving...
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                {/* NAME */}
                                <div className="mb-3">
                                    <label className="form-label text-muted">
                                        {t("Title")}
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        value={name}
                                        onChange={e => setName(e.target.value)}
                                    />
                                </div>

                                {/* DESCRIPTION */}
                                <div className="mb-3">
                                    <label className="form-label text-muted">
                                        {t("Description")}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>

                                {/* CRITERIA */}
                                {!isEmpty(criteria) && (
                                    <div className="mb-3">

                                        <label className="form-label text-muted">
                                            {t("Criteria")}
                                        </label>

                                        <div className="border rounded p-3 bg-light">

                                            {criteria?.map((item) => (
                                                <div
                                                    key={item.id}
                                                    className="form-check mb-2"
                                                >
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        checked={selectedCriteria?.includes(item)}
                                                        onChange={e =>
                                                            handleChangeCriteriaToCategory(
                                                                e.target.checked,
                                                                item
                                                            )
                                                        }
                                                    />

                                                    <label className="form-check-label">
                                                        {item.name}
                                                    </label>
                                                </div>
                                            ))}

                                        </div>
                                    </div>
                                )}

                                {/* BUTTONS */}
                                <div className="d-flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-primary flex-grow-1"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? "Updating..." : t("Update")}
                                    </button>

                                    <Link
                                        to="/categories"
                                        className="btn btn-outline-danger flex-grow-1"
                                    >
                                        {t("Cancel")}
                                    </Link>

                                </div>

                            </form>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}
export default EditCategory