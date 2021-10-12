import axios from "axios";
import * as CategoryConstants from "../constants/Category";

export const listCategorys = (initialLoading) => async (dispatch) => {

    try {
        // if(initialLoading){
        // dispatch({type : CategoryConstants.Categorys_FETCH_START});
        // }

        await axios.get(`http://localhost:5000/api/category/`)
            .then((res) => {
                const listCategory = res.data;
                dispatch({
                    type: CategoryConstants.Categorys_FETCH_SUCCESS,
                    payload: listCategory,
                });
            })
    } catch (error) {
        dispatch({
            type: CategoryConstants.Categorys_FETCH_ERROR,
            payload: error.response && error.response.data.error
                ? error.response.data.error : error.message
        });
    }

};

export const Category = (id) => async (dispatch) => {
    try {
        dispatch({ type: CategoryConstants.Category_FETCH_START });

        await axios.get(`http://localhost:5000/api/product/${id}`).then((res) => {
            const product = res.data.data;
            const recommended = res.data.recommended.recomms
            // console.log(recommended)
            dispatch({
                type: CategoryConstants.Category_FETCH_SUCCESS,
                payload: { product, recommended }
            });
        });
    } catch (error) {
        dispatch({
            type: CategoryConstants.Category_FETCH_FAIL,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
    }
};


export const deleteCategory = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: CategoryConstants.DELETE_Category_START });


        await axios.delete(`http://localhost:5000/api/category/${id}`).then((resp) => {
            dispatch({
                type: CategoryConstants.DELETE_Category_SUCCESS,
            });
        });
    } catch (error) {
        dispatch({
            type: CategoryConstants.DELETE_Category_FAIL,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
    }
};

export const createCategory = (formData) => async (dispatch, getState) => {

    try {
        dispatch({ type: CategoryConstants.CREATE_Category_START });
        console.log(formData)

        await axios.post("http://localhost:5000/api/category/", formData).then((resp) => {
            dispatch({
                type: CategoryConstants.CREATE_Category_SUCCESS,
            });
        });
    } catch (error) {
        dispatch({
            type: CategoryConstants.CREATE_Category_FAIL,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
    }
};

export const editCategory = (id, UpdatedData) => async (dispatch, getState) => {
    try {
        dispatch({ type: CategoryConstants.EDIT_Category_START });
        const {
            userLogin: { userInfo },
        } = getState();

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        };
        await axios
            .put(`http://localhost:5000/api/product/${id}`, UpdatedData, config)
            .then((resp) => {
                const response = resp.data
                dispatch({
                    type: CategoryConstants.EDIT_Category_SUCCESS,

                    payload: "Product updated successfully",
                });
            });
    } catch (error) {
        dispatch({
            type: CategoryConstants.EDIT_Category_FAIL,
            payload:
                error.response && error.response.data.error
                    ? error.response.data.error
                    : error.message,
        });
    }
};
