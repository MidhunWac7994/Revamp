import { useSetAtom } from "jotai";
import { Dialog, DialogContent } from '../../components/components/ui/dialog'
import { SIGN_IN_INITIAL_VIEW } from '../../components/Constants';
import React from 'react'
import { useSearchParams } from "react-router-dom";
import { authViewAtom } from '../../Jotai/'
import AuthBlocks from "./AuthBlocks/AuthBlock";

const Auth = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const setAuthView = useSetAtom(authViewAtom);
  const authView = useAtomValue(authViewAtom);

  const isAuthOpen = searchParams.get("auth") === "true";

  const handleClose = () => {
    setToggleAuth(null);
    setTimeout(() => {
      setAuthView(SIGN_IN_INITIAL_VIEW);
    }, );
  };
  return (
    <Dialog open={isAuthOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-full max-mobile:h-full max-mobile:rounded-none px-5 py-6 mobile:max-w-[480px] mobile:px-6 mobile:py-6 tablet:px-10 tablet:py-10 max-tablet:overflow-y-auto max-mobile:block">
        <AuthBlocks view={authView} />
      </DialogContent>
    </Dialog>
  );
};

export default Auth;
