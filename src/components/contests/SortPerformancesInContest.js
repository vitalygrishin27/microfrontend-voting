import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {loadContestsAsync} from "../../redux/reducers/contests/contest.thunks";
import {
    loadPerformancesByContestAsync, removePerformanceToAssessment,
    resortPerformances,
    savePerformancesOrder, setToastShowing, submitPerformanceToAssessment
} from "../../redux/reducers/performances/performance.thunks";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {isEmpty} from "lodash";

const SortPerformancesInContest = () => {
    const {id} = useParams();
    const {
        performances,
        isLoading,
        isSaving,
        error,
        isToastShowing,
        orderWasChanged
    } = useSelector(state => state.performances);
    const {contests} = useSelector(state => state.contests);
    const currentContest = contests ? contests.find(contest => contest.id === parseInt(id)) : null;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMarks, setShowMarks] = useState(false);

    useEffect(() => {
        if (!currentContest) {
            navigate("/contests");
            return;
        }
        if (!contests) {
            dispatch(loadContestsAsync())
        }
        if (!orderWasChanged) {
            dispatch(loadPerformancesByContestAsync(currentContest.id));
        }

        dispatch(setToastShowing(false));// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error)
                dispatch(setToastShowing(false));
            } else if (!isSaving) {
                toast.success("Saving was successful!")
                dispatch(setToastShowing(false));
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaving])

    function handleOnDragEnd(result) {
        if (result.destination && result.destination.index === result.source.index) {
            return;
        }
        const items = Array.from(performances)
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        dispatch(resortPerformances(items));
    }

    const handleSaveOrder = () => {
        dispatch(savePerformancesOrder(performances));
    }

    const handleSubmit = (contest, performance) => {
        dispatch(submitPerformanceToAssessment(contest, performance));
    }
    const handleRemoveAssessment = (contest) => {
        dispatch(removePerformanceToAssessment(contest));
    }

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-md-12 mb-2"} style={{"textAlign": "right"}}>
                    <input type={"button"} value={"Remove assessment"}
                           className={"btn btn-outline-danger mt-3"}
                           onClick={() => handleRemoveAssessment(currentContest)}/>
                </div>
                <div className={"col-md-12"} style={{"textAlign": "right"}}>
                    Show marks <input type={"checkbox"} className={"mr-1 form-check-input"}
                                      checked={showMarks}
                                      onChange={() => showMarks ? setShowMarks(false) : setShowMarks(true)}/>
                </div>

                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 id="rt" className={"col-md-10 mx-auto mb-3"} style={{"textAlign": "center"}}>MANAGE
                        PERFORMANCES</h1>
                    {isLoading && <h3 style={{"color": "red"}}>Loading...</h3>}
                    {orderWasChanged && <h5 id="saveOrder" style={{"color": "red"}}>You should save previous order first and then reload data. To discard changes reload page(F5)</h5>}

                    {orderWasChanged &&
                        <input type={"button"} value={"PRESS  TO  SAVE  ORDER"} className={"btn btn-danger"}
                               style={{"width": "100%"}} onClick={() => handleSaveOrder()}/>}
                    {error && <h3 style={{"color": "red"}}>{error}</h3>}
                    <table className={"table table-hover"}>
                        <thead className={"text-white bg-dark text-center"}>
                        <tr>
                            <th scope={"col"}>#</th>
                            <th scope={"col"}>Member name</th>
                            <th scope={"col"}>Place</th>
                            <th scope={"col"}>Performance name</th>
                            <th scope={"col"}>Category</th>
                            {showMarks && currentContest && currentContest.juryLastNames &&
                                currentContest.juryLastNames.map((juryLastName, id) => (
                                    <th key={id} scope={"col"}>{juryLastName}</th>
                                ))}
                            <th scope={"col"}>Submit for assessment</th>
                        </tr>
                        </thead>
                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="characters">
                                {(provided) => (
                                    <tbody  {...provided.droppableProps} ref={provided.innerRef}>
                                    {performances && performances.map((performance, index) => {
                                        return (
                                            <Draggable key={performance.id} draggableId={performance.id.toString()}
                                                       index={index}>
                                                {(provided) => (
                                                    <tr className={currentContest.activePerformance &&
                                                    currentContest.activePerformance.id === performance.id ? "bg-warning" : ""}
                                                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <td>{index + 1}</td>
                                                        <td>{performance.fullName}</td>
                                                        <td>{performance.place}</td>
                                                        <td>{performance.name}</td>
                                                        <td>{performance.category.name}</td>
                                                        {showMarks && currentContest.juryLastNames &&
                                                            currentContest.juryLastNames.map((juryLastName, id) => (
                                                                <td key={id}>
                                                                    {!isEmpty(performance.marks.filter((mark) => mark.juryLastName === juryLastName)) ? performance.marks.filter((mark) => mark.juryLastName === juryLastName)[0].value : 0}
                                                                </td>
                                                            ))}
                                                        <td><input type={"button"} value={"Submit"}
                                                                   className={"btn btn-success"}
                                                                   style={{"width": "100%"}}
                                                                   onClick={() => handleSubmit(currentContest, performance)}/>
                                                        </td>
                                                    </tr>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                    </tbody>
                                )}
                            </Droppable>
                        </DragDropContext>
                    </table>
                </div>
            </div>
        </div>

    )
}
export default SortPerformancesInContest