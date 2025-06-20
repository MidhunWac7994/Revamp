import { SIGN_IN_INITIAL_VIEW } from  '../components/Constants'
import { atom } from "jotai";
import { LOGIN_TOKEN_KEY } from '../components/Constants';
import {atomWithStorage} from 'jotai/utils';
export const authViewAtom = atom(SIGN_IN_INITIAL_VIEW);

export const authTokenAtom = atomWithStorage(LOGIN_TOKEN_KEY, null);
export const authSignedInState = atom((get) => !!get(authTokenAtom));
 