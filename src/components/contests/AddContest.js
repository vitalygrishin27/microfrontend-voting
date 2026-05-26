import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {
    changeSelectedCategories,
    clearSelectedCategories,
    createContestAsync,
    setToastShowing
} from "../../redux/reducers/contests/contest.thunks";
import {isEmpty} from "lodash";
import {loadCategoriesAsync} from "../../redux/reducers/categories/category.thunks";
import {useTranslation} from "react-i18next";

const AddContest = () => {
    const {t} = useTranslation();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const {categories} = useSelector(state => state.categories);
    const [preview, setPreview] = useState("");
    const {isSaving, error, selectedCategories, isToastShowing} = useSelector(state => state.contests);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('name', name);
        data.append('description', description);

        if (!isEmpty(selectedCategories)) {
            let listOfCategoriesId = [];
            selectedCategories.forEach(item => listOfCategoriesId.push(item.id));
            data.append("categories", listOfCategoriesId)
        }

        if (document.getElementById('imgInpContest').files[0] && preview !== '') {
            data.append('file', document.getElementById('imgInpContest').files[0]);
        }

        /*  for (const pair of data.entries()) {
              console.log(pair[0] + ', ' + pair[1]);
          }*/
        dispatch(createContestAsync(data));
    };

    const handleChangeCategoriesToContest = (checked, category) => {
        dispatch(changeSelectedCategories({checked, category}))
    }

    useEffect(() => {
        dispatch(clearSelectedCategories());
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
            } else if (!isSaving) {
                toast.success("Create was successful!")
                dispatch(setToastShowing(false));
                navigate("/contests");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaving])

    const handleDeletePhoto = () => {
        document.getElementById('imgInpContest').value = '';
        setPreview('');
    }

    return (
        <div className="container py-4">

            <h2 className="fw-bold text-center mb-4">
                {t("Create")} {t("contest")}
            </h2>

            <div className="row justify-content-center">

                <div className="col-md-7">

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
                            {!isEmpty(categories) && (
                                <div className="mb-3">

                                    <label className="form-label text-muted">
                                        {t("Categories")}
                                    </label>

                                    <div className="border rounded p-2">

                                        {categories?.map(category => (
                                            <div
                                                key={category.id}
                                                className="form-check"
                                            >
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
                                </div>
                            )}

                            {/* IMAGE */}
                            <div className="mb-3">
                                <label className="form-label text-muted">
                                    Photo
                                </label>

                                <input
                                    id="imgInpContest"
                                    type="file"
                                    className="form-control"
                                    onChange={e => setPreview(e.target.value)}
                                />

                                {preview && (
                                    <div className="text-center mt-3">
                                        <img
                                            src={URL.createObjectURL(
                                                document.getElementById('imgInpContest').files[0]
                                            )}
                                            alt="preview"
                                            className="rounded"
                                            style={{
                                                width: "100px",
                                                height: "140px",
                                                objectFit: "cover"
                                            }}
                                        />
                                    </div>
                                )}

                                {preview && (
                                    <button
                                        type="button"
                                        className="btn btn-outline-dark mt-2 w-100"
                                        onClick={handleDeletePhoto}
                                    >
                                        {t("Delete image")}
                                    </button>
                                )}
                            </div>

                            {/* ACTION */}
                            <button
                                type="submit"
                                className="btn btn-success w-100"
                            >
                                {t("Create")}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}
export default AddContest