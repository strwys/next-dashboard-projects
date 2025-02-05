"use client"

import React, { FC, useState } from 'react'
import { signOut, useSession } from 'next-auth/react';
import { formatUsername } from '@/lib/utils'

import { 
    BadgeCheck,
    ChevronsUpDown,
    GalleryVerticalEnd,
    LogOut, 
} from "lucide-react"

import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "@/components/ui/sidebar"

import { 
   DropdownMenu,
   DropdownMenuContent,
   DropdownMenuGroup,
   DropdownMenuItem,
   DropdownMenuLabel,
   DropdownMenuSeparator,
   DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

import { 
   Avatar,
   AvatarFallback,
   AvatarImage 
} from '@/components/ui/avatar';
import { MenuItems } from '@/constants/menu-item';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/authOptions';
import { userAgent } from 'next/server';

export const company = {
  name: 'PT. Sarana Abadi Makmur Bersama',
  logo: GalleryVerticalEnd,
  plan: 'cecep.supriadi@samb.co.id'
};

interface SidebarProps {
  
}

type Session = {
  user: {
    name: string;
    email: string;
    image: string;
  };
};

// Hardcoded session data
const session: Session = {
  user: {
    name: 'Fritz Haber',
    email: 'fritz.haber@gmail.com',
    image: 'https://via.placeholder.com/150',
  },
};

const AppSidebar: FC<SidebarProps> = ({  }) => {
  const { data: session } = useSession();
  
  console.log("1---->", session)

  const [activeTab, setActiveTab] = useState("Dashboard");

  return (
    <Sidebar>
      
      {/* Header */}

      <SidebarHeader>
        <SidebarMenu className='border border-xl rounded-sm'>
          <SidebarMenuItem>
            <DropdownMenu>
              
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton
                  size='lg'
                  className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
                >
                  <Avatar className='h-8 w-8 rounded-lg'>
                    <AvatarImage
                      src={'https://via.placeholder.com/150'}
                      alt={formatUsername(session?.user.username!!)}
                    />
                    <AvatarFallback className='rounded-lg'>
                      {session?.user.username?.slice(0, 2)?.toUpperCase() || 'CN'}
                    </AvatarFallback>
                  </Avatar>
                  <div className='grid flex-1 text-left text-sm leading-tight'>
                    <span className='truncate font-semibold'>
                      {formatUsername(session?.user.username!!)}
                    </span>
                  </div>
                  <ChevronsUpDown className='ml-auto size-4' />
                </SidebarMenuButton>
              </DropdownMenuTrigger>

              <DropdownMenuContent
                className='w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg'
                side='bottom'
                align='end'
                sideOffset={4}
              >
                
                <DropdownMenuLabel className='p-0 font-normal'>
                  <div className='flex items-center gap-2 px-1 py-1.5 text-left text-sm'>
                    <Avatar className='h-8 w-8 rounded-lg'>
                      <AvatarImage
                        src={'https://via.placeholder.com/150'}
                        alt={formatUsername(session?.user.username!!)}
                      />
                      <AvatarFallback className='rounded-lg'>
                        {session?.user.username?.slice(0, 2)?.toUpperCase() ||
                          'CN'}
                      </AvatarFallback>
                    </Avatar>
                    <div className='grid flex-1 text-left text-sm leading-tight'>
                      <span className='truncate font-semibold'>
                        {formatUsername(session?.user.username!!)}
                      </span>
                    </div>
                  </div>
                </DropdownMenuLabel>
                
                <DropdownMenuSeparator />

                <DropdownMenuGroup>
                  <DropdownMenuItem>
                    <BadgeCheck />
                    Account
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => signOut()}>
                    <LogOut />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              
              <DropdownMenuSeparator />

              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      {/* End ofHeader  */}

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Application</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {MenuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      onClick={() => setActiveTab(item.title)}
                      className={`flex items-center gap-2 px-4 py-2 rounded-md ${
                        activeTab === item.title
                          ? "bg-gray-200 text-black"
                          : "text-gray-700 hover:bg-gray-100" 
                      }`}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

    </Sidebar>
  )
}

export default AppSidebar;