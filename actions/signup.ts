import axios from "axios";

interface UserDetails {

    username: string,
    email: string,
    password: string

};

interface Data {

    id: string,
    username: string,
    email: string

}

interface SignupResponse {

    success: boolean,
    message: string,
    data: Data

}

export async function SignUpUser(userdata: UserDetails): Promise<SignupResponse | undefined> {

    try {

        const res = await axios.post<SignupResponse>("/api/auth/signup", userdata);

        return res.data;

    } catch (error) {
        if (axios.isAxiosError(error)) {
            throw new Error(
                error.response?.data?.message || "Signup failed"
            );
        }

        throw new Error("Something went wrong");
    };

};