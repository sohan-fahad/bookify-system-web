import SessionUtils from "@src/utils/session.utils";
import { jwtDecode } from "jwt-decode";

export default function useIsJWTValid() {
    const token = SessionUtils.getToken();
    if (!token) {
        return false;
    }
    try {
        const decoded = jwtDecode(token);
        return decoded.exp && decoded.exp > Date.now() / 1000;
    } catch (error) {
        return false;
    }
};