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
                {t("Add")} {t("member")}
            </h2>

            <div className="row justify-content-center">

                <div className="col-md-7">

                    <div className="card shadow-sm border-0 p-4">

                        <form onSubmit={handleSubmit}>

                            {/* LAST NAME */}
                            <div className="mb-3">
                                <label className="form-label text-muted">
                                    {t("Last name")}
                                </label>
                                <input
                                    required
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
                                    required
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
                                    required
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
                                    id="imgInpMember"
                                    type="file"
                                    className="form-control"
                                    onChange={e => setPreview(e.target.value)}
                                />

                                {preview && (
                                    <div className="text-center mt-3">
                                        <img
                                            src={
                                                URL.createObjectURL(
                                                    document.getElementById("imgInpMember").files[0]
                                                )
                                            }
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

                            {/* SUBMIT */}
                            <button
                                type="submit"
                                className="btn btn-success w-100"
                            >
                                {t("Create")}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}
export default AddMember