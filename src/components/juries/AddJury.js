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

const AddJury = () => {
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
        <div className={"container"}>
            <div className={"row"}>
                <h3 className={"display-7 text-center"}>Create new jury</h3>
                <div className={"col-md-6 shadow mx-auto p-5"}>
                    <form onSubmit={handleSubmit}>
                        <div className={"form-group mb-2"}>
                            <input required type={"text"} placeholder={"Lastname"} className={"form-control"}
                                   value={lastName} onChange={e => setLastName(e.target.value)}/>
                        </div>

                        <div className={"form-group mb-2"}>
                            <input required type={"text"} placeholder={"Name"} className={"form-control"}
                                   value={firstname} onChange={e => setFirstName(e.target.value)}/>
                        </div>

                        <div className={"form-group mb-2"}>
                            <input type={"text"} placeholder={"Second name"} className={"form-control"}
                                   value={secondName} onChange={e => setSecondName(e.target.value)}/>
                        </div>

                        <div className={"form-group mb-2"}>
                            <input type={"text"} placeholder={"Position"} className={"form-control"}
                                   value={position} onChange={e => setPosition(e.target.value)}/>
                        </div>

                        <div className={"form-group mb-2"}>
                            <input required type={"text"} placeholder={"Login"} className={"form-control"}
                                   value={login} onChange={e => setLogin(e.target.value)}/>
                        </div>

                        <div className={"form-group mb-2"}>
                            <input required type={"password"} placeholder={"Password"} className={"form-control"}
                                   value={password} onChange={e => setPassword(e.target.value)}/>
                        </div>

                        <div style={{"display": !isEmpty(contests) ? "inline-block" : "none"}}>
                            Contests
                        </div>
                        {contests && contests.map((contest, id) => (
                            <div key={id} className={"form-group mb-3"} style={{"textAlign": "left"}}>
                                <input type={"checkbox"} className={"mr-1"}
                                       checked={selectedContests.includes(contest)}
                                       onChange={e => handleChangeContestsToJury(e.target.checked, contest)}/> {contest.name}
                            </div>
                        ))}

                        <div className={"form-group mb-2"}>
                            <input id="imgInp" type={"file"} className={"form-control mb-3"}
                                   onChange={e => setPreview(e.target.value)}/>
                            <img alt="preview" style={{"display": preview ? "inline-block" : "none"}}
                                 src={preview ? URL.createObjectURL(document.getElementById('imgInp').files[0]) : ""}
                                 width={"100"}
                                 height={"142"}/>
                        </div>

                        <div className={"form-group"}>
                            <input type={"submit"} value={"Create"} className={"btn btn-dark"}
                                   style={{"width": "100%"}}/>
                        </div>
                    </form>
                </div>
            </div>
        </div>

    )
}
export default AddJury