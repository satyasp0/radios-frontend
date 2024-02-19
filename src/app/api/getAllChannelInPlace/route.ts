import {radioDefaultEndpoint} from "../../../../config";
export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const code = searchParams.get('code')
    try {
        const response = await fetch(radioDefaultEndpoint+`/page/${code}/channels`);
        const data = await response.json()
        return Response.json({ data })
    } catch (error) {
        console.error("Error in fetchNowPlaying:", error);
        throw error;
    }
}