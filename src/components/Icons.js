import { ChevronDoubleDownIcon, FolderIcon, EllipsisVerticalIcon, ChartBarIcon, EllipsisHorizontalIcon, NewspaperIcon, ScaleIcon, 
    FunnelIcon, CreditCardIcon, Cog8ToothIcon, CurrencyPoundIcon, TruckIcon, UserCircleIcon} from '@heroicons/react/24/outline';

export const folderIcon = () => <FolderIcon className="h-6 w-6 text-yellow-300" />;
export const scaleReadingsIcon = () => <ScaleIcon className="h-6 w-6 text-yellow-300" />;
export const reportsIcon = () => <NewspaperIcon className="h-6 w-6 text-yellow-300" />;
export const screeningsIcon = () => <FunnelIcon className="h-6 w-6 text-yellow-300" />;
export const invoicesIcon   = () => <CreditCardIcon className="h-6 w-6 text-yellow-300" />;
export const configurationsIcon = () => <Cog8ToothIcon className="h-6 w-6 text-yellow-300" />
export const salesConfirmationIcon = () => <CurrencyPoundIcon className="h-6 w-6 text-yellow-300" />
export const loadingSchedulesIcon = () => <TruckIcon className="h-6 w-6 text-yellow-300" />
export const userCircleIcon = () => <UserCircleIcon className="h-7 w-7 text-black" />



const customCombinedReceivingIcon = () => (
    <svg className="h-6 w-6 text-yellow-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ChevronDoubleDownIcon className="absolute h-3 w-3" />
        <EllipsisVerticalIcon className="absolute h-3 w-3" />
    </svg>
);

const customCombinedProductionIcon = () => (
    <svg className="h-6 w-6 text-yellow-300" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <ChartBarIcon className="absolute h-3 w-3" />
        <EllipsisHorizontalIcon className="absolute h-3 w-3" />
    </svg>
)

export const customCombinedReceivingIconComponent = customCombinedReceivingIcon;
export const customCombinedProductionIconComponent = customCombinedProductionIcon;
