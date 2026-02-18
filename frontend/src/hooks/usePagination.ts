import { useState } from "react";

export const usePagination = () => {
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    return { page, limit, setPage };
};
