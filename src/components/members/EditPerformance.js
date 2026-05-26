import React, {useEffect, useState} from 'react'
import "./Modal.css";
import {useDispatch, useSelector} from "react-redux";
import {loadCategoriesAsync} from "../../redux/reducers/categories/category.thunks";
import {updateSelectedPerformance} from "../../redux/reducers/members/member.thunks";
import {useTranslation} from "react-i18next";

function EditPerformance({performanceToEdit, setEditOpenModal}) {
    const {t} = useTranslation();

    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("");

    const {categories} = useSelector(state => state.categories);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!categories) {
            dispatch(loadCategoriesAsync())
        }
    }, []);

    useEffect(() => {
        if (performanceToEdit) {
            setName(performanceToEdit.name);

            if (performanceToEdit.categoryId) {
                setSelectedCategory(performanceToEdit.categoryId);
            } else {
                setSelectedCategory(performanceToEdit.category?.id || "");
            }
        }
    }, [performanceToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedPerformance = {
            ...performanceToEdit,
            name,
            categoryId: selectedCategory
        };

        dispatch(updateSelectedPerformance(updatedPerformance));
        setEditOpenModal(false);
    };

    return (
        <div
            className="modalBackground"
            onClick={() => setEditOpenModal(false)}
        >
            <div
                className="modalContainer"
                onClick={(e) => e.stopPropagation()}
            >

                <div className="card border-0 shadow-sm p-3">

                    <h5 className="fw-bold text-center mb-4">
                        {t("Edit performance")}
                    </h5>

                    <form onSubmit={handleSubmit}>

                        {/* CATEGORY */}
                        <div className="mb-3">
                            <label className="form-label text-muted">
                                {t("Category")}
                            </label>

                            <select
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
                                type="text"
                                className="form-control"
                                value={name}
                                onChange={e => setName(e.target.value)}
                            />
                        </div>

                        {/* ACTIONS */}
                        <div className="d-flex gap-2 mt-4">

                            <button
                                type="button"
                                className="btn btn-outline-dark w-50"
                                onClick={() => setEditOpenModal(false)}
                            >
                                {t("Cancel")}
                            </button>

                            <button
                                type="submit"
                                className="btn btn-primary w-50"
                            >
                                {t("Update")}
                            </button>

                        </div>

                    </form>

                </div>

            </div>
        </div>
    );
}

export default EditPerformance;