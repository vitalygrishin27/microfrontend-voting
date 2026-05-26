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
        <div className="container py-4">

            {/* HEADER ACTIONS */}
            <div className="d-flex justify-content-between align-items-center mb-3">

                <div>
                    <h2 className="fw-bold mb-0">
                        {t("PERFORMANCES MANAGER")}
                    </h2>
                    <small className="text-muted">
                        {currentContest?.name}
                    </small>
                </div>

                <div className="text-end">

                    <button
                        className="btn btn-outline-danger"
                        onClick={() => handleRemoveAssessment(currentContest)}
                    >
                        {t("Remove assessment")}
                    </button>

                </div>

            </div>

            {/* TOGGLE MARKS */}
            <div className="d-flex justify-content-end align-items-center mb-3 gap-2">

                <label className="form-check-label mb-0">
                    {t("Show marks")}
                </label>

                <div className="form-check form-switch m-0">
                    <input
                        className="form-check-input"
                        type="checkbox"
                        checked={showMarks}
                        onChange={(e) => setShowMarks(e.target.checked)}
                    />
                </div>

            </div>

            {/* STATUS */}
            {isLoading && (
                <div className="alert alert-info">
                    {t("Loading...")}
                </div>
            )}

            {error && (
                <div className="alert alert-danger">
                    {error}
                </div>
            )}

            {orderWasChanged && (
                <div className="alert alert-warning">
                    {t("You should save previous order first and reload data")}
                </div>
            )}

            {/* SAVE ORDER */}
            {orderWasChanged && (
                <button
                    className="btn btn-danger w-100 mb-3"
                    onClick={handleSaveOrder}
                >
                    {t("PRESS TO SAVE ORDER")}
                </button>
            )}

            {/* TABLE CARD */}
            <div className="card shadow-sm border-0">

                <div className="table-responsive">

                    <table className="table table-hover align-middle mb-0">

                        <thead className="table-dark text-center">
                        <tr>
                            <th>#</th>
                            <th>{t("Member")}</th>
                            <th>{t("Place")}</th>
                            <th>{t("Performance")}</th>
                            <th>{t("Category")}</th>

                            {showMarks && currentContest?.juryLastNames
                                ?.slice()
                                ?.sort()
                                ?.map((lastName, id) => (
                                    <th key={id}>{lastName}</th>
                                ))}

                            <th>{t("Submit")}</th>
                        </tr>
                        </thead>

                        <DragDropContext onDragEnd={handleOnDragEnd}>
                            <Droppable droppableId="characters">

                                {(provided) => (
                                    <tbody
                                        ref={provided.innerRef}
                                        {...provided.droppableProps}
                                    >

                                    {performances?.map((performance, index) => (
                                        <Draggable
                                            key={performance.id}
                                            draggableId={performance.id.toString()}
                                            index={index}
                                        >
                                            {(provided) => (
                                                <tr
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className={
                                                        getRowColor(performance) ||
                                                        ""
                                                    }
                                                >

                                                    <td>{index + 1}</td>
                                                    <td>{performance.fullName}</td>
                                                    <td>{performance.place}</td>
                                                    <td>{performance.name}</td>
                                                    <td>{performance.category?.name}</td>

                                                    {showMarks &&
                                                        currentContest?.juryLastNames
                                                            ?.slice()
                                                            ?.sort()
                                                            ?.map((lastName, id) => (
                                                                <td key={id}>
                                                                    {getMark(lastName, performance)}
                                                                </td>
                                                            ))}

                                                    <td>
                                                        <button
                                                            className={
                                                                activePerformance &&
                                                                activePerformance.id === performance.id
                                                                    ? "btn btn-danger w-100"
                                                                    : "btn btn-success w-100"
                                                            }
                                                            onClick={() =>
                                                                handleSubmit(currentContest, performance)
                                                            }
                                                        >
                                                            {t("Submit")}
                                                        </button>
                                                    </td>

                                                </tr>
                                            )}
                                        </Draggable>
                                    ))}

                                    {provided.placeholder}

                                    </tbody>
                                )}

                            </Droppable>
                        </DragDropContext>

                    </table>

                </div>

            </div>

        </div>
    );
}
export default SortPerformancesInContest