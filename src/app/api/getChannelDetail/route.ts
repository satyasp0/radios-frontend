import {radioDefaultEndpoint} from "../../../../config";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    try {
        const response = await fetch(
            radioDefaultEndpoint+`/channel/${code}`
        );
        const data = await response.json();
        console.log("Fetch successful:", data);
        return Response.json({ data })
    } catch (error) {
        console.error("Error in fetchNowPlaying:", error);
        throw error;
    }
}