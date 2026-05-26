import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";

import {
    changeSelectedContests,
    clearSelectedContests,
    createJuryAsync,
    setToastShowing
} from "../../redux/reducers/jury/jury.thunks";
import {isEmpty} from "lodash";
import {
    loadContestsAsync
} from "../../redux/reducers/contests/contest.thunks";
import {useTranslation} from "react-i18next";

const AddJury = () => {
    const {t} = useTranslation();
    const [firstname, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [secondName, setSecondName] = useState("");
    const [position, setPosition] = useState("");
    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [preview, setPreview] = useState("");
    const {isSaving, error, selectedContests, isToastShowing} = useSelector(state => state.juries);
    const {contests} = useSelector(state => state.contests);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('firstName', firstname);
        data.append('lastName', lastName);
        data.append('secondName', secondName);
        data.append('position', position);
        data.append('login', login);
        data.append('password', password);

        if (!isEmpty(selectedContests)) {
            let listOfContestsId = [];
            selectedContests.forEach(item => listOfContestsId.push(item.id));
            data.append("contests", listOfContestsId)
        }

        if (document.getElementById('imgInp').files[0]) {
            data.append('file', document.getElementById('imgInp').files[0]);
        }
        /*    for (const pair of data.entries()) {
                console.log(pair[0] + ', ' + pair[1]);
            }*/
        dispatch(createJuryAsync(data));
    };

    const handleChangeContestsToJury = (checked, contest) => {
        dispatch(changeSelectedContests({checked, contest}))
    }

    useEffect(() => {
        dispatch(clearSelectedContests());
        if (!contests) {
            dispatch(loadContestsAsync());
            dispatch(setToastShowing(false));
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
                navigate("/juries");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaving])

    return (
        <div className="container py-4">

            <h2 className="fw-bold mb-4 text-center">
                {t("Add")} {t("jury")}
            </h2>

            <div className="row justify-content-center">

                <div className="col-md-6">

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
                            {!isEmpty(contests) && (
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
                            )}

                            {/* IMAGE UPLOAD */}
                            <div className="mb-3">

                                <label className="form-label text-muted">
                                    Photo
                                </label>

                                <input
                                    id="imgInp"
                                    type="file"
                                    className="form-control"
                                    onChange={e =>
                                        setPreview(e.target.value)
                                    }
                                />

                                {preview && (
                                    <div className="mt-3 text-center">
                                        <img
                                            alt="preview"
                                            src={
                                                URL.createObjectURL(
                                                    document.getElementById("imgInp").files[0]
                                                )
                                            }
                                            className="rounded"
                                            style={{
                                                width: "100px",
                                                height: "140px",
                                                objectFit: "cover"
                                            }}
                                        />
                                    </div>
                                )}

                            </div>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="btn btn-success w-100"
                                disabled={isSaving}
                            >
                                {isSaving ? "Saving..." : t("Create")}
                            </button>

                        </form>

                    </div>

                </div>

            </div>

        </div>
    );
}
export default AddJury