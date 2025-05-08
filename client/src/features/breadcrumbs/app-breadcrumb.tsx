import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useBreadcrumb } from "./store";
import { Link } from "react-router";

const AppBreadcrumb = () => {
  const { breadcrumbList, activePage } = useBreadcrumb();

  return (
    <Breadcrumb>
      <BreadcrumbList>
        {breadcrumbList.map((item) => (
          <>
            {item === activePage ? (
              <BreadcrumbItem key={item.itemName}>
                <BreadcrumbPage>{item.itemName}</BreadcrumbPage>
              </BreadcrumbItem>
            ) : (
              <>
                <BreadcrumbItem key={item.itemName}>
                  <Link to={item.href}>{item.itemName}</Link>
                </BreadcrumbItem>
                <BreadcrumbSeparator key={item.itemName + "separator"} />
              </>
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
