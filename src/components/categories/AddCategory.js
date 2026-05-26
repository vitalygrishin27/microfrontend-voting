import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {
    changeSelectedCriteria, clearSelectedCriteria,
    createCategoryAsync,
    setToastShowing
} from "../../redux/reducers/categories/category.thunks";
import {loadCriteriaAsync} from "../../redux/reducers/criteria/criteria.thunks";
import {isEmpty} from "lodash";
import {useTranslation} from "react-i18next";

const AddCategory = () => {
    const {t} = useTranslation();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const {criteria} = useSelector(state => state.criteria);
    const {isSaving, error, selectedCriteria, isToastShowing} = useSelector(state => state.categories);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            id: null,
            name: name,
            description: description,
            criteria: selectedCriteria
        }
        dispatch(createCategoryAsync(data));
    };

    useEffect(() => {
        dispatch(clearSelectedCriteria());
        if (!criteria) {
            dispatch(loadCriteriaAsync());
            dispatch(setToastShowing(false));
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error)
                dispatch(setToastShowing(false));
            } else if (!isSaving) {
                toast.success("Create was successful!")
                dispatch(setToastShowing(false));
                navigate("/categories");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaving])

    const handleChangeCriteriaToCategory = (checked, criteria) => {
        dispatch(changeSelectedCriteria({checked, criteria}))
    }

    return (
        <div className="container py-4">

            <h2 className="fw-bold mb-4 text-center">
                {t("Create category")}
            </h2>

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow-sm border-0 p-4">

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
                                    placeholder={t("Title")}
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
                                    placeholder={t("Description")}
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

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="btn btn-success w-100"
                                disabled={isSaving}
                            >
                                {isSaving ? "Saving..." : t("Create")}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}
export default AddCategory