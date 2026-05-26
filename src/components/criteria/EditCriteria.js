import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {setToastShowing, updateCriteriaAsync} from "../../redux/reducers/criteria/criteria.thunks";
import {useTranslation} from "react-i18next";

const EditCriteria = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const {
        criteria,
        isSaving,
        error,
        isToastShowing
    } = useSelector(state => state.criteria);
    const currentCriteria = criteria ? criteria.find(criteria => criteria.id === parseInt(id)) : null;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        if (currentCriteria) {
            setName(currentCriteria.name);
            setDescription(currentCriteria.description);
        }
    }, [currentCriteria])

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error)
                dispatch(setToastShowing(false));
            } else if (!isSaving) {
                toast.success("Update was successful!")
                dispatch(setToastShowing(false));
                navigate("/criteria");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaving])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedCriteria = {};
        for (let key in currentCriteria) {
            updatedCriteria[key] = currentCriteria[key]
        }
        updatedCriteria.name = name;
        updatedCriteria.description = description;

        dispatch(updateCriteriaAsync(updatedCriteria));
    };


    return (
        <div className="container py-4">

            <h2 className="fw-bold mb-4 text-center">
                {t("Edit")}
            </h2>

            <div className="row justify-content-center">

                <div className="col-md-6">

                    {!currentCriteria ? (
                        <div className="alert alert-danger text-center">
                            Criteria with id {id} not found
                        </div>
                    ) : (
                        <div className="card shadow-sm border-0 p-4">

                            {isSaving && (
                                <div className="alert alert-info">
                                    Saving...
                                </div>
                            )}

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
                                        to="/criteria"
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
export default EditCriteria