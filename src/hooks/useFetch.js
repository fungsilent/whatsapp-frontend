import { useReducer } from "react";

const STATUS = {
    IDLE: "IDLE",
    LOADING: "LOADING",
    SUCCESS: "SUCCESS",
    FAIL: "FAIL",
};

const reducer = (state, { type, payload }) => {
    const status = type;
    switch (type) {
        case STATUS.LOADING: {
            return {
                ...state,
                status,
            };
        }
        case STATUS.SUCCESS: {
            return {
                ...state,
                status,
                data: payload,
            };
        }
        case STATUS.FAIL: {
            return {
                ...state,
                status,
                error: payload,
            };
        }
        default: {
            return state;
        }
    }
};

const useFetch = (options = {}) => {
    const { initLoading = false, log = "" } = options;
    const [_state, _dispatch] = useReducer(reducer, {
        status: initLoading ? STATUS.LOADING : STATUS.IDLE,
        data: null,
        error: "",
    });

    const dispatch = (type, payload) => _dispatch({ type, payload });

    const dispatchFetch = async (fetchFunc) => {
        try {
            dispatch(STATUS.LOADING);
            const { ok, data, error } = await fetchFunc();
            if (ok) {
                dispatch(STATUS.SUCCESS, data);
            } else {
                dispatch(STATUS.FAIL, error);
            }
        } catch (err) {
            if (log) {
                console.log(log, err);
            }
            dispatch(STATUS.FAIL, "Unknown error");
        }
    };

    const state = [
        // data
        _state.status === STATUS.SUCCESS ? _state.data : null,
        // isLoading
        _state.status === STATUS.LOADING,
        // error
        _state.status === STATUS.FAIL ? _state.error : "",
    ];

    if (log) {
        console.log(log, {
            data: state[0],
            isLoading: state[1],
            error: state[2],
        });
    }

    return [
        // dispatch fetch func
        dispatchFetch,
        ...state,
    ];
};

export default useFetch;
