export const getRealID = (urls:string, part:number) => {
    const parts = urls.split('/');
    return parts[parts.length - part];
}