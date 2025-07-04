const PaymentReceiptShimmer = () => {
    return (
        <>
            <div
                className=" tablet:mt-[30px] bg-white py-[30px] px-5 max-mobile:-mx-5 max-mobile:border-y-[4px] max-mobile:border-[#E7E7E7] laptop:py-[35px] laptop:px-[42px] "
                data-widget="PaymentReceiptShimmer"
            >
                <h4 className="text-20 font-semibold text-black">{("Orders List")}</h4>
                <div className="animate-pulse mt-[35px] grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-x-[60px] tablet:gap-y-[30px]">
                    {[...Array(3).keys()].map((item) => (
                        <div className=" w-full flex items-start gap-[18px] laptop:gap-6 group max-tablet:mt-4 max-tablet:pt-4 max-tablet:border-t border-[#E9E9E9] first:mt-0 first:pt-0 first:border-0" key={item}>
                            <div className="flex-[0_0_60px] bg-gray-bg-1 aspect-square"></div>
                            <div>
                                <p className="w-[90%] h-5 mb-2 bg-gray-bg-1"></p>
                                <div className="flex mt-3 items-center gap-1 flex-wrap">
                                    <p className="w-10 h-5 bg-gray-bg"></p>
                                    <p className="w-[109px] h-5 bg-gray-bg"></p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <div className="tablet:mt-[30px] py-[30px] tablet:p-5 laptop:p-8 bg-white flex max-tabletPro:flex-wrap " data-widget="PaymentReceiptShimmer">
                {[...Array(2).keys()].map((item) => (
                    <div
                        key={item}
                        className="animate-pulse max-tablet:flex-[0_0_100%] group first:m-0 first:p-0 first:border-0 flex-1 max-tabletPro:mt-5 max-tabletPro:pt-5 max-tabletPro:border-t tabletPro:ps-4 tabletPro:ms-4 laptop:ps-14 laptop:ms-14 tabletPro:border-s border-[#E6E6E6]">
                        <h4 className="mb-4 w-[170px] h-[30px] bg-gray-bg"></h4>
                        <p className="w-[84px] h-6 bg-gray-bg"></p>
                        <p className="mt-[6px] w-full h-3 bg-gray-bg-1 "></p>
                        <p className="mt-1 w-3/4 h-3 bg-gray-bg-1"></p>
                        <p className="mt-4 w-2/3 h-6 bg-gray-bg-1"></p>
                        <p className="mt-1 w-3/4 h-6 bg-gray-bg-1"></p>
                    </div>
                ))}

                <div
                    className="animate-pulse max-tablet:flex-[0_0_100%] group first:m-0 first:p-0 first:border-0 flex-1 max-tabletPro:mt-5 max-tabletPro:pt-5 max-tabletPro:border-t tabletPro:ps-4 tabletPro:ms-4 laptop:ps-14 laptop:ms-14 tabletPro:border-s border-[#E6E6E6]">
                        <h4 className="mb-4 w-[170px] h-[30px] bg-gray-bg"></h4>
                        <div className="flex items-center justify-between">
                            <p className="w-[54px] h-5 bg-gray-bg-1"></p>
                            <p className="w-[124px] h-6 bg-gray-bg-1"></p>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="w-[54px] h-5 bg-gray-bg-1"></p>
                            <p className="w-[124px] h-6 bg-gray-bg-1"></p>
                        </div>
                        <div className="flex mt-2 items-center justify-between">
                            <p className="w-[54px] h-5 bg-gray-bg-1"></p>
                            <p className="w-[124px] h-6 bg-gray-bg-1"></p>
                        </div>
                        <div className="flex items-center justify-between pt-6 mt-6 border-t border-[#E9E9E9]">
                            <p className="w-[140px] h-[28px] bg-gray-bg-1"></p>
                            <p className="w-[145px] h-[27px] bg-gray-bg-1"></p>
                        </div>
                </div>

            </div>
        </>
    );
};

export default PaymentReceiptShimmer;
