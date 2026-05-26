import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
    changeSelectedContests,
    setToastShowing,
    updateJuryAsync,
    updateSelectedContestsList
} from "../../redux/reducers/jury/jury.thunks";
import {isEmpty} from "lodash";
import {useTranslation} from "react-i18next";

const EditJury = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const {juries, isSaving, error, selectedContests, isToastShowing} = useSelector(state => state.juries);
    const {contests} = useSelector(state => state.contests);
    const currentJury = juries ? juries.find(jury => jury.id === parseInt(id)) : null;
    const [firstname, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [position, setPosition] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [preview, setPreview] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleChangeContestsToJury = (checked, contest) => {
        dispatch(changeSelectedContests({checked, contest}))
    }

    useEffect(() => {
        if (currentJury) {
            setFirstName(currentJury.firstName);
            setLastName(currentJury.lastName);
            setSecondName(currentJury.secondName);
            setPosition(currentJury.position);
            setLogin(currentJury.login);
            setPassword(currentJury.encryptedPassword);
            setPreview(currentJury.photo);
            dispatch(updateSelectedContestsList({currentJury, contests}))
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentJury])

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error)
                dispatch(setToastShowing(false));
            } else if (!isSaving) {
                toast.success("Update was successful!")
                dispatch(setToastShowing(false));
                navigate("/juries");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaving])

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        for (let key in currentJury) {
            if (currentJury[key] !== null && !isEmpty(currentJury[key])) {
                data.append(key, currentJury[key])
            }
        }
        data.set("id", currentJury.id)
        data.set('firstName', firstname);
        data.set('lastName', lastName);
        data.set('secondName', secondName);
        data.set('position', position);
        data.set('login', login);
        data.set('photo', preview);
        if (currentJury.encryptedPassword !== password) {
            data.set('password', password);
        }
        console.log(isEmpty(selectedContests))
        if (!isEmpty(selectedContests)) {
            let listOfContestsId = [];
            selectedContests.forEach(item => listOfContestsId.push(item.id));
            data.set("contests", listOfContestsId)
        } else {
            data.delete('contests');
        }

        if (document.getElementById('imgInpEdit').files[0] != null && preview !== '') {
            data.set('file', document.getElementById('imgInpEdit').files[0]);
        }

     /*   for (const pair of data.entries()) {
            console.log(pair[0] + ', ' + pair[1]);
        }*/

        dispatch(updateJuryAsync(data));
    };

    const handleChangePhoto = (event) => {
        if (event.target.files[0]) {
            setPreview(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleDeletePhoto = () => {
        document.getElementById('imgInpEdit').value = '';
        setPreview('');
    }

    return (
        <div className="container py-4">

            <h2 className="fw-bold mb-4 text-center">
                {t("Edit")}
            </h2>

            <div className="row justify-content-center">

                <div className="col-md-6">

                    {!currentJury ? (
                        <div className="alert alert-danger text-center">
                            Jury with id {id} not found
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
                                        value={firstname}
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

                                {/* POSITION */}
                                <div className="mb-3">
                                    <label className="form-label text-muted">
                                        {t("Position")}
                                    </label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        value={position}
                                        onChange={e => setPosition(e.target.value)}
                                    />
                                </div>

                                {/* LOGIN */}
                                <div className="mb-3">
                                    <label className="form-label text-muted">
                                        {t("Login")}
                                    </label>
                                    <input
                                        required
                                        type="text"
                                        className="form-control"
                                        value={login}
                                        onChange={e => setLogin(e.target.value)}
                                    />
                                </div>

                                {/* PASSWORD */}
                                <div className="mb-3">
                                    <label className="form-label text-muted">
                                        {t("Password")}
                                    </label>
                                    <input
                                        required
                                        type="password"
                                        className="form-control"
                                        value={password}
                                        onChange={e => setPassword(e.target.value)}
                                    />
                                </div>

                                {/* CONTESTS */}
                                <div className="mb-3">

                                    <label className="form-label text-muted">
                                        {t("Contests")}
                                    </label>

                                    <div className="border rounded p-3 bg-light">

                                        {contests?.map((contest) => (
                                            <div
                                                key={contest.id}
                                                className="form-check mb-2"
                                            >
                                                <input
                                                    className="form-check-input"
                                                    type="checkbox"
                                                    checked={selectedContests?.includes(contest)}
                                                    onChange={e =>
                                                        handleChangeContestsToJury(
                                                            e.target.checked,
                                                            contest
                                                        )
                                                    }
                                                />

                                                <label className="form-check-label">
                                                    {contest.name}
                                                </label>
                                            </div>
                                        ))}

                                    </div>
                                </div>

                                {/* IMAGE */}
                                <div className="mb-3">

                                    <label className="form-label text-muted">
                                        Photo
                                    </label>

                                    <input
                                        id="imgInpEdit"
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

                                {/* BUTTONS */}
                                <div className="d-flex gap-2">

                                    <button
                                        type="submit"
                                        className="btn btn-primary flex-grow-1"
                                        disabled={isSaving}
                                    >
                                        {isSaving ? "Updating..." : t("Update")}
                                    </button>

                                    <Link
                                        to="/juries"
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
export default EditJury