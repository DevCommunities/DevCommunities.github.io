"use client"
import { Navbar } from "flowbite-react";
import Image from 'next/image';

type available_page = "หน้าหลัก" | "โครงงาน" | "เกี่ยวกับเรา";
type available_nav = "/navbars";

interface NavbarProps {
    current_page: available_page;
}

interface NavbarLinkProps {
    name: available_page;
    nav: available_nav;
}

export default function DeafaultNavbar(props: NavbarProps) {
    const pages:NavbarLinkProps[] = [
        {
            name: "หน้าหลัก",
            nav: "/navbars",
        },
        {
            name: "โครงงาน",
            nav: "/navbars",
        },
        {
            name: "เกี่ยวกับเรา",
            nav: "/navbars",
        }
    ];
    return (
        <Navbar
            fluid={true}
            rounded={true}
            className="font-kanit bg-white"
        >
            <Navbar.Brand href="https://flowbite.com/">
                <Image src={'/devcommu.png'} width={120} height={120} alt="DevCommu" />
            </Navbar.Brand>
            <Navbar.Toggle />
            <Navbar.Collapse>
                {/* <Navbar.Link href="/navbars" active={true} className="text-lg">
                    หน้าหลัก
                </Navbar.Link>
                <Navbar.Link href="/navbars" className="text-lg">
                    โครงงาน
                </Navbar.Link>
                <Navbar.Link href="/navbars" className="text-lg">
                    เกี่ยวกับเรา
                </Navbar.Link> */}
                {
                    pages.map((page, index) => {
                        return (
                            <Navbar.Link key={index} href={page.nav} active={props.current_page === page.name} className="text-lg">
                                {page.name}
                            </Navbar.Link>
                        )
                    })
                }
            </Navbar.Collapse>
        </Navbar>

    );
}
