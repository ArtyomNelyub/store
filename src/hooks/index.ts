import { RootState } from '../store';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { store } from '../store'

type AppDispatch = typeof store.dispatch;

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => AppDispatch = useDispatch;
