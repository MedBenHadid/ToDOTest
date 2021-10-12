import * as CategoryConstants from "../constants/Category";


export const listCategorys = (state = { listCategory: [] }, action) => {
    switch (action.type) {
        case CategoryConstants.Categorys_FETCH_START:

            return {
                loading: true,
                listCategory: [],
                success: false


            };
        case CategoryConstants.Categorys_FETCH_SUCCESS:
            return {
                listCategory: action.payload,
                success: true

            };
        case CategoryConstants.Categorys_FETCH_ERROR:
            return {
                error: action.payload,
            };
        default: return state;
    }
};

export const Category = (state = { Category: {} }, action) => {
    switch (action.type) {
        case CategoryConstants.Category_FETCH_START:
            return {
                loading: true,
                Category: {}
            }
        case CategoryConstants.Category_FETCH_START:
            return {
                Category: action.payload.Category,
                success: true
            }
        case CategoryConstants.Category_FETCH_FAIL:
            return {
                error: action.payload
            }
        default: return state;
    }
}

export const deleteCategory = (state = {}, action) => {
    switch (action.type) {
        case CategoryConstants.DELETE_Category_START:
            return {
                loading: true,
            };
        case CategoryConstants.DELETE_Category_SUCCESS:
            return {
                success: true,
            };
        case CategoryConstants.DELETE_Category_FAIL:
            return {
                error: action.payload,
            };

        case CategoryConstants.DELETE_Category_RESET:
            return {};

        default:
            return state;
    }
};

export const createCategory = (state = {}, action) => {
    switch (action.type) {
        case CategoryConstants.CREATE_Category_START:
            return {
                loading: true,
            };
        case CategoryConstants.CREATE_Category_SUCCESS:
            return {
                success: true,
            };
        case CategoryConstants.CREATE_Category_FAIL:
            return {
                error: action.payload,
            };

        case CategoryConstants.CREATE_Category_RESET:
            return {};

        default:
            return state;
    }
};

export const editCategory = (state = {}, action) => {
    switch (action.type) {
        case CategoryConstants.EDIT_Category_START:
            return {
                loading: true,
            };
        case CategoryConstants.EDIT_Category_SUCCESS:
            return {
                success: true,
            };
        case CategoryConstants.EDIT_Category_FAIL:
            return {
                error: action.payload,
            };
        case CategoryConstants.EDIT_Category_RESET:
            return {};
        default:
            return state;
    }
};
