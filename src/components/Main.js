import React, { useState, useEffect, useContext } from 'react';
import { useLocation } from "react-router-dom";
import logo from './images/Logo.png';
import IconLink from "./IconLinks";
import { UserContext } from "./UseContext";
import { 
  folderIcon, 
  customCombinedReceivingIconComponent, 
  customCombinedProductionIconComponent, 
  scaleReadingsIcon, 
  reportsIcon, 
  screeningsIcon, 
  invoicesIcon, 
  configurationsIcon, 
  salesConfirmationIcon,
  loadingSchedulesIcon,
  userCircleIcon 
} from './Icons';

const routeNameMap = {
  "/contracts" : "Contracts",
  "/securedcontracts" : "Secured Contracts",
  "/contractmanagement" : "Contract Management",
  "/maizereceived" : "Maize Received",
  "/gritmill": "Grit Mill",
  "/maizemealmill": "Maize Meal Mill",
  "/containermill": "Container Mill",
  "/sampmill": "Samp Mill",
  "/scalereadings": "Scale Readings",
  "/siloreport": "Silo Report",
  "/outputreport": "Output Report",
  "/monthtomonthcomparisonreport": "Month-to-Month Comparison Report",
  "/screenings": "Screenings",
  "/invoices": "Invoices",
  "/salesconfirmation": "Sales Confirmations",
  "/loadingscheduleapprovals": "Loading Schedule Approvals",
  "/bookedloadschedules": "Booked Load Schedules",
  "/configurations": "Configurations",
  "/usermanagement": "Users",
  "/userroles": "Roles",
  "/systemconfig": "System Configuration",
};

const Main = ({ children }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedPage, setSelectedPage] = useState('');
  const location = useLocation();
  const { user, loading } = useContext(UserContext);

  // useEffect(() => {
  //   axiosInstance.get('/api/users/me', { withCredentials: true })
  //     .then((response) => {
  //       console.log('User data:', response.data);
  //       if (response.data) {
  //         setUserName(response.data.userName);
  //         setUserSurname(response.data.userSurname);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error('Error fetching user data:', error);
  //     })
  //     .finally(() => {
  //       setLoading(false); 
  //     }); 
  // }, []);
  

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formattedTime = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: true });

  useEffect(() => {
    const path = location.pathname;
    setSelectedPage(routeNameMap[path] || 'Main');
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-400 via-gray-100 to-gray-400 flex">
      {/* Left Pane */}
      <div className="w-2/12 bg-gray-800 text-gray-200 py-4 flex flex-col items-center justify-start">
        <img src={logo} alt="Company Logo" className="w-36 h-32 mb-10" />
        <div className="space-y-2">
          {/* Icon Links */}
          <IconLink 
            to="/contracts"
            icon={ folderIcon() }
            label="Contracts"
            subMenu={[
              { to: '/securedcontracts', label: 'Secured Contracts' },
              { to: '/contractmanagement', label: 'Contract Management' }
            ]}
            setSelectedPage={setSelectedPage}
          />
          <IconLink 
            to="/maizereceived"
            icon={ customCombinedReceivingIconComponent() }
            label="Maize Received"
            setSelectedPage={setSelectedPage}
          />
          <IconLink 
            to="/productionmills"
            icon={ customCombinedProductionIconComponent() }
            label="Production Mills"
            subMenu={[
              { to: '/gritmill', label: 'Grit Mill' },
              { to: '/maizemealmill', label: 'Maize Meal Mill' },
              { to: '/containermill', label: 'Container Mill' },
              { to: '/sampmill', label: 'Samp Mill' }
            ]}
            setSelectedPage={setSelectedPage}
          />
          <IconLink 
            to="/scalereadings"
            icon={ scaleReadingsIcon() }
            label="Scale Readings"
            setSelectedPage={setSelectedPage}
          />
          <IconLink 
            to="/reports"
            icon={ reportsIcon() }
            label="Reports"
            subMenu={[
              { to: '/siloreport', label: 'Silo Report' },
              { to: '/outputreport', label: 'Output Report' },
              { to: '/monthtomonthcomparisonreport', label: 'Month-to-Month Comparison Report' }
            ]}
            setSelectedPage={setSelectedPage}
          />
          <IconLink 
            to="/screenings"
            icon={ screeningsIcon() }
            label="Screenings"
            setSelectedPage={setSelectedPage}
          />
          <IconLink 
            to="/invoices" 
            icon={ invoicesIcon() }
            label="Invoices"
            setSelectedPage={setSelectedPage}
          />
          <IconLink 
            to="/salesconfirmation" 
            icon={ salesConfirmationIcon() }
            label="Sales Confirmations"
            setSelectedPage={setSelectedPage}
          />
          <IconLink 
            to="/loadingschedules"
            icon={ loadingSchedulesIcon() }
            label="Loading Schedules"
            subMenu={[
              { to: '/loadingscheduleapprovals', label: 'Loading Schedule Approvals' },
              { to: '/bookedloadschedules', label: 'Booked Load Schedules' }
            ]}
            setSelectedPage={setSelectedPage}
          />
          <IconLink 
            to="/configurations" 
            icon={ configurationsIcon() }
            label="Configurations"
            subMenu={[
              { to: '/usermanagement', label: 'Users' },
              { to: '/userroles', label: 'Roles' },
              { to: '/systemconfig', label: 'System Configuration' }
            ]}
            setSelectedPage={setSelectedPage}
          />
        </div>
      </div>
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col">
        {/* Top Bar */}
        <div className="bg-green-400 text-gray-800 px-3 flex justify-between items-center">
          <div>
            <span className="mr-2">Time:</span>
            <span className="text-sm text-gray-700">{formattedTime}</span>
          </div>
          <div className="flex items-center m-1">
            <IconLink icon={ userCircleIcon() } />
            { loading ? 'Loading...' : (
              <>
                {user ? `${user.userName} ${user.userSurname}` : 'Guest'}
              </>
            )}
          </div>
        </div>
        
        {/* Main Display */}
        <div className="flex-1 p-4"> 
          <div className="flex justify-end">
            <span>Gritsly {'>'} {selectedPage}</span>
          </div>
          <hr className="border-t-stone-950 mb-2 mt-2" /> 
          {children}
        </div>

        {/* Footer area */}
        <div className="py-2 text-gray-700 text-center mt-auto">
          <hr className="border-t-1 border-gray-400 mb-1" />
          <span className="text-gray-600 px-3">Gritsly - Version 1.0.0</span>
        </div>
      </div>
    </div>
  );
};

export default Main;
