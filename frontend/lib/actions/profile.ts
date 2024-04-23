export const logOut = async (accessToken: string) => {
    const result = await fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/logout`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
            "Authorization": `Bearer ${accessToken}`
        }
    })

    return result;
}