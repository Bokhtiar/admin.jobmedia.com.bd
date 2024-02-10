import { getToken } from "../utils/helper"
import { Product } from "../pages/product"
import { Navigate } from "react-router-dom"
import { Dashboard } from '../components/dashboard'
import { ProductEdit } from "../pages/product/edit"
import { CategoryEdit } from "../pages/category/edit"
import { CategoryList } from '../pages/category/index'
import { ProductCreate } from "../pages/product/create"
import { CategoryCreate } from "../pages/category/create"
import { DashboardLayout } from "../layouts/dashboard.layout"
import { SkillList } from "../pages/skill"
import { SkillCreate } from "../pages/skill/create"
import { SkillEdit } from "../pages/skill/edit"
import { DivisionList } from "../pages/division"
import { DivisionCreate } from "../pages/division/create"
import { DivisionEdit } from "../pages/division/edit"
import { DistrictList } from "../pages/district"
import { DistrictCreate } from "../pages/district/create"

const appRoutes = [
    {
        path: "dashboard",
        element: <DashboardLayout />,
        children: [
            { path: "*", element: <Navigate to="/404" /> },
            { path: "", element: <Dashboard /> },
            
            /** category */
            { path: "category", element: <CategoryList /> },
            { path: "category/create", element: <CategoryCreate /> },
            { path: "category/edit/:id", element: <CategoryEdit /> },

            /** skill */
            { path: "skill", element:  <SkillList /> },
            { path: "skill/create", element: <SkillCreate/> },
            { path: "skill/edit/:id", element: <SkillEdit /> },

            /** diviision */
            { path: "division", element: <DivisionList /> },
            { path: "division/create", element: <DivisionCreate /> },
            { path: "division/edit/:id", element: <DivisionEdit /> },

            /** diviision */
            { path: "district", element: <DistrictList /> },
            { path: "district/create", element: <DistrictCreate /> },
            { path: "division/edit/:id", element: <DivisionEdit /> },
        ],
    },
]; 

/* Generate permitted routes */
export const permittedRoutes = () => {
    const token = getToken();
    if (token) {
        return appRoutes;
    }

    return [];
};