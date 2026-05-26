import React, {useEffect, useState} from 'react'
import "./Modal.css";
import {useDispatch, useSelector} from "react-redux";
import {loadCategoriesAsync} from "../../redux/reducers/categories/category.thunks";
import {uid} from "uid";
import {changeSelectedPerformances} from "../../redux/reducers/members/member.thunks";
import {useTranslation} from "react-i18next";

function AddPerformance({ setOpenModal }) {
    const { t } = useTranslation();

    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const { categories } = useSelector(state => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!categories) {
            dispatch(loadCategoriesAsync());
        }
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            tempId: uid(),
            name,
            categoryId: selectedCategory,
        };

        dispatch(changeSelectedPerformances({
            performance: data,
            needToAdd: true,
        }));

        setName("");
        setSelectedCategory("");
        setOpenModal(false);
    };

    return (
        <div
            className="modalBackground"
            onClick={() => setOpenModal(false)}
        >
            <div
                className="modalContainer"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="card border-0 shadow-sm p-3">

                    <h5 className="fw-bold text-center mb-4">
                        {t("Add")} {t("performance")}
                    </h5>

                    <form onSubmit={handleSubmit}>

                        {/* CATEGORY */}
                        <div className="mb-3">
                            <label className="form-label text-muted">
                                {t("Category")}
                            </label>

                            <select
                                required
                                className="form-select"
                                value={selectedCategory}
                                onChange={e => setSelectedCategory(e.target.value)}
                            >
                                <option value="">
                                    -- {t("select category")} --
                                </option>

                                {categories?.map(category => (
                                    <option
                                        key={category.id}
                                        value={category.id}
                                    >
                                        {category.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* TITLE */}
                        <div className="mb-3">
                            <label className="form-label text-muted">
                                {t("Title")}
                            </label>

                            <input
                                required
                                type="text"
                                className="form-control"
                                placeholder={t("Title")}
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        {/* ACTIONS */}
                        <div className="d-flex gap-2 mt-4">

                            <button
                                type="button"
                                className="btn btn-outline-danger w-50"
                                onClick={() => setOpenModal(false)}
                            >
                                {t("Cancel")}
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary w-50"
                            >
                                {t("Create")}
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </div>
    );
}

export default AddPerformance;