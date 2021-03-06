import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {createCriteriaAsync, setToastShowing} from "../../redux/reducers/criteria/criteria.thunks";
import {useTranslation} from "react-i18next";

const AddCriteria = () => {
    const {t} = useTranslation();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const {isSaving, error, isToastShowing} = useSelector(state => state.criteria);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            id: null,
            name: name,
            description: description,
        }
        dispatch(createCriteriaAsync(data));
    };

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error)
                dispatch(setToastShowing(false));
            } else if (!isSaving) {
                toast.success("Create was successful!")
                dispatch(setToastShowing(false));
                navigate("/criteria");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaving])

    return (
        <div className={"container"}>
            <div className={"row"}>
                <h3 className={"display-7 text-center"}>{t("Create criteria")}</h3>
                <div className={"col-md-6 shadow mx-auto p-5"}>
                    <form onSubmit={handleSubmit}>
                        <div className={"form-group mb-2"}>
                            <input required type={"text"} placeholder={t("Title")} className={"form-control"}
                                   value={name} onChange={e => setName(e.target.value)}/>
                        </div>
                        <div className={"form-group mb-2"}>
                            <input type={"text"} placeholder={t("Description")} className={"form-control"}
                                   value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>
                        <div className={"form-group"}>
                            <input type={"submit"} value={t("Create")} className={"btn btn-success"}
                                   style={{"width": "100%"}}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default AddCriteria