import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {createCriteriaAsync, setToastShowing} from "../../redux/reducers/criteria/criteria.thunks";
import {useTranslation} from "react-i18next";

const AddCriteria = () => {
    const {t} = useTranslation();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const {isSaving, error, isToastShowing} = useSelector(state => state.criteria);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            id: null,
            name: name,
            description: description,
        }
        dispatch(createCriteriaAsync(data));
    };

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error)
                dispatch(setToastShowing(false));
            } else if (!isSaving) {
                toast.success("Create was successful!")
                dispatch(setToastShowing(false));
                navigate("/criteria");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaving])

    return (
        <div className="container py-4">

            <h2 className="fw-bold mb-4 text-center">
                {t("Create criteria")}
            </h2>

            <div className="row justify-content-center">

                <div className="col-md-6">

                    <div className="card shadow-sm border-0 p-4">

                        <form onSubmit={handleSubmit}>

                            {/* TITLE */}
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
export default AddCriteria