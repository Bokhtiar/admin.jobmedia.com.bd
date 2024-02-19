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
import { DistrictEdit } from "../pages/district/edit"
import { UpazilatList } from "../pages/upazila"
import { UpazilaCreate } from "../pages/upazila/create"
import { UpazilaEdit } from "../pages/upazila/edit"
import { DegreeList } from "../pages/degree"
import { DegreeCreate } from "../pages/degree/create"
import { DegreeEdit } from "../pages/degree/edit"
import { InstituteList } from "../pages/institute"
import { InstituteCreate } from "../pages/institute/create"
import { InstituteEdit } from "../pages/institute/edit"
import { SubjectList } from "../pages/subject"
import { SubjectCreate } from "../pages/subject/create"
import { SujbectEdit } from "../pages/subject/edit"
import { ProfessionEdit } from "../pages/profession/edit"
import { Professionreate } from "../pages/profession/create"
import { ProfessionList } from "../pages/profession"
import { CvRequestList } from "../pages/cv-request"
import { CvRequestShow } from "../pages/cv-request/show"
import { JobList } from "../pages/job"
import { EducationBoardList } from "../pages/education-board"
import { EducationBoardCreate } from "../pages/education-board/create"
import { EducationBoardEdit } from "../pages/education-board/edit"

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
            { path: "district/edit/:id", element: <DistrictEdit /> },

            /** upazila */
            { path: "upazila", element: <UpazilatList /> },
            { path: "upazila/create", element: <UpazilaCreate /> },
            { path: "upazila/edit/:id", element: <UpazilaEdit /> },

            /** education-board */
            { path: "education-board", element: <EducationBoardList /> },
            { path: "education-board/create", element: <EducationBoardCreate /> },
            { path: "education-board/edit/:id", element: <EducationBoardEdit /> },

            /** degree */
            { path: "degree", element: <DegreeList /> },
            { path: "degree/create", element: <DegreeCreate /> },
            { path: "degree/edit/:id", element: <DegreeEdit /> },

            /** insistitute */
            { path: "institute", element: <InstituteList /> },
            { path: "institute/create", element: <InstituteCreate /> },
            { path: "institute/edit/:id", element: <InstituteEdit /> },

            /** subject */
            { path: "subject", element: <SubjectList /> },
            { path: "subject/create", element: <SubjectCreate /> },
            { path: "subject/edit/:id", element: <SujbectEdit /> },

            /** profession */
            { path: "profession", element: <ProfessionList /> },
            { path: "profession/create", element: <Professionreate /> },
            { path: "profession/edit/:id", element: <ProfessionEdit /> },

            /** cv request */
            { path: "cv-request", element: <CvRequestList /> },
            { path: "cv-request/show/:id", element: <CvRequestShow /> },

            /** job */
            { path: "job", element: <JobList /> },

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