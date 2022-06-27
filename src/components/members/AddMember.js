import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {
    createMemberAsync,
    setToastShowing, unselectPerformance, updateSelectedPerformancesList
} from "../../redux/reducers/members/member.thunks";
import {loadContestsAsync} from "../../redux/reducers/contests/contest.thunks";
import AddPerformance from "./AddPerformance";
import {isEmpty} from "lodash";
import EditPerformance from "./EditPerformance";
import {useTranslation} from "react-i18next";
import ConfirmDelete from "../ConfirmDelete";

const AddMember = () => {
    const {t} = useTranslation();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedContest, setSelectedContest] = useState({});
    const [preview, setPreview] = useState("");
    const [performanceToEdit, setPerformanceToEdit] = useState("");
    const {isSaving, error, selectedPerformances, isToastShowing} = useSelector(state => state.members);
    const {contests} = useSelector(state => state.contests);
    const [entityForDelete, setEntityForDelete] = useState(null);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [modalForDeleteOpen, setModalForDeleteOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('firstName', firstName);
        data.append('secondName', secondName);
        data.append('lastName', lastName);
        data.append('description', description);
        data.append('contest', selectedContest);

        if (!isEmpty(selectedPerformances)) {
            data.append('performancesData', JSON.stringify(selectedPerformances));
        }

        if (document.getElementById('imgInpMember').files[0] && preview !== '') {
            data.append('file', document.getElementById('imgInpMember').files[0]);
        }
        /*  for (const pair of data.entries()) {
              console.log(pair[0] + ', ' + pair[1]);
          }*/
        dispatch(createMemberAsync(data));
    };

    useEffect(() => {
        dispatch(updateSelectedPerformancesList([]));
        if (!contests) {
            dispatch(loadContestsAsync())
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
                navigate("/members");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaving])

    const handleDeletePerformance = (entity) => {
        setModalForDeleteOpen(true);
        setEntityForDelete(entity);
    };

    const handleEditPerformance = (performance) => {
        setPerformanceToEdit(performance);
        setEditModalOpen(true)
    };

    const handleDeletePhoto = () => {
        document.getElementById('imgInpMember').value = '';
        setPreview('');
    }

    return (
        <div>
            {modalOpen && <AddPerformance setOpenModal={setModalOpen}/>}
            {editModalOpen &&
                <EditPerformance performanceToEdit={performanceToEdit} setEditOpenModal={setEditModalOpen}/>}
            {modalForDeleteOpen &&
                <ConfirmDelete modalOpen={modalForDeleteOpen}
                               setModalOpen={setModalForDeleteOpen}
                               entityForDelete={entityForDelete}
                               setEntityForDelete={setEntityForDelete}
                               functionToExecute ={unselectPerformance}/>}
            <div className={"container"}>
                <div className={"row"}>
                    <h3 className={"display-7 text-center"}>{t("Add")} {t("new")} {t("member")}</h3>
                    <div className={"col-md-6 shadow mx-auto p-5"}>
                        <form onSubmit={handleSubmit}>
                            <div className={"form-group mb-2"}>
                                <input required type={"text"} placeholder={t("Last name")} className={"form-control"}
                                       value={lastName} onChange={e => setLastName(e.target.value)}/>
                            </div>

                            <div className={"form-group mb-2"}>
                                <input required type={"text"} placeholder={t("Name")} className={"form-control"}
                                       value={firstName} onChange={e => setFirstName(e.target.value)}/>
                            </div>

                            <div className={"form-group mb-2"}>
                                <input type={"text"} placeholder={t("Second name")} className={"form-control"}
                                       value={secondName} onChange={e => setSecondName(e.target.value)}/>
                            </div>

                            <div className={"form-group mb-2"}>
                                <input type={"text"} placeholder={t("Institution/Place")} className={"form-control"}
                                       value={description} onChange={e => setDescription(e.target.value)}/>
                            </div>

                            <div className={"form-group mb-2"}>
                                <select required id="combo" className={"form-control"}
                                        value={selectedContest} onChange={e => setSelectedContest(e.target.value)}>
                                    <option value={''}> -- {t("select")} {t("contest")} --</option>
                                    {contests && contests.map((contest, id) => (

                                        <option key={id} value={contest.id} className={"mr-1"}> {contest.name}</option>

                                    ))}
                                </select>
                            </div>


                            <div className={"form-group mb-2"}>
                                <input id="imgInpMember" type={"file"} className={"form-control mb-3"}
                                       onChange={e => setPreview(e.target.value)}/>
                                <img alt="preview" style={{"display": preview ? "inline-block" : "none"}}
                                     src={preview ? URL.createObjectURL(document.getElementById('imgInpMember').files[0]) : ""}
                                     width={"100"}
                                     height={"142"}/>
                                <input style={{"display": preview ? "inline-block" : "none"}} type={"button"}
                                       value={t("Delete image")} className={"btn btn-dark mb-2"}
                                       onClick={() => handleDeletePhoto()}/>
                            </div>
                            <div>
                                <button type="button" onClick={() => setModalOpen(true)}
                                        className="btn btn-small btn-warning mb-1">{t("Add")} {t("performance")}
                                </button>
                            </div>

                            {!isEmpty(selectedPerformances) ? (
                                <table className={"table table-hover"}>
                                    <thead className={" text-center"}>
                                    <tr>
                                        <th scope={"col"}>{t("Title")}</th>
                                        <th scope={"col"} style={{"textAlign": "right"}}>{t("Actions")}</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {selectedPerformances && selectedPerformances.map((performance, id) => (
                                        <tr key={id}>
                                            <td>{performance.name}</td>
                                            <td style={{"textAlign": "right"}}>
                                                <button type="button"
                                                        onClick={() => handleEditPerformance(performance)}
                                                        className="btn btn-sm btn-primary mx-2 mb-1">{t("Edit")}
                                                </button>
                                                <button type="button"
                                                        onClick={() => handleDeletePerformance(performance)}
                                                        className="btn btn-sm btn-danger mb-1">{t("Delete")}
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>) : ''}

                            <div className={"form-group"}>
                                <input type={"submit"} value={t("Create")} className={"btn btn-success"}
                                       style={{"width": "100%"}}/>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}
export default AddMember