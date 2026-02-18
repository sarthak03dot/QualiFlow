import { Component, ReactNode } from "react";

class ErrorBoundary extends Component<{ children: ReactNode }, { hasError: boolean }> {
    state = { hasError: false };

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) return <h2 className="sww">Something went wrong.</h2>;
        return this.props.children;
    }
}

export default ErrorBoundary;
