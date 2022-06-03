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

const EditCategory = () => {
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
        }
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
        }
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
                    <h3 className={"display-7 text-center"}>Edit info
                        of {currentCategory.name}</h3>
                    <div className={"col-md-6 shadow mx-auto p-5"}>
                        {isSaving && <h3>Saving...</h3>}
                        <form onSubmit={handleSubmit}>
                            <div className={"form-group mb-2"}>
                                <input required type={"text"} placeholder={"Last name"} className={"form-control"}
                                       value={name} onChange={e => setName(e.target.value)}/>
                            </div>
                            <div className={"form-group mb-2"}>
                                <input type={"text"} placeholder={"Description"} className={"form-control"}
                                       value={description} onChange={e => setDescription(e.target.value)}/>
                            </div>
                            <div style={{"display": !isEmpty(criteria) ? "inline-block" : "none"}}>
                                Included criteria
                            </div>
                            {criteria && criteria.map((criteria, id) => (
                                <div key={id} className={"form-group mb-3"} style={{"textAlign": "left"}}>
                                    <input type={"checkbox"} className={"mr-1"}
                                           checked={selectedCriteria.includes(criteria)}
                                           onChange={e => handleChangeCriteriaToCategory(e.target.checked, criteria)}/> {criteria.name}
                                </div>
                            ))}

                            <div className={"form-group"}>
                                <input type={"submit"} value={"Update"} className={"btn btn-dark"}/>
                                <Link to={"/categories"} className={"btn btn-danger mx-3"}
                                      style={{"textAlign": "center"}}>Cancel</Link>
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