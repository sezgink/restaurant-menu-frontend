// "use client"; // Mark this component as a Client Component

export function isAuthenticated() {
    let value
    // Get the value from local storage if it exists
    value = localStorage.getItem("userId") || ""

    return value!==""
    
}
export function Authenticate(userId,email) {
    localStorage.setItem("userId",userId)
    localStorage.setItem("email",email)
}
export function Logout(userId,email) {
    let value
    // Get the value from local storage if it exists
    localStorage.setItem("userId","")
    localStorage.setItem("email","")
}