import React, {useEffect, useState} from 'react'
import "./Modal.css";
import {useDispatch, useSelector} from "react-redux";
import {loadCategoriesAsync} from "../../redux/reducers/categories/category.thunks";
import {updateSelectedPerformance} from "../../redux/reducers/members/member.thunks";
import {useTranslation} from "react-i18next";

function EditPerformance({performanceToEdit, setEditOpenModal}) {
    const {t} = useTranslation();
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState({});
    const {categories} = useSelector(state => state.categories);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!categories) {
            dispatch(loadCategoriesAsync())
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (performanceToEdit) {
            setName(performanceToEdit.name);
            if (performanceToEdit.categoryId) {
                setSelectedCategory(performanceToEdit.categoryId);
            } else {
                setSelectedCategory(performanceToEdit.category.id);
            }

        }
    }, [performanceToEdit])

    const handleSubmit = (e) => {
        e.preventDefault();

        const updatedPerformance = {};
        for (let key in performanceToEdit) {
            updatedPerformance[key] = performanceToEdit[key]
        }
        updatedPerformance.name = name;
        updatedPerformance.categoryId = selectedCategory;

        dispatch(updateSelectedPerformance(updatedPerformance));
        setEditOpenModal(false);
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3 className={"display-7 text-center"}>{t("Edit")}</h3>

                        <div className={"form-group mb-2"}>
                            <select required id="combo" className={"form-control"}
                                    value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                                <option value={''}> -- {t("select category")} --</option>
                                {categories && categories.map((category, id) => (

                                    <option key={id} value={category.id} className={"mr-1"}> {category.name}</option>

                                ))}
                            </select>
                        </div>

                        <div className={"form-group mb-2 mt-3 mb-3"}>
                            <input required type={"text"} placeholder={t("Title")} className={"form-control"}
                                   value={name} onChange={e => setName(e.target.value)}/>
                        </div>

                    </div>
                    <div className={"form-group"}>
                        <button type="button" onClick={() => {
                            setEditOpenModal(false)
                        }}
                                className="btn btn-small btn-danger mb-1">{t("Cancel")}
                        </button>
                        <input type={"submit"} value={t("Update")}
                               className={"btn btn-small btn-primary mx-2 mb-1"}/>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default EditPerformance;