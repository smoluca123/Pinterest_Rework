import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function ProfileButton() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Avatar>
          <AvatarFallback>Abc</AvatarFallback>
          <AvatarImage src="https://github.com/shadcn.png" />
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="p-2" side="bottom" sideOffset={10}>
        <DropdownMenuGroup>
          <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
          <DropdownMenuItem className="flex items-center justify-center">
            <Avatar>
              <AvatarFallback>Abc</AvatarFallback>
              <AvatarImage src="https://github.com/shadcn.png" />
            </Avatar>
            <div className="">
              <h3>Full name</h3>
              <p className="text-muted-foreground">fullname@gmail.com</p>
            </div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
