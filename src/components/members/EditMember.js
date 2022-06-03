import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
    changeSelectedPerformances,
    setToastShowing,
    updateMemberAsync, updateSelectedPerformancesList
} from "../../redux/reducers/members/member.thunks";
import {isEmpty} from "lodash";
import {loadContestsAsync} from "../../redux/reducers/contests/contest.thunks";
import AddPerformance from "./AddPerformance";
import EditPerformance from "./EditPerformance";

const EditMember = () => {
    const {id} = useParams();
    const {
        members,
        isSaving,
        error,
        selectedPerformances,
        isToastShowing
    } = useSelector(state => state.members);
    const {contests} = useSelector(state => state.contests);
    const currentMember = members ? members.find(member => member.id === parseInt(id)) : null;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [description, setDescription] = useState("");
    const [selectedContest, setSelectedContest] = useState({});
    const [preview, setPreview] = useState("");
    const [performanceToEdit, setPerformanceToEdit] = useState("");

    useEffect(() => {
        if (!contests) {
            dispatch(loadContestsAsync())
        }
    }, []);

    useEffect(() => {
        if (currentMember) {
            setFirstName(currentMember.firstName);
            setLastName(currentMember.lastName);
            setSecondName(currentMember.secondName);
            setDescription(currentMember.description);
            setSelectedContest(currentMember.contest.id);
            setPreview(currentMember.photo);
            dispatch(updateSelectedPerformancesList(currentMember.performances))
        }
    }, [currentMember])

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error)
                dispatch(setToastShowing(false));
            } else if (!isSaving) {
                toast.success("Update was successful!")
                dispatch(setToastShowing(false));
                navigate("/members");
            }
        }
    }, [isSaving])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [modalOpen, setModalOpen] = useState(false);
    const [editModalOpen, setEditModalOpen] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        for (let key in currentMember) {
            if (currentMember[key] !== null && !isEmpty(currentMember[key])) {
                data.append(key, currentMember[key])
            }
        }
        data.delete("performances")
        data.set("id", currentMember.id)
        data.set('firstName', firstName);
        data.set('lastName', lastName);
        data.set('secondName', secondName);
        data.set('description', description);
        data.set('contest', selectedContest);
        data.set('photo', preview);

        if (!isEmpty(selectedPerformances)) {
            data.set('performancesData', JSON.stringify(selectedPerformances));
        }

        if (document.getElementById('imgInpEditMember').files[0] != null && preview !== '') {
            data.set('file', document.getElementById('imgInpEditMember').files[0]);
        }

     /*   for (const pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }*/

        dispatch(updateMemberAsync(data));
    };

    const handleChangePhoto = (event) => {
        if (event.target.files[0]) {
            setPreview(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleDeletePerformance = (performance) => {
        const changePerformances = {
            performance: performance,
            needToAdd: false,
        }
        dispatch(changeSelectedPerformances(changePerformances));
    };

    const handleEditPerformance = (performance) => {
        setPerformanceToEdit(performance);
        setEditModalOpen(true)
    };

    const handleDeletePhoto = () => {
        document.getElementById('imgInpEditMember').value = '';
        setPreview('');
    }

    return (
        <div>
            {modalOpen && <AddPerformance setOpenModal={setModalOpen}/>}
            {editModalOpen &&
                <EditPerformance performanceToEdit={performanceToEdit} setEditOpenModal={setEditModalOpen}/>}
            <div className={"container"}>
                {currentMember ? (
                    <div className={"row"}>
                        <h3 className={"display-7 text-center"}>Edit info
                            of {currentMember.lastName + " " + currentMember.firstName}</h3>
                        <div className={"col-md-6 shadow mx-auto p-5"}>
                            {isSaving && <h3>Saving...</h3>}
                            <form onSubmit={handleSubmit}>
                                <div className={"form-group mb-2"}>
                                    <input type={"text"} placeholder={"Last name"} className={"form-control"}
                                           value={lastName} onChange={e => setLastName(e.target.value)}/>
                                </div>
                                <div className={"form-group mb-2"}>
                                    <input type={"text"} placeholder={"Name"} className={"form-control"}
                                           value={firstName} onChange={e => setFirstName(e.target.value)}/>
                                </div>
                                <div className={"form-group mb-2"}>
                                    <input type={"text"} placeholder={"Second name"} className={"form-control"}
                                           value={secondName} onChange={e => setSecondName(e.target.value)}/>
                                </div>
                                <div className={"form-group mb-2"}>
                                    <input type={"text"} placeholder={"Institution/Place"} className={"form-control"}
                                           value={description} onChange={e => setDescription(e.target.value)}/>
                                </div>

                                <div className={"form-group mb-2"}>
                                    <select required id="combo" className={"form-control"}
                                            value={selectedContest} onChange={e => setSelectedContest(e.target.value)}>
                                        <option value={''}> -- Select Contest --</option>
                                        {contests && contests.map((contest, id) => (

                                            <option key={id} value={contest.id}
                                                    className={"mr-1"}> {contest.name}</option>

                                        ))}
                                    </select>
                                </div>

                                <div className={"form-group mb-2"}>
                                    <input id="imgInpEditMember" type={"file"} className={"form-control mb-3"}
                                           onChange={e => handleChangePhoto(e)}/>
                                    <img style={{"display": preview ? "inline-block" : "none"}}
                                         src={preview}
                                         width={"100"}
                                         height={"142"}/>
                                </div>
                                <input style={{"display": preview ? "inline-block" : "none"}} type={"button"}
                                       value={"Delete image"} className={"btn btn-dark mb-2"}
                                       onClick={() => handleDeletePhoto()}
                                />
                                <div>
                                    <button type="button" onClick={() => setModalOpen(true)}
                                            className="btn btn-small btn-warning mb-1">Add Performance
                                    </button>
                                </div>

                                {!isEmpty(selectedPerformances) ? (
                                    <table className={"table table-hover"}>
                                        <thead className={" text-center"}>
                                        <tr>
                                            <th scope={"col"}>Name</th>
                                            <th scope={"col"} style={{"textAlign": "right"}}>Actions</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        {selectedPerformances && selectedPerformances.map((performance, id) => (
                                            <tr key={id}>
                                                <td>{performance.name}</td>
                                                <td style={{"textAlign": "right"}}>
                                                    <button type="button"
                                                            onClick={() => handleEditPerformance(performance)}
                                                            className="btn btn-sm btn-primary mx-2 mb-1">Edit
                                                    </button>
                                                    <button type="button"
                                                            onClick={() => handleDeletePerformance(performance)}
                                                            className="btn btn-sm btn-danger mb-1">Delete
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                        </tbody>
                                    </table>) : ''}

                                <div className={"form-group"}>
                                    <input type={"submit"} value={"Update"} className={"btn btn-dark"}
                                    />
                                    <Link to={"/members"} className={"btn btn-danger mx-3"}
                                          style={{"textAlign": "center"}}>Cancel</Link>
                                </div>
                            </form>
                        </div>
                    </div>
                ) : (
                    <h1 className={"display-3 text-center"}>Member with {id} not found</h1>
                )}

            </div>
        </div>

    )
}
export default EditMember