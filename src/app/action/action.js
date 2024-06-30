'use server'
import { revalidatePath } from "next/cache";
import { signIn } from "../../../auth";

export async function login(info) {
    // console.log({info});
    try {
        const res = await signIn("credentials", {
            email: info.email,
            password: info.password,
            redirect: false
        })

        console.log(res, "after login ");
        revalidatePath("/")
        return res
    } catch (error) {
        console.log(error);
        throw new Error(error)
    }
}

