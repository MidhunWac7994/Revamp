
import { Link } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList ,BreadcrumbSeparator,BreadcrumbPage} from '../../components/components/ui/breadcrumb'


const ProductBreadcrumb = ({ locale, categoryName, categoryUrlKey }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList    >
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={`/${locale}`}>Home</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink asChild>
            <Link to={`/${locale}/${categoryUrlKey}`}>{categoryName}</Link>
          </BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>Products</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default ProductBreadcrumb;
