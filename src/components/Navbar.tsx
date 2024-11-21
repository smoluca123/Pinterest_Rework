import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { Bell, Home, PlusSquare } from 'lucide-react';
import { Link } from 'react-router-dom';

const navList = [
  {
    label: 'Trang chủ',
    to: '/',
    Icon: Home,
  },
  {
    label: 'Tạo',
    to: '/',
    Icon: PlusSquare,
  },
  {
    label: 'Thông báo',
    to: '/',
    Icon: Bell,
  },
];

export default function Navbar() {
  return (
    <div className="md:space-y-6 flex justify-center items-center md:block">
      {navList.map(({ label, to, Icon }) => (
        <Link to={to} key={Math.random()} className="block ">
          <TooltipProvider>
            <Tooltip delayDuration={200}>
              <TooltipTrigger className="p-2">
                <Icon />
              </TooltipTrigger>
              <TooltipContent side="right">
                <p>{label}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Link>
      ))}
    </div>
  );
}
