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

const AddCategory = () => {
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
        <div className={"container"}>
            <div className={"row"}>
                <h3 className={"display-7 text-center"}>Create new category</h3>
                <div className={"col-md-6 shadow mx-auto p-5"}>
                    <form onSubmit={handleSubmit}>
                        <div className={"form-group mb-2"}>
                            <input required type={"text"} placeholder={"Name"} className={"form-control"}
                                   value={name} onChange={e => setName(e.target.value)}/>
                        </div>

                        <div className={"form-group mb-2"}>
                            <input type={"text"} placeholder={"Description"} className={"form-control mb-3"}
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
                            <input type={"submit"} value={"Create"} className={"btn btn-dark"}
                                   style={{"width": "100%"}}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default AddCategory