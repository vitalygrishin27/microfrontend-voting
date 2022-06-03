import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteCriteriaAsync, loadCriteriaAsync, setToastShowing} from "../../redux/reducers/criteria/criteria.thunks";

const Criteria = () => {
    const dispatch = useDispatch();
    const {isLoading, criteria, error, isDeleting, isToastShowing} = useSelector(state => state.criteria);

    useEffect(() => {
        if (!criteria) {
            dispatch(loadCriteriaAsync());
            dispatch(setToastShowing(false));
        }// eslint-disable-next-line react-hooks/exhaustive-deps
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
                    <Link to={"/criteria/add"} className={"btn btn-outline-dark mt-3"}>Create</Link>
                </div>
                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 className={"col-md-10 mx-auto mb-3"} style={{"textAlign": "center"}}>CRITERIA MANAGER</h1>
                    {isLoading && <h3 style={{"color": "red"}}>Loading...</h3>}
                    {error && <h3 style={{"color": "red"}}>{error}</h3>}
                    <table className={"table table-hover"}>
                        <thead className={"text-white bg-dark text-center"}>
                        <tr>
                            <th scope={"col"}>#/id</th>
                            <th scope={"col"}>Name</th>
                            <th scope={"col"} width={"20"}>Description</th>
                            <th scope={"col"}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {criteria && criteria.map((criteria, id) => (
                            <tr key={id}>
                                <td>{id + 1 + " (" + criteria.id + ")"}</td>
                                <td>{criteria.name}</td>
                                <td width="50%">{criteria.description}</td>
                                <td>
                                    <Link to={`/criteria/edit/${criteria.id}`}
                                          className="btn btn-small btn-primary mx-2 mb-1">Edit</Link>
                                    <button type="button" onClick={() => dispatch(deleteCriteriaAsync(criteria))}
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
export default Criteria