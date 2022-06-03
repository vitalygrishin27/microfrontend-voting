import {combineReducers} from "redux";
import memberReducer from "./members/member.reducer";
import contestReducer from "./contests/contest.reducer";
import criteriaReducer from "./criteria/criteria.reducer";
import juryReducer from "./jury/jury.reducer";
import categoryReducer from "./categories/category.reducer";
import performanceReducer from "./performances/performance.reducer";

const rootReducer = () =>
    combineReducers({
        members: memberReducer,
        contests: contestReducer,
        criteria: criteriaReducer,
        juries: juryReducer,
        categories: categoryReducer,
        performances: performanceReducer
    });

export default rootReducer;