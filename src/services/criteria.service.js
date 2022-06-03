import apiClient from "../helper/apiClient";

class CriteriaService {
    getAllCriteria = () => apiClient().get('criteria');
    createCriteria = (criteria) => apiClient().post('criteria', criteria);
    updateCriteria = (criteria) => apiClient().put('criteria', criteria)
    deleteCriteria = (id) => apiClient().delete('criteria/'+id);
}

export default new CriteriaService();