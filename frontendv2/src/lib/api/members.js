import { API_URL, fetchAPIWithData, fetchAPIWithFormData } from '.';

const fetchMembers = async (list) => {
    const url = new URL(API_URL + "members");
    const { data, error } = await fetchAPIWithFormData(url, "get")
    return { dataMembers: data.members, error }
};

const removeMember = async (member) => {
    const url = new URL(API_URL + "members");
    const { error } = await fetchAPIWithFormData(url, "delete", member);
    return { error }
}

const createMember = async (formData) => {
    const { data, error } = await fetchAPIWithData("members", "post", formData);
    return { dataMember: data ? data.member : null, error }
}
const updateMember = async (member) => {
    const { data, error } = await fetchAPIWithData("members", "put", member);
    return { dataMember: data ? data.member : null, error }
}

const getMemberForCurrentUser = async () => {
    const url = new URL(API_URL + "members/user");
    const { data, error } = await fetchAPIWithFormData(url, "get")
    return { dataMember: data ? data.member : null, error };
}
export { fetchMembers, removeMember, createMember, updateMember, getMemberForCurrentUser }