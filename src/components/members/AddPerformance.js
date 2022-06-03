import React, {useEffect, useState} from 'react'
import "./Modal.css";
import {useDispatch, useSelector} from "react-redux";
import {loadCategoriesAsync} from "../../redux/reducers/categories/category.thunks";
import {uid} from "uid";
import {changeSelectedPerformances} from "../../redux/reducers/members/member.thunks";

function AddPerformance({setOpenModal}) {
    const [name, setName] = useState("");
    const [selectedCategory, setSelectedCategory] = useState({});
    const {categories} = useSelector(state => state.categories);
    const dispatch = useDispatch();
    useEffect(() => {
        if (!categories) {
            dispatch(loadCategoriesAsync())
        }// eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            tempId: uid(),
            name: name,
            categoryId: selectedCategory,
        }
        const changePerformances = {
            performance: data,
            needToAdd: true,
        }

        dispatch(changeSelectedPerformances(changePerformances));
        setOpenModal(false);
    };

    return (
        <div className="modalBackground">
            <div className="modalContainer">
                <form onSubmit={handleSubmit}>
                    <div>
                        <h3 className={"display-7 text-center"}>New Performance</h3>

                        <div className={"form-group mb-2"}>
                            <select required id="combo" className={"form-control"}
                                    value={selectedCategory} onChange={e => setSelectedCategory(e.target.value)}>
                                <option value={''}> -- Select Category --</option>
                                {categories && categories.map((category, id) => (

                                    <option key={id} value={category.id} className={"mr-1"}> {category.name}</option>

                                ))}
                            </select>
                        </div>

                        <div className={"form-group mb-2 mt-3 mb-3"}>
                            <input required type={"text"} placeholder={"Name"} className={"form-control"}
                                   value={name} onChange={e => setName(e.target.value)}/>
                        </div>

                    </div>
                    <div className={"form-group"}>
                        <button type="button" onClick={() => {
                            setOpenModal(false)
                        }}
                                className="btn btn-small btn-danger mb-1">Cancel
                        </button>
                        <input type={"submit"} value={"Add performance"}
                               className={"btn btn-small btn-primary mx-2 mb-1"}/>

                    </div>
                </form>
            </div>
        </div>
    );
}

export default AddPerformance;