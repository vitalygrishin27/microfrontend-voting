import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
    changeSelectedCategories,
    setToastShowing,
    updateContestAsync, updateSelectedCategoriesList
} from "../../redux/reducers/contests/contest.thunks";
import {isEmpty} from "lodash";
import {useTranslation} from "react-i18next";

const EditContest = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const {contests, isSaving, error, selectedCategories, isToastShowing} = useSelector(state => state.contests);
    const currentContest = contests ? contests.find(contest => contest.id === parseInt(id)) : null;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const {categories} = useSelector(state => state.categories);
    const [preview, setPreview] = useState("");

    const handleChangeCategoriesToContest = (checked, category) => {
        dispatch(changeSelectedCategories({checked, category}))
    }

    useEffect(() => {
        if (currentContest) {
            setName(currentContest.name);
            setDescription(currentContest.description);
            setPreview(currentContest.photo);
            dispatch(updateSelectedCategoriesList({currentContest, categories}))
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentContest])

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error)
                dispatch(setToastShowing(false));
            } else if (!isSaving) {
                toast.success("Update was successful!")
                dispatch(setToastShowing(false));
                navigate("/contests");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaving])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        for (let key in currentContest) {
            if (currentContest[key] !== null && !isEmpty(currentContest[key])) {
                data.append(key, currentContest[key])
            }
        }
        data.delete("performances")
        data.delete("activePerformance")
        data.set("id", currentContest.id)
        data.set("name", name)
        data.set("description", description)
        data.set("photo", preview)

        if (!isEmpty(selectedCategories)) {
            let listOfCategoriesId = [];
            selectedCategories.forEach(item => listOfCategoriesId.push(item.id));
            data.set("categories", listOfCategoriesId)
        }

        if (document.getElementById('imgInpEditContest').files[0] != null && preview !== '') {
            data.set('file', document.getElementById('imgInpEditContest').files[0]);
        }

        for (const pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }
        dispatch(updateContestAsync(data));
    };

    const handleChangePhoto = (event) => {
        if (event.target.files[0]) {
            setPreview(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleDeletePhoto = () => {
        document.getElementById('imgInpEditContest').value = '';
        setPreview('');
    }

    return (
        <div className="container py-4">

            <h2 className="fw-bold text-center mb-4">
                {t("Edit")} {t("contest")}
            </h2>

            {currentContest ? (
                <div className="row justify-content-center">

                    <div className="col-md-7">

                        <div className="card shadow-sm border-0 p-4">

                            {isSaving && (
                                <div className="alert alert-info">
                                    {t("Saving...")}
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                {/* NAME */}
                                <div className="mb-3">
                                    <label className="form-label text-muted">
                                        {t("Name")}
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

                                {/* CATEGORIES */}
                                <div className="mb-2 text-muted">
                                    {t("Categories")}
                                </div>

                                <div className="mb-3">
                                    {categories?.map(category => (
                                        <div key={category.id} className="form-check mb-2">

                                            <input
                                                type="checkbox"
                                                className="form-check-input"
                                                checked={selectedCategories.includes(category)}
                                                onChange={e =>
                                                    handleChangeCategoriesToContest(
                                                        e.target.checked,
                                                        category
                                                    )
                                                }
                                            />

                                            <label className="form-check-label">
                                                {category.name}
                                            </label>

                                        </div>
                                    ))}
                                </div>

                                {/* IMAGE */}
                                <div className="mb-3">
                                    <label className="form-label text-muted">
                                        {t("Photo")}
                                    </label>

                                    <input
                                        id="imgInpEditContest"
                                        type="file"
                                        className="form-control"
                                        onChange={handleChangePhoto}
                                    />

                                    {preview && (
                                        <div className="text-center mt-3">
                                            <img
                                                src={preview}
                                                alt="preview"
                                                width="120"
                                                height="160"
                                                className="rounded"
                                                style={{ objectFit: "cover" }}
                                            />
                                        </div>
                                    )}

                                    {preview && (
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark w-100 mt-2"
                                            onClick={handleDeletePhoto}
                                        >
                                            {t("Delete image")}
                                        </button>
                                    )}
                                </div>

                                {/* ACTIONS */}
                                <div className="d-flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-primary flex-grow-1"
                                    >
                                        {t("Update")}
                                    </button>

                                    <Link
                                        to="/contests"
                                        className="btn btn-outline-danger flex-grow-1"
                                    >
                                        {t("Cancel")}
                                    </Link>

                                </div>

                            </form>

                        </div>

                    </div>

                </div>
            ) : (
                <div className="alert alert-danger text-center">
                    Contest with {id} not found
                </div>
            )}

        </div>
    );
}
export default EditContest