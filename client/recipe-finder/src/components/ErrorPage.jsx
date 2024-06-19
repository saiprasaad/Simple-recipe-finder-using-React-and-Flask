import { useRouteError } from "react-router-dom"

export function ErrorPage() {
    const error = useRouteError();
    return <div>
        <h3>{error.error && error.error.message}</h3>
    </div>
}