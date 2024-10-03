import { createBrowserRouter } from "react-router-dom";

import Layout from "../layoutAdmin/Layout";
import Dashboard from "../pages/Admin/Dashboard";
import Callcenter from "@/pages/Admin/Callcenter";
import Facebookleads from "@/pages/Admin/Facebookleads";
import Techniciens from "@/pages/Admin/Techniciens";
import Clients from "@/pages/Admin/Clients";
import AddAcounts from "@/pages/Admin/AddAcounts";
import LogAdmin from "@/pages/Admin/LogAdmin";
import Details from "@/pages/Admin/Details";
import DetailsTech from "@/pages/Admin/DetailsTech";
import Geustlayout from "@/pages/Geustlayout";
import LayoutSysAdmin from "@/pages/SysAdmin/LayoutSysAdmin";
import Callcenter_sysadmin from "@/pages/SysAdmin/Callcenter_sysadmin";
import Techniciens_sysadmin from "@/pages/SysAdmin/Techniciens_sysadmin";
import AddAcounts_sysadmin from "@/pages/SysAdmin/AddAcounts_sysadmin";
import Clients_calls from "@/pages/Admin/Clients_calls";
import Layoutcallcenter from "@/pages/Callcenter/Layoutcallcenter";
import Calls from "@/pages/Callcenter/Calls";
import Addcalls from "@/pages/Callcenter/Addcalls";
import Editcalls from "@/pages/Callcenter/Editcalls";
import Meetings from "@/pages/Callcenter/Meetings";

export const redirecttodashboard = (roletype) => {
    switch (roletype) {
        case 'admin':
            return ('/dashboard');

        case 'sysadmin':
            return ('/sysadmin/callcenter');

        case 'callcenter':
            return ('/callcenter/calls');

    }
}
export const router = createBrowserRouter([
    {

        element: <Layout />,
        children: [
            {
                path: '/dashboard',
                element: <Dashboard />
            },
            {
                path: '/callcenter',
                element: <Callcenter />
            },
            {
                path: '/callcenter/Details',
                element: <Details />
            },
            {
                path: '/Techniciens/DetailsTech',
                element: <DetailsTech />
            },
            {
                path: '/Facebookleads',
                element: <Facebookleads />
            },
            {
                path: '/Clients_calls',
                element: <Clients_calls />
            },
            {
                path: '/Techniciens',
                element: <Techniciens />
            },
            {
                path: '/clients',
                element: <Clients />
            },
            {
                path: '/AddAcounts',
                element: <AddAcounts />
            },

        ]
    },
    {
        element: <Geustlayout />,
        children: [
            {
                path: '/login',
                element: <LogAdmin />
            },
            {
                path: '/',
                element: <LogAdmin />
            },

        ]
    },
    {
        element: <LayoutSysAdmin />,
        children: [

            {
                path: '/sysadmin/callcenter',
                element: <Callcenter_sysadmin />
            },
            {
                path: '/sysadmin/callcenter/Details',
                element: <Details />
            },
            {
                path: '/sysadmin/Techniciens/DetailsTech',
                element: <DetailsTech />
            },
            {
                path: '/sysadmin/Facebookleads',
                element: <Facebookleads />
            },
            {
                path: '/sysadmin/Clients_calls',
                element: <Clients_calls />
            },
            {
                path: '/sysadmin/Techniciens',
                element: <Techniciens_sysadmin />
            },
            {
                path: '/sysadmin/clients',
                element: <Clients />
            },
            {
                path: '/sysadmin/AddAcounts',
                element: <AddAcounts_sysadmin />
            },

        ]
    },

    {
        element: <Layoutcallcenter />,
        children: [

            {
                path: '/callcenter/calls',
                element: <Calls />
            },
            {
                path: '/callcenter/add',
                element: <Addcalls />
            },
            {
                path: '/callcenter/edit',
                element: <Editcalls />
            },

            {
                path: '/callcenter/meetings',
                element: <Meetings />
            },




        ]
    }
])
