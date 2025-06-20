import { useEffect, useState } from "react";

const useSiteUrl = () => {
  const [siteUrl, setsSiteUrl] = useState("");

  useEffect(() => {
    setsSiteUrl(window.location?.hostname);
  }, []);

  return siteUrl;
};

export default useSiteUrl;
