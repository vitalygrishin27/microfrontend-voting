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
        <div className={"container"}>

            {currentCategory ? (
                <div className={"row"}>
                    <h3 className={"display-7 text-center"}>{t("Edit")}</h3>
                    <div className={"col-md-6 shadow mx-auto p-5"}>
                        {isSaving && <h3>{t("Saving...")}</h3>}
                        <form onSubmit={handleSubmit}>
                            <div className={"form-group mb-2"}>
                                <input required type={"text"} placeholder={t("Title")} className={"form-control"}
                                       value={name} onChange={e => setName(e.target.value)}/>
                            </div>
                            <div className={"form-group mb-2"}>
                                <input type={"text"} placeholder={t("Description")} className={"form-control"}
                                       value={description} onChange={e => setDescription(e.target.value)}/>
                            </div>
                            <div style={{"display": !isEmpty(criteria) ? "inline-block" : "none"}}>
                                {t("Criteria")}
                            </div>
                            {criteria && criteria.map((criteria, id) => (
                                <div key={id} className={"form-group mb-3"} style={{"textAlign": "left"}}>
                                    <input type={"checkbox"} className={"mr-1"}
                                           checked={selectedCriteria.includes(criteria)}
                                           onChange={e => handleChangeCriteriaToCategory(e.target.checked, criteria)}/> {criteria.name}
                                </div>
                            ))}

                            <div className={"form-group"}>
                                <input type={"submit"} value={t("Update")} className={"btn btn-primary"}/>
                                <Link to={"/categories"} className={"btn btn-danger mx-3"}
                                      style={{"textAlign": "center"}}>{t("Cancel")}</Link>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <h1 className={"display-3 text-center"}>Category with {id} not found</h1>
            )}

        </div>

    )
}
export default EditCategory