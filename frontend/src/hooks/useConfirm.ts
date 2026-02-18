export const useConfirm = () => {
    return async (msg: string) => window.confirm(msg);
};
