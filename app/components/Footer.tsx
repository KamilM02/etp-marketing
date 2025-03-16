
"use client";

import { Footer } from "flowbite-react";

export default function FooterComponent() {
  return (
    <Footer container className=" w-full bg-blue-200 rounded-lg shadow m-4 dark:bg-gray-800 md:max-w-screen-xl md:mx-auto">
      <Footer.Copyright href="#" by="MasterTicket" year={2025} />
      <Footer.LinkGroup>
        <Footer.Link href="#">About</Footer.Link>
        <Footer.Link href="#">Privacy Policy</Footer.Link>
        <Footer.Link href="#">Licensing</Footer.Link>
        <Footer.Link href="#">Contact</Footer.Link>
      </Footer.LinkGroup>
    </Footer>
  );
}

  

