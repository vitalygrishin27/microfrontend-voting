import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteJuryAsync, loadJuriesAsync, setToastShowing} from "../../redux/reducers/jury/jury.thunks";
import {loadContestsAsync} from "../../redux/reducers/contests/contest.thunks";
import ConfirmDelete from "../ConfirmDelete";
import {useTranslation} from "react-i18next";

const Juries = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isLoading, juries, error, isDeleting, isToastShowing} = useSelector(state => state.juries);
    const {contests} = useSelector(state => state.contests);
    const [modalOpen, setModalOpen] = useState(false);
    const [entityForDelete, setEntityForDelete] = useState(null);

    useEffect(() => {
        if (!contests) {
            dispatch(loadContestsAsync())
        }
        dispatch(loadJuriesAsync());
        dispatch(setToastShowing(false));// eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handleDeleteButton = (jury) => {
        setModalOpen(true);
        setEntityForDelete(jury)
    }

    return (
        <div className={"container"}>
            {modalOpen &&
                <ConfirmDelete modalOpen={modalOpen}
                               setModalOpen={setModalOpen}
                               entityForDelete={entityForDelete}
                               setEntityForDelete={setEntityForDelete}
                               functionToExecute ={deleteJuryAsync}/>}
            <div className={"row"}>
                <div className={"col-md-12"} style={{"textAlign": "right"}}>
                    <Link to={"/juries/add"} className={"btn btn-outline-dark mt-3"}>{t("Add")}</Link>
                </div>
                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 className={"col-md-10 mx-auto mb-3"} style={{"textAlign": "center"}}>{t("JURIES MANAGER")}</h1>
                    {isLoading && <h3 style={{"color": "red"}}>{t("Loading...")}</h3>}
                    {error && <h3 style={{"color": "red"}}>{error}</h3>}
                    <table className={"table table-hover"}>
                        <thead className={"text-white bg-dark text-center"}>
                        <tr>
                            <th scope={"col"}>#</th>
                            <th scope={"col"}>{t("Photo")}</th>
                            <th scope={"col"}>{t("Last name")}</th>
                            <th scope={"col"}>{t("Name")}</th>
                            <th scope={"col"}>{t("Second name")}</th>
                            <th scope={"col"}>{t("Position")}</th>
                            <th scope={"col"}>{t("Login")}</th>
                            <th scope={"col"}>{t("Contests")}</th>
                            <th scope={"col"}>{t("Actions")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {juries && juries.map((jury, id) => (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td><img alt="jury" style={{"display": jury.photo ? "inline-block" : "none"}}
                                         src={jury.photo ? jury.photo : ""}
                                         width={"50"}
                                         height={"71"}/></td>
                                <td>{jury.lastName}</td>
                                <td>{jury.firstName}</td>
                                <td>{jury.secondName}</td>
                                <td>{jury.position}</td>
                                <td>{jury.login}</td>
                                <td>
                                    {jury.contests && jury.contests.map((contest, id) => (
                                        <div key={id} className={"form-group mb-3"} style={{"textAlign": "center"}}>
                                            {contest.name}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <Link to={`/juries/edit/${jury.id}`}
                                          className="btn btn-small btn-primary mx-2 mb-1">{t("Edit")}</Link>
                                    <button type="button" onClick={() => handleDeleteButton(jury)}
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
export default Juries