import marker from  '../../Map/Marker/marker.svg';
import StoreToolTip from '../Marker/StoreToolTip';

const Marker = ({ storeName, storeAddress }) => {
  return (
    <div className="relative flex items-center">
      
      <img src={marker} sizes="5vw" alt="marker" width={40} height={40} />

      
      {storeName && storeAddress && (
        <div>
          <StoreToolTip storeName={storeName} storeAddress={storeAddress} />
        </div>
      )}
    </div>
  );
};

export default Marker;
