import { Form, Relevant } from "informed";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerPortal,
  DrawerTitle,
  DrawerTrigger,
} from "../../components/ui/drawer";
import useSearchTrigger from "./useSearchTrigger";
import TextInput from "../../TextInput/TextInput";
import AutoComplete from "../SearchTrigger/AutoComplete";
import { Search, X } from "lucide-react";

const SearchTrigger = ({ children }) => {
  const {
    handleSubmit,
    formApiRef,
    handleClearSearch,
    initialValue,
    textInputRef,
    handleChange,
    status,
    toggle,
  } = useSearchTrigger();

  return (
    <Drawer
      direction="top"
      handleOnly={true}
      open={status}
      onOpenChange={toggle}
    >
      <DrawerTrigger asChild>
        <button
          aria-label="Search"
          data-widget="SearchTrigger"
          className="mobile:p-header-icons p-mob-header-icons"
        >
          {children || <Search size={22} className="stroke-current" />}
        </button>
      </DrawerTrigger>

      <DrawerPortal>
        <DrawerContent className="right-0 left-0 top-0 fixed z-50 outline-none w-full bg-white h-96 mobile:h-auto data-[vaul-drawer-direction=top]:sm:max-h-[100svh] data-[vaul-drawer-direction=top]:laptop:max-h-[75vh] data-[vaul-drawer-direction=top]:desktop:max-h-[60vh] data-[vaul-drawer-direction=top]:sm:rounded-none overflow-hidden data-[vaul-drawer-direction=top]:sm:mb-0">
          <DrawerTitle className="hidden">Search</DrawerTitle>
          <div
            data-widget="SearchTrigger"
            className="w-full h-full relative laptop:max-w-[1115px] mx-auto tablet:py-7 laptop:py-5 desktop:py-[50px]"
          >
            <DrawerClose className="mobile:hidden absolute end-0 bg-white top-5 z-10 flex items-center justify-center pe-5 w-10 h-5 rounded-full cursor-pointer">
              <X size={13} className="text-black" />
            </DrawerClose>

            <Form
              onSubmit={handleSubmit}
              onChange={handleChange}
              formApiRef={formApiRef}
              initialValues={initialValue}
            >
              <div className="relative">
                <div className="absolute start-5 tablet:start-0 top-[50%] translate-y-[-50%] w-6 h-6 flex items-center justify-center">
                  <Search size={18} />
                </div>

                <TextInput
                  id="search_input"
                  type="text"
                  name="search_input"
                  placeholder="What are you looking for?"
                  ref={textInputRef}
                  maxLength={100}
                  autoFocus
                  autoComplete="off"
                  className="mb-0 h-16"
                  inputClassName="!h-16 px-12 tablet:px-9 transition ease-in-out duration-300 focus:border-transparent focus:border-b-[#D5D5D5] border-transparent border-b-[#D5D5D5]"
                />

                <Relevant
                  when={({ formState }) => formState.values.search_input}
                >
                  <button
                    className="hidden absolute end-0 top-[50%] translate-y-[-50%] w-6 h-6 mobile:flex items-center justify-center"
                    type="button"
                    onClick={handleClearSearch}
                  >
                    <X size={13} className="text-black" />
                  </button>
                </Relevant>
              </div>

              <AutoComplete toggle={toggle} />
            </Form>
          </div>
        </DrawerContent>
      </DrawerPortal>
    </Drawer>
  );
};

export default SearchTrigger;
