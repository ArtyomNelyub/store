import { RootState } from '../app-store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from '../app-store'

type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
