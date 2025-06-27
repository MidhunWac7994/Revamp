import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";
import { SIGN_IN_INITIAL_VIEW, LOGIN_TOKEN_KEY } from "../components/Constants";

export const authViewAtom = atom(SIGN_IN_INITIAL_VIEW);

// Initialize authTokenAtom with localStorage value
export const authTokenAtom = atomWithStorage(
  LOGIN_TOKEN_KEY,
  localStorage.getItem(LOGIN_TOKEN_KEY) || null
);

export const authSignedInState = atom((get) => !!get(authTokenAtom));
