const { fetchWrapper } = require("lib/fetchWrapper");
const { useEffect, useState } = require("react");

const ImageFetch = ({ api_path, params, width = 200, height = 200 }) => {
    const [src, setSrc] = useState();
    useEffect(() => {
        (async () => {
            const url = new URL("http://localhost:3000/" + api_path);
            if (params._id) url.searchParams.append('_id', params._id)
            const imageUrl = await fetchWrapper.fetchImage(url)
            if (imageUrl) setSrc(imageUrl);
        })()
    }, [api_path, params])
    return (<>
        {src && <img {...{ height, width, src }} alt="Proof Image" />}
    </>);
}
export { ImageFetch }