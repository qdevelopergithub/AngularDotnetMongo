import { setErrorMessage, setLoadingSpinner } from './shared.action';
import { Action, createReducer, on } from '@ngrx/store';
import { initialState } from './shared.state';

const _sharedReducer = createReducer(
    initialState,
    on(setLoadingSpinner, (state, action) => {
        return {
            ...state,
            showLoading: action.status,
        };
    }),
    on(setErrorMessage, (state, action) => {
        console.log(action.message)
        return {
            ...state,
            errorMessage: action.message
        }
    })
);

export function SharedReducer(state = initialState, action: Action) {
    return _sharedReducer(state, action);
}