import React, {useEffect, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {
    changeSelectedCategories,
    setToastShowing,
    updateContestAsync, updateSelectedCategoriesList
} from "../../redux/reducers/contests/contest.thunks";
import {isEmpty} from "lodash";

const EditContest = () => {
    const {id} = useParams();
    const {contests, isSaving, error, selectedCategories, isToastShowing} = useSelector(state => state.contests);
    const currentContest = contests ? contests.find(contest => contest.id === parseInt(id)) : null;
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const {categories} = useSelector(state => state.categories);
    const [preview, setPreview] = useState("");

    const handleChangeCategoriesToContest = (checked, category) => {
        dispatch(changeSelectedCategories({checked, category}))
    }

    useEffect(() => {
        if (currentContest) {
            setName(currentContest.name);
            setDescription(currentContest.description);
            setPreview(currentContest.photo);
            dispatch(updateSelectedCategoriesList({currentContest, categories}))
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentContest])

    useEffect(() => {
        if (isToastShowing) {
            if (error) {
                toast.error(error)
                dispatch(setToastShowing(false));
            } else if (!isSaving) {
                toast.success("Update was successful!")
                dispatch(setToastShowing(false));
                navigate("/contests");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaving])

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        let data = new FormData();
        for (let key in currentContest) {
            if (currentContest[key] !== null && !isEmpty(currentContest[key])) {
                data.append(key, currentContest[key])
            }
        }
        data.delete("performances")
        data.delete("activePerformance")
        data.set("id", currentContest.id)
        data.set("name", name)
        data.set("description", description)
        data.set("photo", preview)

        if (!isEmpty(selectedCategories)) {
            let listOfCategoriesId = [];
            selectedCategories.forEach(item => listOfCategoriesId.push(item.id));
            data.set("categories", listOfCategoriesId)
        }

        if (document.getElementById('imgInpEditContest').files[0] != null && preview !== '') {
            data.set('file', document.getElementById('imgInpEditContest').files[0]);
        }

           for (const pair of data.entries()) {
               console.log(pair[0] + ', ' + pair[1]);
           }
        dispatch(updateContestAsync(data));
    };

    const handleChangePhoto = (event) => {
        if (event.target.files[0]) {
            setPreview(URL.createObjectURL(event.target.files[0]));
        }
    }

    const handleDeletePhoto = () => {
        document.getElementById('imgInpEditContest').value = '';
        setPreview('');
    }

    return (
        <div className={"container"}>

            {currentContest ? (
                <div className={"row"}>
                    <h3 className={"display-7 text-center"}>Edit info
                        of {currentContest.name}</h3>
                    <div className={"col-md-6 shadow mx-auto p-5"}>
                        {isSaving && <h3>Saving...</h3>}
                        <form onSubmit={handleSubmit}>
                            <div className={"form-group mb-2"}>
                                <input required type={"text"} placeholder={"Name"} className={"form-control"}
                                       value={name} onChange={e => setName(e.target.value)}/>
                            </div>
                            <div className={"form-group mb-2"}>
                                <input type={"text"} placeholder={"Description"} className={"form-control"}
                                       value={description} onChange={e => setDescription(e.target.value)}/>
                            </div>
                            {categories && categories.map((category, id) => (
                                <div key={id} className={"form-group mb-3"} style={{"textAlign": "left"}}>
                                    <input type={"checkbox"} className={"mr-1"}
                                           checked={selectedCategories.includes(category)}
                                           onChange={e => handleChangeCategoriesToContest(e.target.checked, category)}/> {category.name}
                                </div>
                            ))}

                            <div className={"form-group mb-2"}>
                                <input id="imgInpEditContest" type={"file"} className={"form-control mb-3"}
                                       onChange={e => handleChangePhoto(e)}/>
                                <img alt="preview" style={{"display": preview ? "inline-block" : "none"}}
                                     src={preview}
                                     width={"100"}
                                     height={"142"}/>
                            </div>
                            <input style={{"display": preview ? "inline-block" : "none"}} type={"button"}
                                   value={"Delete image"} className={"btn btn-dark mb-2"}
                                   onClick={() => handleDeletePhoto()}
                            />

                            <div className={"form-group"}>
                                <input type={"submit"} value={"Update"} className={"btn btn-dark"}
                                />
                                <Link to={"/contests"} className={"btn btn-danger mx-3"}
                                      style={{"textAlign": "center"}}>Cancel</Link>
                            </div>
                        </form>
                    </div>
                </div>
            ) : (
                <h1 className={"display-3 text-center"}>Contest with {id} not found</h1>
            )}

        </div>

    )
}
export default EditContest