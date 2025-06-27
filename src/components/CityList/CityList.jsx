import FormSelect from  "../FormSelect/FormSelect";
import useCityList from  "../CityList/useCityList";

const CityList = (props) => {
  const { cities } = useCityList();

  return <FormSelect {...props} options={cities} />;
};

export default CityList;
