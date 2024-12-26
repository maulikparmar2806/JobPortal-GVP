export const validateLoginForm = (username, password) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+\.gvp@gujaratvidyapith\.org$/;
    if (!username && !password) {
        return "Username & Password Both are Required !"
    }

    else if (!emailPattern.test(username)) {
        return "Only Enter Gujarat Vidyapith Username !"

    }
    else if (!username) {
        return "Username Required !"
    }
    else if (!password) {
        return "Password Required !"
    }
    return null;


}

export const validateStudentLoginForm = (course, email, password) => {
    const emailPattern = /^[a-zA-Z0-9._%+-]+\.gvp@gujaratvidyapith\.org$/;

    if (!course && !email && !password) {
        return "Course, Username, and password are required !";
    } else if (!course) {
        return "Please choose a course !";
    } else if (!email) {
        return "Username Required !";
    }
    else if (!emailPattern.test(email)) {
        return "Only Enter Gujarat Vidyapith Username !";
    }
    else if (!password) {
        return "Password Required !";
    }
    return null;
};