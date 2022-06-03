import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {setToastShowing, updateCriteriaAsync} from "../../redux/reducers/criteria/criteria.thunks";

const EditCriteria = () => {
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
        }
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
        <div className={"container"}>

            {currentCriteria ? (
                <div className={"row"}>
                    <h3 className={"display-7 text-center"}>Edit info
                        of {currentCriteria.name}</h3>
                    <div className={"col-md-6 shadow mx-auto p-5"}>
                        {isSaving && <h3>Saving...</h3>}
                        <form onSubmit={handleSubmit}>
                            <div className={"form-group mb-2"}>
                                <input required type={"text"} placeholder={"Name"} className={"form-control"}
                                       value={name} onChange={e => setName(e.target.value)}/>
                            </div>
                            <div className={"form-group mb-2"}>
                                <input type={"text"} placeholder={"Description"} className={"form-control"}
                                       value={description} onChange={e => setDescription(e.target.value)}/>
                            </div>
                            <div className={"form-group"}>
                                <input type={"submit"} value={"Update"} className={"btn btn-dark"}/>
                                <Link to={"/criteria"} className={"btn btn-danger mx-3"}
                                      style={{"textAlign": "center"}}>Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <h1 className={"display-3 text-center"}>Criteria with {id} not found</h1>
            )}

        </div>

    )
}
export default EditCriteria