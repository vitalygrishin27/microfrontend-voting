import React, {useEffect} from "react";
import {Link} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {deleteContestAsync, loadContestsAsync, setToastShowing} from "../../redux/reducers/contests/contest.thunks";
import {loadCategoriesAsync} from "../../redux/reducers/categories/category.thunks";


const Contests = () => {
    const dispatch = useDispatch();
    const {isLoading, contests, error, isDeleting, isToastShowing} = useSelector(state => state.contests);
    const {categories} = useSelector(state => state.categories);

    useEffect(() => {
        if (!categories) {
            dispatch(loadCategoriesAsync())
        }
        dispatch(loadContestsAsync());
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
                    <Link to={"/contests/add"} className={"btn btn-outline-dark mt-3"}>Create</Link>
                </div>
                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 className={"col-md-10 mx-auto mb-3"} style={{"textAlign": "center"}}>CONTEST MANAGER</h1>
                    {isLoading && <h3 style={{"color": "red"}}>Loading...</h3>}
                    {error && <h3 style={{"color": "red"}}>{error}</h3>}
                    <table className={"table table-hover"}>
                        <thead className={"text-white bg-dark text-center"}>
                        <tr>
                            <th scope={"col"}>#/id</th>
                            <th scope={"col"}>Photo</th>
                            <th scope={"col"}>Name</th>
                            <th scope={"col"}>Description</th>
                            <th scope={"col"}>Categories</th>
                            <th scope={"col"}>Actions</th>
                        </tr>
                        </thead>
                        <tbody>
                        {contests && contests.map((contest, id) => (
                            <tr key={id}>
                                <td>{id + 1 + "/" + contest.id}</td>
                                <td><img alt="preview" style={{"display": contest.photo ? "inline-block" : "none"}}
                                         src={contest.photo ? contest.photo : ""}
                                         width={"50"}
                                         height={"71"}/></td>
                                <td>{contest.name}</td>
                                <td>{contest.description}</td>
                                <td>
                                    {contest.categories && contest.categories.map((category, id) => (
                                        <div key={id} className={"form-group mb-3"} style={{"textAlign": "center"}}>
                                            {category.name}
                                        </div>
                                    ))}
                                </td>
                                <td>
                                    <Link to={`/contests/edit/${contest.id}`}
                                          className="btn btn-small btn-primary mb-1">Edit</Link>
                                    <button type="button" onClick={() => dispatch(deleteContestAsync(contest))}
                                            className="btn btn-small btn-danger mx-2 mb-1">Delete
                                    </button>
                                    <Link to={`/contests/sort/${contest.id}`}
                                          className="btn btn-small btn-warning mb-1">Manage performances
                                    </Link>
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
export default Contests