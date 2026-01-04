export const getPageTitle = (page: string) => {
  if (page === "admin") {
    return {
      title: "Dashboard Overview",
      subTitle:
        "Track key restaurant metrics, performance, and quick insights at a glance",
    };
  }

  if (page === "orders") {
    return {
      title: "Order Management",
      subTitle:
        "Monitor all orders, update statuses, and ensure timely service for every customer",
    };
  }

  if (page === "employees") {
    return {
      title: "Employee Management",
      subTitle:
        "Manage your staff efficiently: add new employees, update details, and track roles and performance",
    };
  }

  if (page === "customers") {
    return {
      title: "Customer Management",
      subTitle:
        "Keep track of your customers, view order history, and maintain accurate contact details",
    };
  }

  if (page === "categories") {
    return {
      title: "Category Management",
      subTitle:
        "Organize your menu categories, update their details, and keep your restaurant structure clean",
    };
  }

  if (page === "menu-items") {
    return {
      title: "Menu Items",
      subTitle:
        "Manage all food and drink items, update pricing, categories, and availability",
    };
  }

  if (page === "profile") {
    return {
      title: "My Profile",
      subTitle:
        "View and manage your personal details, role, and account information",
    };
  }

  if (page === "tables") {
    return {
      title: "Table Overview",
      subTitle:
        "View table assignments, monitor orders, and track waiter allocations",
    };
  }
  if (page === "analytics") {
    return {
      title: "Analytics & Insights",
      subTitle:
        "Visualize sales trends, customer behavior, and restaurant performance over time",
    };
  }

  return {
    title: "",
    subTitle: "",
  };
};
