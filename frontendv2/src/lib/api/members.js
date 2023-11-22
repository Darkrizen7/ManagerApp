import { API_URL, fetchAPIWithFormData } from '.';

const fetchMembers = async (list) => {
    const url = new URL(API_URL + "members");
    const { data, error } = await fetchAPIWithFormData(url, "get")
    return { dataMembers: data.members, error }
};

export { fetchMembers }