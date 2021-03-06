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
        <div className={"container"}>

            {currentJury ? (
                <div className={"row"}>
                    <h3 className={"display-7 text-center"}>{t("Edit")}</h3>
                    <div className={"col-md-6 shadow mx-auto p-5"}>
                        {isSaving && <h3>{t("Saving...")}</h3>}
                        <form onSubmit={handleSubmit}>
                            <div className={"form-group mb-2"}>
                                <input required type={"text"} placeholder={t("Last name")} className={"form-control"}
                                       value={lastName} onChange={e => setLastName(e.target.value)}/>
                            </div>
                            <div className={"form-group mb-2"}>
                                <input required type={"text"} placeholder={t("Name")} className={"form-control"}
                                       value={firstname} onChange={e => setFirstName(e.target.value)}/>
                            </div>
                            <div className={"form-group mb-2"}>
                                <input type={"text"} placeholder={t("Second name")} className={"form-control"}
                                       value={secondName} onChange={e => setSecondName(e.target.value)}/>
                            </div>
                            <div className={"form-group mb-2"}>
                                <input type={"text"} placeholder={t("Position")} className={"form-control"}
                                       value={position} onChange={e => setPosition(e.target.value)}/>
                            </div>

                            <div className={"form-group mb-2"}>
                                <input required type={"text"} placeholder={t("Login")} className={"form-control"}
                                       value={login} onChange={e => setLogin(e.target.value)}/>
                            </div>

                            <div className={"form-group mb-2"}>
                                <input required type={"password"} placeholder={t("Password")} className={"form-control"}
                                       value={password} onChange={e => setPassword(e.target.value)}/>
                            </div>

                            {contests && contests.map((contest, id) => (
                                <div key={id} className={"form-group mb-3"} style={{"textAlign": "left"}}>
                                    <input type={"checkbox"} className={"mr-1"}
                                           checked={selectedContests.includes(contest)}
                                           onChange={e => handleChangeContestsToJury(e.target.checked, contest)}/> {contest.name}
                                </div>
                            ))}

                            <div className={"form-group mb-2"}>
                                <input id="imgInpEdit" type={"file"} className={"form-control mb-3"}
                                       onChange={e => handleChangePhoto(e)}/>
                                <img alt="preview" style={{"display": preview ? "inline-block" : "none"}}
                                     src={preview}
                                     width={"100"}
                                     height={"142"}/>
                            </div>
                            <input style={{"display": preview ? "inline-block" : "none"}} type={"button"}
                                   value={t("Delete image")} className={"btn btn-dark mb-2"}
                                   onClick={() => handleDeletePhoto()}
                            />
                            <div className={"form-group"}>
                                <input type={"submit"} value={t("Update")} className={"btn btn-primary"}
                                />
                                <Link to={"/juries"} className={"btn btn-danger mx-3"}
                                      style={{"textAlign": "center"}}>{t("Cancel")}</Link>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <h1 className={"display-3 text-center"}>Jury with {id} not found</h1>
            )}

        </div>

    )
}
export default EditJury