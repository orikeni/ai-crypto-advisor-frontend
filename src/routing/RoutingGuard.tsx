import { type JSX, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import type { AppState } from "../Redux/store";


interface RoutingProps {
    child: JSX.Element;
}

function RoutingGuard({ child }: RoutingProps): JSX.Element {
    const navigate = useNavigate();
    const user = useSelector((state: AppState) => state.user);

    useEffect(() => {
        if (!user) {
            navigate("/login");
        }
    }, [user, navigate]);

    return child;
}

export default RoutingGuard;