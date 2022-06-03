import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {toast} from "react-toastify";
import {
    changeSelectedCategories,
    clearSelectedCategories,
    createContestAsync,
    setToastShowing
} from "../../redux/reducers/contests/contest.thunks";
import {isEmpty} from "lodash";
import {loadCategoriesAsync} from "../../redux/reducers/categories/category.thunks";

const AddContest = () => {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const {categories} = useSelector(state => state.categories);
    const [preview, setPreview] = useState("");
    const {isSaving, error, selectedCategories, isToastShowing} = useSelector(state => state.contests);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();

        let data = new FormData();
        data.append('name', name);
        data.append('description', description);

        if (!isEmpty(selectedCategories)) {
            let listOfCategoriesId = [];
            selectedCategories.forEach(item => listOfCategoriesId.push(item.id));
            data.append("categories", listOfCategoriesId)
        }

        if (document.getElementById('imgInpContest').files[0] && preview !== '') {
            data.append('file', document.getElementById('imgInpContest').files[0]);
        }

        /*  for (const pair of data.entries()) {
              console.log(pair[0] + ', ' + pair[1]);
          }*/
        dispatch(createContestAsync(data));
    };

    const handleChangeCategoriesToContest = (checked, category) => {
        dispatch(changeSelectedCategories({checked, category}))
    }

    useEffect(() => {
        dispatch(clearSelectedCategories());
        if (!categories) {
            dispatch(loadCategoriesAsync());
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
                navigate("/contests");
            }
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSaving])

    const handleDeletePhoto = () => {
        document.getElementById('imgInpContest').value = '';
        setPreview('');
    }

    return (
        <div className={"container"}>
            <div className={"row"}>
                <h3 className={"display-7 text-center"}>Create new contest</h3>
                <div className={"col-md-6 shadow mx-auto p-5"}>
                    <form onSubmit={handleSubmit}>
                        <div className={"form-group mb-2"}>
                            <input required type={"text"} placeholder={"Name"} className={"form-control"}
                                   value={name} onChange={e => setName(e.target.value)}/>
                        </div>

                        <div className={"form-group mb-2"}>
                            <input type={"text"} placeholder={"Description"} className={"form-control"}
                                   value={description} onChange={e => setDescription(e.target.value)}/>
                        </div>
                        <div style={{"display": !isEmpty(categories) ? "inline-block" : "none"}}>
                            Included categories
                        </div>
                        {categories && categories.map((category, id) => (
                            <div key={id} className={"form-group mb-3"} style={{"textAlign": "left"}}>
                                <input type={"checkbox"} className={"mr-1"}
                                       checked={selectedCategories.includes(category)}
                                       onChange={e => handleChangeCategoriesToContest(e.target.checked, category)}/> {category.name}
                            </div>
                        ))}


                        <div className={"form-group mb-2"}>
                            <input id="imgInpContest" type={"file"} className={"form-control mb-3"}
                                   onChange={e => setPreview(e.target.value)}/>
                            <img alt="preview" style={{"display": preview ? "inline-block" : "none"}}
                                 src={preview ? URL.createObjectURL(document.getElementById('imgInpContest').files[0]) : ""}
                                 width={"100"}
                                 height={"142"}/>
                            <input style={{"display": preview ? "inline-block" : "none"}} type={"button"}
                                   value={"Delete image"} className={"btn btn-dark mb-2"}
                                   onClick={() => handleDeletePhoto()}/>
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
export default AddContest