import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteMemberAsync, loadMembersAsync, setToastShowing} from "../../redux/reducers/members/member.thunks";
import {useTranslation} from "react-i18next";

const Members = () => {
    const {t} = useTranslation()
    const dispatch = useDispatch();
    const {isLoading, members, error, isDeleting, isToastShowing} = useSelector(state => state.members);
    useEffect(() => {
        dispatch(loadMembersAsync());
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

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-md-12"} style={{"textAlign": "right"}}>
                    <Link to={"/members/add"} className={"btn btn-outline-dark mt-3"}>{t("Create")}</Link>
                </div>
                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 className={"col-md-10 mx-auto mb-3"} style={{"textAlign": "center"}}>{t("MEMBER MANAGER")}</h1>
                    {isLoading && <h3 style={{"color": "red"}}>{t("Loading...")}</h3>}
                    {error && <h3 style={{"color": "red"}}>{error}</h3>}
                    <table className={"table table-hover"}>
                        <thead className={"text-white bg-dark text-center"}>
                        <tr>
                            <th scope={"col"}>#/id</th>
                            <th scope={"col"}>{t("Photo")}</th>
                            <th scope={"col"}>{t("Last name")}</th>
                            <th scope={"col"}>{t("Name")}</th>
                            <th scope={"col"}>{t("Second name")}</th>
                            <th scope={"col"}>{t("Institution/Place")}</th>
                            <th scope={"col"}>{t("Contest")}</th>
                            <th scope={"col"}>{t("Performances")}</th>
                            <th scope={"col"}>{t("Actions")}</th>
                        </tr>
                        </thead>
                        <tbody>
                        {members && members.map((member, id) => (
                            <tr key={id}>
                                <td>{id + 1 + " (" + member.id + ")"}</td>
                                <td><img alt="member" style={{"display": member.photo ? "inline-block" : "none"}}
                                         src={member.photo ? member.photo : ""}
                                         width={"50"}
                                         height={"71"}/></td>
                                <td>{member.lastName}</td>
                                <td>{member.firstName}</td>
                                <td>{member.secondName}</td>
                                <td>{member.description}</td>
                                <td>{member.contest.name}</td>
                                <td>
                                    {member.performances && member.performances.map((performance, id) => (
                                        <div key={id} className={"form-group mb-3"} style={{"textAlign": "center"}}>
                                            {performance.name}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <Link to={`/members/edit/${member.id}`}
                                          className="btn btn-small btn-primary mx-2 mb-1">{t("Edit")}</Link>
                                    <button type="button" onClick={() => dispatch(deleteMemberAsync(member))}
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
export default Members