import jwt from "jsonwebtoken";

//Fetchuser function fetch the user details from jwt authtoken and returns the user to the corresponding routes.
//getuser etc. uses this function to fetch the user details to perform specific tasks.

export function fetchuser(token) {
    let success = false;
    //Checking for authtoken from header
    if (!token) {
        return NextResponse.json({ success }, { status: 404 })
    }
    try {
        let data = jwt.verify(token, process.env.JWT_SECRET_KEY);
        let userid = data.user.id;
        return userid;

    } catch (error) {
        return NextResponse.json({ success }, { status: 404 })
    }

}