import { SidebarGroup, SidebarTrigger } from "@/components/ui/sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Form, Link, useSubmit } from "@remix-run/react";
import { useTranslation } from "react-i18next";
import { language } from "../../utils/language";
// import { Separator } from "@radix-ui/react-dropdown-menu";
import { ThemeColorToggle } from "../theme-color-toggle";
import { ModeToggle } from "../mode-toggle";
import { Button } from "../ui/button";

export function CommonHeader() {
  const { i18n } = useTranslation();
  const submit = useSubmit();
  const handleLanguageChange = (value: string) => {
    submit(
      { locale: value },
      { method: "post", action: "/action/set-language" }
    );
  };
  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-16 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="ml-auto flex items-center justify-between gap-2 w-full">
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarTrigger className="-ml-1" />
          {/* <Separator className="mx-2 data-[orientation=vertical]:h-4" /> */}
        </SidebarGroup>
        <Select
          onValueChange={handleLanguageChange}
          defaultValue={i18n.language}
        >
          <SelectTrigger className="w-[100px]">
            <SelectValue placeholder="Language" />
          </SelectTrigger>
          <SelectContent>
            {Object.entries(language).map(([key, value]) => (
              <SelectItem key={key} value={key}>
                {value}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <ThemeColorToggle />
        <ModeToggle />
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="cursor-pointer">
            {/* <div className="flex items-center gap-2 rounded-md border border-input px-2"> */}
            <Avatar className="h-8 w-8">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              {/* <AvatarFallback>JP</AvatarFallback> */}
            </Avatar>
            {/* <div className="text-sm font-medium">John Doe</div> */}
            {/* </div> */}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[150px]">
            {/* <DropdownMenuLabel>
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src="/logo.png" alt="@shadcn" />
                  <AvatarFallback>JP</AvatarFallback>
                </Avatar>
                <div className="grid gap-0.5">
                  <div className="text-sm font-medium">John Doe</div>
                  <div className="text-xs text-muted-foreground">
                    john@acme.inc
                  </div>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator /> */}
            <DropdownMenuItem asChild>
              <Link to="/home/profile" className="w-full cursor-pointer">
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="p-0">
              <Form method="post" action="/auth/logout" className="p-0 m-0">
                <Button
                  type="submit"
                  variant="ghost"
                  className="w-full px-2 justify-start font-normal hover:bg-red-100 dark:hover:bg-red-100/10 dark:hover:text-red-400"
                >
                  Logout
                </Button>
              </Form>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
