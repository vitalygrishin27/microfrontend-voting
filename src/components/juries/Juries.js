import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteJuryAsync, loadJuriesAsync, setToastShowing} from "../../redux/reducers/jury/jury.thunks";
import {loadContestsAsync} from "../../redux/reducers/contests/contest.thunks";

const Juries = () => {
    const dispatch = useDispatch();
    const {isLoading, juries, error, isDeleting, isToastShowing} = useSelector(state => state.juries);
    const {contests} = useSelector(state => state.contests);

    useEffect(() => {
        if (!contests) {
            dispatch(loadContestsAsync())
        }
        dispatch(loadJuriesAsync());
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
                    <Link to={"/juries/add"} className={"btn btn-outline-dark mt-3"}>Create</Link>
                </div>
                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 className={"col-md-10 mx-auto mb-3"} style={{"textAlign": "center"}}>JURIES MANAGER</h1>
                    {isLoading && <h3 style={{"color": "red"}}>Loading...</h3>}
                    {error && <h3 style={{"color": "red"}}>{error}</h3>}
                    <table className={"table table-hover"}>
                        <thead className={"text-white bg-dark text-center"}>
                        <tr>
                            <th scope={"col"}>#</th>
                            <th scope={"col"}>Photo</th>
                            <th scope={"col"}>Last name</th>
                            <th scope={"col"}>Name</th>
                            <th scope={"col"}>Second name</th>
                            <th scope={"col"}>Position</th>
                            <th scope={"col"}>Login</th>
                            <th scope={"col"}>Contests</th>
                            <th scope={"col"}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {juries && juries.map((jury, id) => (
                            <tr key={id}>
                                <td>{id + 1 + " (" + jury.id + ")"}</td>
                                <td><img alt="jury" style={{"display": jury.photo ? "inline-block" : "none"}}
                                         src={jury.photo ? jury.photo : ""}
                                         width={"50"}
                                         height={"71"}/></td>
                                <td>{jury.lastName}</td>
                                <td>{jury.firstName}</td>
                                <td>{jury.secondName}</td>
                                <td>{jury.position}</td>
                                <td>{jury.login}</td>
                                <td>
                                    {jury.contests && jury.contests.map((contest, id) => (
                                        <div key={id} className={"form-group mb-3"} style={{"textAlign": "center"}}>
                                            {contest.name}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <Link to={`/juries/edit/${jury.id}`}
                                          className="btn btn-small btn-primary mx-2 mb-1">Edit</Link>
                                    <button type="button" onClick={() => dispatch(deleteJuryAsync(jury))}
                                            className="btn btn-small btn-danger mb-1">Delete
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
export default Juries