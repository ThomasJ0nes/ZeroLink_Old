"use client";

import React, { useState } from "react";
import { ManageSubscriptions } from "./sections/ManageSubscriptions";
import {
  BarChart,
  Bell,
  ChevronDown,
  Clock,
  CreditCard,
  Edit,
  Home,
  LogOut,
  Menu,
  Plus,
  Settings,
  User,
  Wallet,
} from "lucide-react";
import { Button } from "~~/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~~/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~~/components/ui/dropdown-menu";
import { Input } from "~~/components/ui/input";
import { Label } from "~~/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~~/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "~~/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~~/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "~~/components/ui/tooltip";

export default function Component() {
  const [activeChain, setActiveChain] = useState("Sepolia");
  const [showNotifications, setShowNotifications] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  const renderContent = () => {
    switch (activePage) {
      case "dashboard":
        return (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="col-span-2">
                <CardHeader>
                  <CardTitle>Overview</CardTitle>
                  <CardDescription>Summary of your active subscriptions</CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Service Provider</TableHead>
                        <TableHead>Amount</TableHead>
                        <TableHead>Next Payment</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <TableRow>
                        <TableCell>Netflix</TableCell>
                        <TableCell>$14.99</TableCell>
                        <TableCell>2023-07-15</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Active
                          </span>
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>Spotify</TableCell>
                        <TableCell>$9.99</TableCell>
                        <TableCell>2023-07-20</TableCell>
                        <TableCell>
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            Pending
                          </span>
                        </TableCell>
                      </TableRow>
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notifications</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-4">
                    <li className="flex items-center space-x-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-blue-500"></span>
                      <span>Upcoming payment for Netflix on 2023-07-15</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <span className="flex-shrink-0 w-2 h-2 rounded-full bg-green-500"></span>
                      <span>Successful payment for Spotify on 2023-06-20</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </div>

            <div className="mt-8">
              <Tabs defaultValue="subscriptions">
                <TabsList>
                  <TabsTrigger value="subscriptions">Subscriptions</TabsTrigger>
                  <TabsTrigger value="payments">Payments</TabsTrigger>
                  <TabsTrigger value="history">Transaction History</TabsTrigger>
                </TabsList>
                <TabsContent value="subscriptions">
                  <Card>
                    <CardHeader>
                      <CardTitle>Manage Subscriptions</CardTitle>
                      <CardDescription>Create, edit, or cancel your subscriptions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <form>
                        <div className="grid w-full items-center gap-4">
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="provider">Service Provider</Label>
                            <Input id="provider" placeholder="Enter service provider" />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="amount">Amount</Label>
                            <Input id="amount" placeholder="Enter amount" type="number" />
                          </div>
                          <div className="flex flex-col space-y-1.5">
                            <Label htmlFor="interval">Payment Interval</Label>
                            <Select>
                              <SelectTrigger id="interval">
                                <SelectValue placeholder="Select interval" />
                              </SelectTrigger>
                              <SelectContent position="popper">
                                <SelectItem value="monthly">Monthly</SelectItem>
                                <SelectItem value="quarterly">Quarterly</SelectItem>
                                <SelectItem value="yearly">Yearly</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </form>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline">Cancel</Button>
                      <Button>Save</Button>
                    </CardFooter>
                  </Card>
                </TabsContent>
                <TabsContent value="payments">
                  <Card>
                    <CardHeader>
                      <CardTitle>Payment Processing</CardTitle>
                      <CardDescription>Manage and process your payments</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex items-center justify-between">
                          <span>Netflix Subscription</span>
                          <Button>
                            <CreditCard className="mr-2 h-4 w-4" />
                            Pay Now
                          </Button>
                        </div>
                        <div className="flex items-center justify-between">
                          <span>Spotify Subscription</span>
                          <Button variant="outline">
                            <CreditCard className="mr-2 h-4 w-4" />
                            Scheduled
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                <TabsContent value="history">
                  <Card>
                    <CardHeader>
                      <CardTitle>Transaction History</CardTitle>
                      <CardDescription>View your past transactions</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Service</TableHead>
                            <TableHead>Amount</TableHead>
                            <TableHead>Status</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow>
                            <TableCell>2023-06-15</TableCell>
                            <TableCell>Netflix</TableCell>
                            <TableCell>$14.99</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Completed
                              </span>
                            </TableCell>
                          </TableRow>
                          <TableRow>
                            <TableCell>2023-06-20</TableCell>
                            <TableCell>Spotify</TableCell>
                            <TableCell>$9.99</TableCell>
                            <TableCell>
                              <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                                Completed
                              </span>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </>
        );
      case "subscriptions":
        return <ManageSubscriptions />;
      case "wallet":
        return (
          <Card>
            <CardHeader>
              <CardTitle>Wallet</CardTitle>
              <CardDescription>Manage your wallet and balances</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span>Sepolia ETH Balance:</span>
                  <span className="font-bold">2.5 ETH</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Optimism ETH Balance:</span>
                  <span className="font-bold">1.8 ETH</span>
                </div>
                <Button className="w-full">
                  <Plus className="mr-2 h-4 w-4" /> Add Funds
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      default:
        return null;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex h-screen bg-gray-100">
        {/* Icon Sidebar */}
        <aside className={`bg-white shadow-md transition-all duration-300 ease-in-out`}>
          <div className="flex flex-col h-full">
            <div className="p-4"></div>
            <nav className="flex-1 px-2 py-4 space-y-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activePage === "dashboard" ? "secondary" : "ghost"}
                    size="icon"
                    className="w-full"
                    onClick={() => setActivePage("dashboard")}
                  >
                    <Home className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Dashboard</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activePage === "subscriptions" ? "secondary" : "ghost"}
                    size="icon"
                    className="w-full"
                    onClick={() => setActivePage("subscriptions")}
                  >
                    <Clock className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Subscriptions</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant={activePage === "wallet" ? "secondary" : "ghost"}
                    size="icon"
                    className="w-full"
                    onClick={() => setActivePage("wallet")}
                  >
                    <Wallet className="h-5 w-5" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right">
                  <p>Wallet</p>
                </TooltipContent>
              </Tooltip>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <header className=" shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900">ZeroLink Dashboard</h1>
              <div className="flex items-center space-x-4">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline">
                      {activeChain}
                      <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem onSelect={() => setActiveChain("Sepolia")}>Sepolia</DropdownMenuItem>
                    <DropdownMenuItem onSelect={() => setActiveChain("Optimism")}>Optimism</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button variant="ghost" size="icon" onClick={() => setShowNotifications(!showNotifications)}>
                      <Bell className="h-5 w-5" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Notifications</p>
                  </TooltipContent>
                </Tooltip>
                <DropdownMenu>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <User className="h-5 w-5" />
                        </Button>
                      </DropdownMenuTrigger>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>User Menu</p>
                    </TooltipContent>
                  </Tooltip>
                  <DropdownMenuContent>
                    <DropdownMenuLabel>My Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <User className="mr-2 h-4 w-4" />
                      Profile
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>

          <main className="flex-1 overflow-x-hidden overflow-y-auto ">
            <div className="container mx-auto px-2 py-8">{renderContent()}</div>
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}
