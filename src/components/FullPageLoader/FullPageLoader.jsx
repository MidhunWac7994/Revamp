import Spinner from '../Spinner/Spinner';

const FullPageLoader = ({ className }) => {
  return (
    <div data-widget="FullPageLoader" className="inner-pages">
      <div
        className={`flex items-center justify-center min-h-[80vh] ${className}`}
      >
        <Spinner className="size-8 border-2 border-lw-primary border-t-transparent" />
      </div>
    </div>
  );
};

export default FullPageLoader;
