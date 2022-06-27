import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteCriteriaAsync, loadCriteriaAsync, setToastShowing} from "../../redux/reducers/criteria/criteria.thunks";
import ConfirmDelete from "../ConfirmDelete";
import {useTranslation} from "react-i18next";

const Criteria = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isLoading, criteria, error, isDeleting, isToastShowing} = useSelector(state => state.criteria);
    const [modalOpen, setModalOpen] = useState(false);
    const [entityForDelete, setEntityForDelete] = useState(null);

    useEffect(() => {
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
                               functionToExecute ={deleteCriteriaAsync}/>}
            <div className={"row"}>
                <div className={"col-md-12"} style={{"textAlign": "right"}}>
                    <Link to={"/criteria/add"} className={"btn btn-outline-dark mt-3"}>{t("Create")}</Link>
                </div>
                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 className={"col-md-10 mx-auto mb-3"} style={{"textAlign": "center"}}>{t("CRITERIA MANAGER")}</h1>
                    {isLoading && <h3 style={{"color": "red"}}>{t("Loading...")}</h3>}
                    {error && <h3 style={{"color": "red"}}>{error}</h3>}
                    <table className={"table table-hover"}>
                        <thead className={"text-white bg-dark text-center"}>
                        <tr>
                            <th scope={"col"}>#</th>
                            <th scope={"col"}>{t("Title")}</th>
                            <th scope={"col"} width={"20"}>{t("Description")}</th>
                            <th scope={"col"}>{t("Actions")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {criteria && criteria.map((criteria, id) => (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td>{criteria.name}</td>
                                <td width="50%">{criteria.description}</td>
                                <td>
                                    <Link to={`/criteria/edit/${criteria.id}`}
                                          className="btn btn-small btn-primary mx-2 mb-1">{t("Edit")}</Link>
                                    <button type="button" onClick={() => handleDeleteButton(criteria)}
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
export default Criteria