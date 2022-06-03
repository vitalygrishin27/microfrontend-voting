import apiClient from "../helper/apiClient";

class MemberService {
    getAllMembers = () => apiClient().get('members');
    createMember = (member) => apiClient().post('members', member);
    updateMember = (member) => apiClient().put('members', member);
    deleteMember = (id) => apiClient().delete('members/' + id);
}

export default new MemberService();