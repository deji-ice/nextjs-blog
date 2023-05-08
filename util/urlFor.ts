import  ImageUrlBuilder  from "@sanity/image-url";
import { client } from "./sanity.client";

const builder = ImageUrlBuilder(client);

const urlFor = (source: any) => {
    return builder.image(source)
}

export default urlFor