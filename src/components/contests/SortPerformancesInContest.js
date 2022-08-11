import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {loadContestsAsync,} from "../../redux/reducers/contests/contest.thunks";
import {
    clearActiveTimers,
    loadPerformancesByContestAsync, removePerformanceToAssessment, requestForActivePerformance,
    resortPerformances,
    savePerformancesOrder, setToastShowing, submitPerformanceToAssessment
} from "../../redux/reducers/performances/performance.thunks";
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import {isEmpty} from "lodash";
import {useTranslation} from "react-i18next";

const SortPerformancesInContest = () => {
    const {t} = useTranslation();
    const {id} = useParams();
    const {
        performances,
        isLoading,
        isSaving,
        error,
        isToastShowing,
        orderWasChanged,
        requestActivePerformanceError, activePerformance
    } = useSelector(state => state.performances);
    const {contests} = useSelector(state => state.contests);
    const currentContest = contests ? contests.find(contest => contest.id === parseInt(id)) : null;
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [showMarks, setShowMarks] = useState(false);

    useEffect(() => {
        dispatch(clearActiveTimers());
        if (!currentContest) {
            navigate("/contests");
            return;
        }
        if (!contests) {
            dispatch(loadContestsAsync())
        }
        if (!orderWasChanged) {
            dispatch(loadPerformancesByContestAsync(currentContest));
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

    useEffect(() => {
        for (let i = 0; i > -1; i--) {
            clearTimeout(i)
        }
        if (activePerformance)
            dispatch(requestForActivePerformance(currentContest.id, activePerformance));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activePerformance, requestActivePerformanceError]);

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

    const getMark = (juryLastName, performance) => {
        const filteredMark = performance.summaryMarks.filter(mark => mark.juryLastName === juryLastName);
        if (isEmpty(filteredMark)) return 0
        if (filteredMark.length > 1) return -1
        return filteredMark[0].value
    }

    const getRowColor = (performance) => {
        let result = ""
        if (activePerformance && activePerformance.id === performance.id) result = "bg-info"
        let isFullMarked = true;
        performance.summaryMarks.forEach(mark => {
            if (mark.value === 0) {
                isFullMarked = false
            }
        })
        if (isFullMarked) return "bg-success text-white";
        return result;
    }

    return (
        <div className={"container"}>
            <div className={"row"}>
                <div className={"col-md-12 mb-2"} style={{"textAlign": "right"}}>
                    <input type={"button"} value={t("Remove assessment")}
                           className={"btn btn-outline-danger mt-3"}
                           onClick={() => handleRemoveAssessment(currentContest)}/>
                </div>
                <div className={"col-md-12"} style={{"textAlign": "right"}}>
                    {t("Show marks")} <input type={"checkbox"} className={"mr-1 form-check-input"}
                                      checked={showMarks}
                                      onChange={() => showMarks ? setShowMarks(false) : setShowMarks(true)}/>
                </div>

                <div className={"col-md-10 mx-auto mt-3"}>
                    <h1 id="rt" className={"col-md-10 mx-auto mb-3"} style={{"textAlign": "center"}}>{t("PERFORMANCES MANAGER")}</h1>
                    {isLoading && <h3 style={{"color": "red"}}>{t("Loading...")}</h3>}
                    {orderWasChanged &&
                        <h5 id="saveOrder" style={{"color": "red"}}>{t("You should save previous order first and then reload data. To discard changes reload page (F5)")}</h5>}

                    {orderWasChanged &&
                        <input type={"button"} value={t("PRESS  TO  SAVE  ORDER")} className={"btn btn-danger"}
                               style={{"width": "100%"}} onClick={() => handleSaveOrder()}/>}
                    {error && <h3 style={{"color": "red"}}>{error}</h3>}
                    <table className={"table table-hover"}>
                        <thead className={"text-white bg-dark text-center"}>
                        <tr>
                            <th scope={"col"}>#</th>
                            <th scope={"col"}>{t("Member")}</th>
                            <th scope={"col"}>{t("Place")}</th>
                            <th scope={"col"}>{t("Performance")}</th>
                            <th scope={"col"}>{t("Category")}</th>
                            {showMarks && currentContest &&
                                currentContest.juryLastNames.sort().map((lastName, id) => (
                                    <th key={id} scope={"col"}>{lastName}</th>
                                ))}
                            <th scope={"col"}>{t("Submit for assessment")}</th>
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
                                                    <tr className={getRowColor(performance)}
                                                        ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                                        <td>{index + 1}</td>
                                                        <td>{performance.fullName}</td>
                                                        <td>{performance.place}</td>
                                                        <td>{performance.name}</td>
                                                        <td>{performance.category.name}</td>
                                                        {showMarks && currentContest &&
                                                            currentContest.juryLastNames.sort().map((lastName, id) => (
                                                                <td key={id}>
                                                                    {getMark(lastName, performance)}
                                                                </td>
                                                            ))}
                                                        <td><input type={"button"} value={t("Submit")}
                                                                   className={activePerformance && activePerformance.id === performance.id?"btn btn-danger":"btn btn-success"}
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