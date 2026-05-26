import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
    setToastShowing, unselectPerformance,
    updateMemberAsync, updateSelectedPerformancesList
} from "../../redux/reducers/members/member.thunks";
import {isEmpty} from "lodash";
import {loadContestsAsync} from "../../redux/reducers/contests/contest.thunks";
import AddPerformance from "./AddPerformance";
import EditPerformance from "./EditPerformance";
import {useTranslation} from "react-i18next";
import ConfirmDelete from "../ConfirmDelete";

const EditMember = () => {
    const {t} = useTranslation();
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
    const [entityForDelete, setEntityForDelete] = useState(null);
    const [modalForDeleteOpen, setModalForDeleteOpen] = useState(false);
    const [preview, setPreview] = useState("");
    const [performanceToEdit, setPerformanceToEdit] = useState("");

    useEffect(() => {
        if (!contests) {
            dispatch(loadContestsAsync())
        }// eslint-disable-next-line react-hooks/exhaustive-deps
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
        }// eslint-disable-next-line react-hooks/exhaustive-deps
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
        }// eslint-disable-next-line react-hooks/exhaustive-deps
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

    const handleDeletePerformance = (entity) => {
        setModalForDeleteOpen(true);
        setEntityForDelete(entity);
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
        <div className="container py-4">
            {modalOpen && <AddPerformance setOpenModal={setModalOpen}/>}
            {editModalOpen &&
                <EditPerformance performanceToEdit={performanceToEdit} setEditOpenModal={setEditModalOpen}/>}
            {modalForDeleteOpen &&
                <ConfirmDelete modalOpen={modalForDeleteOpen}
                               setModalOpen={setModalForDeleteOpen}
                               entityForDelete={entityForDelete}
                               setEntityForDelete={setEntityForDelete}
                               functionToExecute ={unselectPerformance}/>}
            <h2 className="fw-bold text-center mb-4">
                {t("Edit")} {t("member")}
            </h2>

            <div className="row justify-content-center">

                <div className="col-md-7">

                    {!currentMember ? (
                        <div className="alert alert-danger text-center">
                            Member with id {id} not found
                        </div>
                    ) : (
                        <div className="card shadow-sm border-0 p-4">

                            {isSaving && (
                                <div className="alert alert-info">
                                    Saving...
                                </div>
                            )}

                            <form onSubmit={handleSubmit}>

                                {/* LAST NAME */}
                                <div className="mb-3">
                                    <label className="form-label text-muted">
                                        {t("Last name")}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={lastName}
                                        onChange={e => setLastName(e.target.value)}
                                    />
                                </div>

                                {/* FIRST NAME */}
                                <div className="mb-3">
                                    <label className="form-label text-muted">
                                        {t("Name")}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={firstName}
                                        onChange={e => setFirstName(e.target.value)}
                                    />
                                </div>

                                {/* SECOND NAME */}
                                <div className="mb-3">
                                    <label className="form-label text-muted">
                                        {t("Second name")}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={secondName}
                                        onChange={e => setSecondName(e.target.value)}
                                    />
                                </div>

                                {/* DESCRIPTION */}
                                <div className="mb-3">
                                    <label className="form-label text-muted">
                                        {t("Institution/Place")}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={description}
                                        onChange={e => setDescription(e.target.value)}
                                    />
                                </div>

                                {/* CONTEST */}
                                <div className="mb-3">
                                    <label className="form-label text-muted">
                                        {t("Contest")}
                                    </label>

                                    <select
                                        className="form-select"
                                        value={selectedContest}
                                        onChange={e => setSelectedContest(e.target.value)}
                                    >
                                        <option value="">
                                            -- {t("select")} {t("contest")} --
                                        </option>

                                        {contests?.map(contest => (
                                            <option key={contest.id} value={contest.id}>
                                                {contest.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* IMAGE */}
                                <div className="mb-3">

                                    <label className="form-label text-muted">
                                        Photo
                                    </label>

                                    <input
                                        id="imgInpEditMember"
                                        type="file"
                                        className="form-control"
                                        onChange={handleChangePhoto}
                                    />

                                    {preview && (
                                        <div className="text-center mt-3">
                                            <img
                                                src={preview}
                                                alt="preview"
                                                className="rounded"
                                                style={{
                                                    width: "100px",
                                                    height: "140px",
                                                    objectFit: "cover"
                                                }}
                                            />
                                        </div>
                                    )}

                                    {preview && (
                                        <button
                                            type="button"
                                            className="btn btn-outline-dark mt-2 w-100"
                                            onClick={handleDeletePhoto}
                                        >
                                            {t("Delete image")}
                                        </button>
                                    )}

                                </div>

                                {/* PERFORMANCE BUTTON */}
                                <div className="mb-3">
                                    <button
                                        type="button"
                                        onClick={() => setModalOpen(true)}
                                        className="btn btn-warning w-100"
                                    >
                                        {t("Add")} {t("performance")}
                                    </button>
                                </div>

                                {/* PERFORMANCE TABLE */}
                                {!isEmpty(selectedPerformances) && (
                                    <div className="mb-3">

                                        <table className="table table-sm">
                                            <thead>
                                            <tr>
                                                <th>{t("Title")}</th>
                                                <th className="text-end">{t("Actions")}</th>
                                            </tr>
                                            </thead>

                                            <tbody>
                                            {selectedPerformances.map((performance, id) => (
                                                <tr key={id}>
                                                    <td>{performance.name}</td>
                                                    <td className="text-end">
                                                        <button
                                                            type="button"
                                                            onClick={() => handleEditPerformance(performance)}
                                                            className="btn btn-sm btn-primary me-2"
                                                        >
                                                            {t("Edit")}
                                                        </button>

                                                        <button
                                                            type="button"
                                                            onClick={() => handleDeletePerformance(performance)}
                                                            className="btn btn-sm btn-danger"
                                                        >
                                                            {t("Delete")}
                                                        </button>
                                                    </td>
                                                </tr>
                                            ))}
                                            </tbody>
                                        </table>

                                    </div>
                                )}

                                {/* ACTIONS */}
                                <div className="d-flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-primary flex-grow-1"
                                    >
                                        {t("Update")}
                                    </button>

                                    <Link
                                        to="/members"
                                        className="btn btn-outline-danger flex-grow-1"
                                    >
                                        {t("Cancel")}
                                    </Link>

                                </div>

                            </form>

                        </div>
                    )}

                </div>

            </div>

        </div>
    );
}
export default EditMember