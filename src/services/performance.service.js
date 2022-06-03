import apiClient from "../helper/apiClient";

class PerformanceService {
    getAllCPerformancesByContest = (contestId) => apiClient().get('contests/' + contestId + '/performances');
    performancesOrderSave = (performances) => apiClient().post('contests/performances', performances);
    submitPerformanceToAssessment = (contestId, performance) => apiClient().post('contests/' + contestId + '/setActivePerformance', performance)
    removePerformanceToAssessment = (contestId) => apiClient().post('contests/' + contestId + '/setActivePerformance')
}

export default new PerformanceService();