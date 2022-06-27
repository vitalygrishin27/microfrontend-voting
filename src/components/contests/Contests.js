import React, {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteContestAsync, loadContestsAsync, setToastShowing} from "../../redux/reducers/contests/contest.thunks";
import {loadCategoriesAsync} from "../../redux/reducers/categories/category.thunks";
import ConfirmDelete from "../ConfirmDelete";
import {useTranslation} from "react-i18next";


const Contests = () => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const {isLoading, contests, error, isDeleting, isToastShowing} = useSelector(state => state.contests);
    const {categories} = useSelector(state => state.categories);
    const [modalOpen, setModalOpen] = useState(false);
    const [entityForDelete, setEntityForDelete] = useState(null);

    useEffect(() => {
        if (!categories) {
            dispatch(loadCategoriesAsync())
        }
        dispatch(loadContestsAsync());
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

    const handleDeleteButton = (contest) => {
        setModalOpen(true);
        setEntityForDelete(contest)
    }

    return (
        <div className={"container"}>
            {modalOpen &&
                <ConfirmDelete modalOpen={modalOpen}
                               setModalOpen={setModalOpen}
                               entityForDelete={entityForDelete}
                               setEntityForDelete={setEntityForDelete}
                               functionToExecute ={deleteContestAsync}/>}
            <div className={"row"}>
                <div className={"col-md-12"} style={{"textAlign": "right"}}>
                    <Link to={"/contests/add"} className={"btn btn-outline-dark mt-3"}>{t("Create")}</Link>
                </div>
                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 className={"col-md-10 mx-auto mb-3"} style={{"textAlign": "center"}}>{t("CONTESTS MANAGER")}</h1>
                    {isLoading && <h3 style={{"color": "red"}}>{t("Loading...")}</h3>}
                    {error && <h3 style={{"color": "red"}}>{error}</h3>}
                    <table className={"table table-hover"}>
                        <thead className={"text-white bg-dark text-center"}>
                        <tr>
                            <th scope={"col"}>#</th>
                            <th scope={"col"}>{t("Photo")}</th>
                            <th scope={"col"}>{t("Title")}</th>
                            <th scope={"col"}>{t("Description")}</th>
                            <th scope={"col"}>{t("Categories")}</th>
                            <th scope={"col"}>{t("Actions")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contests && contests.map((contest, id) => (
                            <tr key={id}>
                                <td>{id + 1}</td>
                                <td><img alt="preview" style={{"display": contest.photo ? "inline-block" : "none"}}
                                         src={contest.photo ? contest.photo : ""}
                                         width={"50"}
                                         height={"71"}/></td>
                                <td>{contest.name}</td>
                                <td>{contest.description}</td>
                                <td>
                                    {contest.categories && contest.categories.map((category, id) => (
                                        <div key={id} className={"form-group mb-3"} style={{"textAlign": "center"}}>
                                            {category.name}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <Link to={`/contests/edit/${contest.id}`}
                                          className="btn btn-small btn-primary mb-1">{t("Edit")}</Link>
                                    <button type="button" onClick={() => handleDeleteButton(contest)}
                                            className="btn btn-small btn-danger mx-2 mb-1">{t("Delete")}
                                    </button>
                                    <Link to={`/contests/sort/${contest.id}`}
                                          className="btn btn-small btn-warning mb-1">{t("ONLINE")}
                                    </Link>
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
export default Contests