import './App.css';
import Navbar from "./components/Navbar";
import {ToastContainer} from "react-toastify";
import {Route, Routes} from "react-router-dom";
import AddMember from "./components/members/AddMember";
import EditMember from "./components/members/EditMember";
import Members from "./components/members/Members";
import Home from "./components/Home";
import Contests from "./components/contests/Contests";
import AddContest from "./components/contests/AddContest";
import EditContest from "./components/contests/EditContest";
import Criteria from "./components/criteria/Criteria";
import AddCriteria from "./components/criteria/AddCriteria";
import EditCriteria from "./components/criteria/EditCriteria";
import Juries from "./components/juries/Juries";
import AddJury from "./components/juries/AddJury";
import EditJury from "./components/juries/EditJury";
import Categories from "./components/categories/Categories";
import AddCategory from "./components/categories/AddCategory";
import EditCategory from "./components/categories/EditCategory";
import SortPerformancesInContest from "./components/contests/SortPerformancesInContest";

const App = () => {
    return (
        <div className="App">
            <ToastContainer position="bottom-left"/>
            <Navbar/>
            <Routes>
                <Route path="/*" element={<Home/>}/>

                <Route path="/members" element={<Members/>}/>
                <Route path="/members/add" element={<AddMember/>}/>
                <Route path="/members/edit/:id" element={<EditMember/>}/>

                <Route path="/contests" element={<Contests/>}/>
                <Route path="/contests/add" element={<AddContest/>}/>
                <Route path="/contests/edit/:id" element={<EditContest/>}/>
                <Route path="/contests/sort/:id" element={<SortPerformancesInContest/>}/>

                <Route path="/criteria" element={<Criteria/>}/>
                <Route path="/criteria/add" element={<AddCriteria/>}/>
                <Route path="/criteria/edit/:id" element={<EditCriteria/>}/>

                <Route path="/juries" element={<Juries/>}/>
                <Route path="/juries/add" element={<AddJury/>}/>
                <Route path="/juries/edit/:id" element={<EditJury/>}/>

                <Route path="/categories" element={<Categories/>}/>
                <Route path="/categories/add" element={<AddCategory/>}/>
                <Route path="/categories/edit/:id" element={<EditCategory/>}/>
            </Routes>
        </div>
    );
}

export default App;
