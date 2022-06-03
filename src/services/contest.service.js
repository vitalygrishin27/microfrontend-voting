import apiClient from "../helper/apiClient";

class ContestService {
    getAllContests = () => apiClient().get('contests');
    createContest = (contest) => apiClient().post('contests', contest);
    updateContest = (contest) => apiClient().put('contests', contest, {headers: {'content-type': 'multipart/form-data'}});
    deleteContest = (id) => apiClient().delete('contests/' + id);
}

export default new ContestService();