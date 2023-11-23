const { fetchWrapper } = require("lib/fetchWrapper");
const { useEffect, useState } = require("react");

const ImageFetch = (props) => {
    const { api_path, params } = props;
    const [imageSrc, setImageSrc] = useState();
    useEffect(() => {
        (async () => {
            const url = new URL("http://localhost:3000/" + api_path);
            if (params._id) url.searchParams.append('_id', params._id)
            const imageUrl = await fetchWrapper.fetchImage(url)
            if (imageUrl) setImageSrc(imageUrl);
        })()
    }, [api_path, params])
    return (<>
        {imageSrc && <img width="200" src={imageSrc} alt="Proof Image" />}
    </>);
}
export { ImageFetch }