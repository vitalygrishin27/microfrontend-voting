import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
    deleteCategoryAsync,
    loadCategoriesAsync,
    setToastShowing
} from "../../redux/reducers/categories/category.thunks";
import {loadCriteriaAsync} from "../../redux/reducers/criteria/criteria.thunks";
import ConfirmDelete from "../ConfirmDelete";
import {useTranslation} from "react-i18next";

const Categories = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isLoading, categories, error, isDeleting, isToastShowing} = useSelector(state => state.categories);
    const {criteria} = useSelector(state => state.criteria);
    const [modalOpen, setModalOpen] = useState(false);
    const [entityForDelete, setEntityForDelete] = useState(null);

    useEffect(() => {
        if (!criteria) {
            dispatch(loadCriteriaAsync())
        }
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
            } else if (!isDeleting) {
                toast.warning("Delete was successful!")
                dispatch(setToastShowing(false));
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isDeleting])

    const handleDeleteButton = (entity) => {
        setModalOpen(true);
        setEntityForDelete(entity)
    }

    return (
        <div className={"container"}>
            {modalOpen &&
                <ConfirmDelete modalOpen={modalOpen}
                               setModalOpen={setModalOpen}
                               entityForDelete={entityForDelete}
                               setEntityForDelete={setEntityForDelete}
                               functionToExecute ={deleteCategoryAsync}/>}
            <div className={"row"}>
                <div className={"col-md-12"} style={{"textAlign": "right"}}>
                    <Link to={"/categories/add"} className={"btn btn-outline-dark mt-3"}>{t("Create")}</Link>
                </div>
                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 className={"col-md-10 mx-auto mb-3"} style={{"textAlign": "center"}}>{t("CATEGORIES MANAGER")}</h1>
                    {isLoading && <h3 style={{"color": "red"}}>{t("Loading...")}</h3>}
                    {error && <h3 style={{"color": "red"}}>{error}</h3>}
                    <table className={"table table-hover"}>
                        <thead className={"text-white bg-dark text-center"}>
                        <tr>
                            <th scope={"col"}>#</th>
                            <th scope={"col"}>{t("Title")}</th>
                            <th scope={"col"}>{t("Description")}</th>
                            <th scope={"col"}>{t("Criteria")}</th>
                            <th scope={"col"}>{t("Actions")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {categories && categories.map((category, id) => (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{category.name}</td>
                                <td width="50%">{category.description}</td>
                                <td>
                                    {category.criteria && category.criteria.map((criteria, id) => (
                                        <div key={id} className={"form-group mb-3"} style={{"textAlign": "center"}}>
                                            {criteria.name}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <Link to={`/categories/edit/${category.id}`}
                                          className="btn btn-small btn-primary mx-2 mb-1">{t("Edit")}</Link>
                                    <button type="button" onClick={() => handleDeleteButton(category)}
                                            className="btn btn-small btn-danger mb-1">{t("Delete")}
                                    </button>
                                </td>
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>

    )
}
export default Categories