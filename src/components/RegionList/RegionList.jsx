import FormSelect from '../FormSelect/FormSelect';
import useRegionList from "./useRegionList";

const RegionList = (props) => {
  const { regions } = useRegionList();

  return <FormSelect {...props} options={regions} />;
};

export default RegionList;
