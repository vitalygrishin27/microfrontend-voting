import apiClient from "../helper/apiClient";

class JuryService {
    getAllJuries = () => apiClient().get('juries');
    createJury = (jury) => apiClient().post('juries', jury, {headers: {'content-type': 'multipart/form-data'}});
    updateJury = (jury) => apiClient().put('juries', jury, {headers: {'content-type': 'multipart/form-data'}});
    deleteJury = (id) => apiClient().delete('juries/' + id);
}

export default new JuryService();