export const unwrapJsonModule = (module: any) => {
    if (module) {
        if (module.default) {
            return module.default;
        }
        return module;
    }
    return module;
}
