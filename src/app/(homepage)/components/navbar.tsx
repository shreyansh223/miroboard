import { Button } from '@/components/ui/button';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from '@/components/ui/navigation-menu';
import { SignInButton, SignUpButton, useSignIn } from '@clerk/nextjs';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

type Props = {};

const NavBar = (props: Props) => {
  const { signIn } = useSignIn();
  return (
    <div className="flex w-full h-20  justify-around gap-20 border-b border-gray-300">
      <div className="flex items-center justify-between gap-5">
        <Image src={'/logo.svg'} alt="logo" width={80} height={80} />
        <span className=" flex items-center text-2xl">miro</span>
        <div>
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>What is Miro</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2  gap-5  md:w-[400px] lg:w-[1000px] text-xs mr-4">
                    <div className="flex flex-col w-full mx-8 my-10  gap-4 border-r-2">
                      <div className="text-gray-500 ">Products</div>
                      <div className="grid  grid-cols-2 gap-4 pr-4">
                        <div className="">Product Overview</div>
                        <div>Workshops & Async Collaboration</div>
                        <div>Visual Project Management</div>
                        <div>Artificial Intelligence</div>
                        <div>Diagramming & process Mapping</div>
                        <div>Apps & Integrations</div>
                        <div>Product Development Workflow</div>
                        <div>Developer Platform</div>
                        <div>Content & Data Visualization</div>
                      </div>
                    </div>
                    <div className="flex flex-col w-full mx-8 my-10  gap-4 px-4 ">
                      <div className="text-gray-500 ">What `&apos` s New</div>
                      <div className="grid  grid-cols-1 gap-4 ">
                        <div className="flex gap-2 items-center">
                          <Image
                            src={
                              'https://images.ctfassets.net/w6r2i5d8q73s/38KcDg5CQvCoEnuQWLCpQn/981ab08660edfd0e55f612748efddf0a/Screenshot_2024-06-06_at_11.52.09.png?fm=webp&q=75'
                            }
                            alt="img "
                            width={40}
                            height={40}
                            className=" border rounded-sm border-gray-400"
                          />
                          <div>
                            Catch this summer`&apos`s biggest update on July 17
                          </div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Image
                            src={
                              'https://images.ctfassets.net/w6r2i5d8q73s/75GGM6ibPJvaal5dyaZ6wY/a2d2cb8b75a8fbdfbffaa174692f954c/XS1_3_4_columns_canvas_features_and_widgets_timer_001?fm=webp&q=75'
                            }
                            alt="img "
                            width={40}
                            height={40}
                            className=" w-[40px] h-[40px] border rounded-sm border-gray-400 object-fill"
                          />
                          <div>Start Timer or Private mode with one click</div>
                        </div>
                        <div className="flex gap-2 items-center">
                          <Image
                            src={
                              'https://images.ctfassets.net/w6r2i5d8q73s/2YRWiwcNUH7Z7fEZ6D0uen/c81b66f6bca0505bb70093b70a227c3b/collaboration.svg'
                            }
                            alt="img "
                            width={40}
                            height={40}
                            className=" border rounded-sm border-gray-400 "
                          />
                          <div>
                            Spotlight dependencies using Dependencies shortcut
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger>Solutions</NavigationMenuTrigger>
                <NavigationMenuContent>
                  {/* <div className="grid grid-cols-3  gap-5  md:w-[400px] lg:w-[1000px] text-xs mr-4">
                    <div className="col-span-1flex flex-col w-full mx-8 my-10  gap-4 border-r-2 row-span-1">
                      <div className="text-gray-500 ">By Team</div>
                      <div className="grid  grid-cols-1 gap-4 pr-4">
                        <div>Product Management</div>
                        <div>Engineering</div>
                        <div>IT Teams</div>
                        <div>UX & Design</div>
                        <div>Consultants& Agencies</div>
                        <div>Marketing</div>
                        <div>Sales</div>
                      </div>
                    </div>
                    <div className=" flex flex-col w-full mx-8 my-10 row-span-2 gap-4 border-r-2 col-span-2">
                      <div className="text-gray-500 ">By Use Case</div>
                      <div className="grid  grid-cols-2 gap-4 pr-4">
                        <div>Product Management</div>
                        <div>Engineering</div>
                        <div>IT Teams</div>
                        <div>UX & Design</div>
                        <div>Consultants& Agencies</div>
                        <div>Marketing</div>
                        <div>Sales</div>
                      </div>
                    </div>
                  </div> */}
                  <div className="grid grid-cols-3  gap-5  md:w-[400px] lg:w-[800px] text-xs mr-4">
                    <div className="col-span-1 flex flex-col w-full mx-8 my-10  gap-4 border-r-2">
                      <div className="text-gray-500 ">By Team</div>
                      <div className="grid  grid-cols-1 gap-4 pr-4">
                        <div>Product Management</div>
                        <div>Engineering</div>
                        <div>IT Teams</div>
                        <div>UX & Design</div>
                        <div>Consultants& Agencies</div>
                        <div>Marketing</div>
                        <div>Sales</div>
                      </div>
                    </div>
                    <div className="col-span-2 flex flex-col w-full mx-8 my-10  gap-4 border-r-2">
                      <div className="text-gray-500 ">By Use Case</div>
                      <div className="grid  grid-cols-2 gap-4 ">
                        <div className="">Technical Diagramming</div>
                        <div>Whiteboarding</div>
                        <div>Wireframing</div>
                        <div>Mind Map</div>
                        <div>Retrospectives</div>
                        <div>Scaled Product Planning</div>
                        <div>Process Mapping</div>
                        <div>Customer Journey Mapping</div>
                        <div>Strategy & Planning</div>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Resources</NavigationMenuTrigger>
                <NavigationMenuContent>Hello</NavigationMenuContent>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Enterprise</NavigationMenuTrigger>
                <NavigationMenuContent>Hello</NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="flex  gap-5 items-center">
        <span>Contact Sales</span>
        <SignInButton>
          <Button>Login</Button>
        </SignInButton>
        <SignUpButton>
          <Button>Sign Up for free</Button>
        </SignUpButton>
      </div>
    </div>
  );
};

export default NavBar;
