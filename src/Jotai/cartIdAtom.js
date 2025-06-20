import { atomWithStorage } from "jotai/utils";
import { CARTID_KEY } from  '../components/Constants'

export const cartIdAtom = atomWithStorage(CARTID_KEY, "");
