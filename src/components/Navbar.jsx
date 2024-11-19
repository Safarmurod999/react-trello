import { Disclosure, DisclosureButton, DisclosurePanel, Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { Bars3Icon, BellIcon, XMarkIcon } from '@heroicons/react/24/outline'
import React from 'react'
import { useLocation } from 'react-router-dom'
function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}
const user = {
    name: 'Tom Cook',
    email: 'tom@example.com',
    imageUrl:
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
}
const navigation = [
    { name: 'Workspaces', href: '#' },
    { name: 'Recent', href: '#' },
    { name: 'Starred', href: '#' },
    { name: 'Templeates', href: '#' },
    { name: 'Create', href: '#' },
]
const userNavigation = [
    { name: 'Your Profile', href: '#' },
    { name: 'Settings', href: '#' },
    { name: 'Sign out', href: '#' },
]
const Navbar = () => {
    const { pathname } = useLocation();
    return (
        <Disclosure as="nav" className="bg-nav-bg">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex h-12 items-center justify-between">
                    <div className="flex items-center">
                        <div className="shrink-0">
                            <img
                                alt="Your Company"
                                src="https://trello.com/assets/d947df93bc055849898e.gif"
                                className="w-[80px] fill-text-color "
                            />
                        </div>
                        <div className="hidden md:block">
                            <div className="ml-2 flex items-stretch space-x-4">
                                {navigation.map((item) => {
                                    if (item.name != "Create") {
                                        return (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className={classNames(
                                                    item.href == pathname ? 'bg-gray-900' : 'text-gray-300 hover:bg-gray-700',
                                                    'rounded px-3 py-1 flex items-center justify-center space-x-2',
                                                )}
                                            >
                                                <span className='text-text-color text-sm font-medium gap-[5px]'>{item.name}</span>
                                                <svg className='size-[15px]' xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                                                </svg>
                                            </a>
                                        )
                                    } else {
                                        return (
                                            <a
                                                key={item.name}
                                                href={item.href}
                                                className='bg-blue-color text-dark-bg px-3 py-1 rounded hover:opacity-[0.8]'
                                            >
                                                {item.name}
                                            </a>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    </div>
                    <div className=" border border-text-color flex items-center justify-start space-x-1 rounded p-1">
                        <svg className='fill-text-color size-[15px]' width="24" height="24" viewBox="0 0 24 24" role="presentation">
                            <path fill="fill-text-color" fillRule="evenodd" d="m16.436 15.085 3.94 4.01a1 1 0 0 1-1.425 1.402l-3.938-4.006a7.5 7.5 0 1 1 1.423-1.406M10.5 16a5.5 5.5 0 1 0 0-11 5.5 5.5 0 0 0 0 11"></path>
                        </svg>

                        <input
                            type="text"
                            placeholder='Search...'
                            className="flex-grow bg-nav-bg text-text-color  text-sm"
                        />
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        {/* Mobile menu button */}
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md bg-gray-800 p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Open main menu</span>
                            <Bars3Icon aria-hidden="true" className="block size-6 group-data-[open]:hidden" />
                            <XMarkIcon aria-hidden="true" className="hidden size-6 group-data-[open]:block" />
                        </DisclosureButton>
                    </div>
                </div>
            </div>

            <DisclosurePanel className="md:hidden">
                <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">
                    {navigation.map((item) => (
                        <DisclosureButton
                            key={item.name}
                            as="a"
                            href={item.href}
                            aria-current={item.current ? 'page' : undefined}
                            className={classNames(
                                item.current ? 'bg-gray-900 text-white' : 'text-gray-300 hover:bg-gray-700 hover:text-white',
                                'block rounded-md px-3 py-2 text-base font-medium',
                            )}
                        >
                            {item.name}
                        </DisclosureButton>
                    ))}
                </div>
                <div className="border-t border-gray-700 pb-3 pt-4">
                    <div className="flex items-center px-5">
                        <div className="shrink-0">
                            <img alt="" src={user.imageUrl} className="size-10 rounded-full" />
                        </div>
                        <div className="ml-3">
                            <div className="text-base/5 font-medium text-white">{user.name}</div>
                            <div className="text-sm font-medium text-gray-400">{user.email}</div>
                        </div>
                        <button
                            type="button"
                            className="relative ml-auto shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                        >
                            <span className="absolute -inset-1.5" />
                            <span className="sr-only">View notifications</span>
                            <BellIcon aria-hidden="true" className="size-6" />
                        </button>
                    </div>
                    <div className="mt-3 space-y-1 px-2">
                        {userNavigation.map((item) => (
                            <DisclosureButton
                                key={item.name}
                                as="a"
                                href={item.href}
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
                            >
                                {item.name}
                            </DisclosureButton>
                        ))}
                    </div>
                </div>
            </DisclosurePanel>
        </Disclosure>
    )
}

export default Navbar