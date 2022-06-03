import apiClient from "../helper/apiClient";
import {isNull} from "lodash";

class PerformanceService {
    getAllCPerformancesByContest = (contestId) => apiClient().get('contests/' + contestId + '/performances');
    performancesOrderSave = (performances) => apiClient().post('contests/performances', performances);
    submitPerformanceToAssessment = (contestId, performance) => apiClient().post('contests/' + contestId + '/setActivePerformance', performance)
    removePerformanceToAssessment = (contestId) => apiClient().post('contests/' + contestId + '/setActivePerformance')
    //  deleteCriteria = (id) => apiClient().delete('criteria/'+id);
}

export default new PerformanceService();