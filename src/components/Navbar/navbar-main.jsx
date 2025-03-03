import { Button, Navbar } from "flowbite-react";
export const NavbarMain = ({ childComponent: ChildComponent }) => {
  const token = localStorage.getItem("token");
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-800 to-gray-700">
      <Navbar fluid className="fixed w-full z-50">
        <Navbar.Brand href="/">
          <svg class="w-10 h-10" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg" fill="#000000">
            <g id="SVGRepo_bgCarrier" stroke-width="0" />

            <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round" />

            <g id="SVGRepo_iconCarrier">
              <path
                fill="#000000"
                d="M165.906 18.688C15.593 59.28-42.187 198.55 92.72 245.375h-1.095c.635.086 1.274.186 1.906.28 8.985 3.077 18.83 5.733 29.532 7.94C173.36 273.35 209.74 321.22 212.69 368c-33.514 23.096-59.47 62.844-59.47 62.844L179.5 469.53 138.28 493h81.97c-40.425-40.435-11.76-85.906 36.125-85.906 48.54 0 73.945 48.112 36.156 85.906h81.126l-40.375-23.47 26.283-38.686s-26.376-40.4-60.282-63.406c3.204-46.602 39.5-94.167 89.595-113.844 10.706-2.207 20.546-4.86 29.53-7.938.633-.095 1.273-.195 1.908-.28h-1.125c134.927-46.82 77.163-186.094-73.157-226.69-40.722 39.37 6.54 101.683 43.626 56.877 36.9 69.08 8.603 127.587-72.28 83.406-11.88 24.492-34.213 41.374-60.688 41.374-26.703 0-49.168-17.167-60.97-42-81.774 45.38-110.512-13.372-73.437-82.78 37.09 44.805 84.35-17.508 43.626-56.876zm90.79 35.92c-27.388 0-51.33 27.556-51.33 63.61 0 36.056 23.942 62.995 51.33 62.995 27.387 0 51.327-26.94 51.327-62.994 0-36.058-23.94-63.61-51.328-63.61z"
              />
            </g>
          </svg>
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Gladiator Gym</span>
        </Navbar.Brand>
        <div className="space-x-3 flex">
          <Button className="hidden md:inline-block" color={"dark"} href="/">
            Beranda
          </Button>
          {token ? (
            <Button className="hidden md:inline-block" color={"dark"} href="/dashboard">
              Dashbor
            </Button>
          ) : (
            <Button className="hidden md:inline-block" color={"dark"} href="/login">
              Login
            </Button>
          )}
          <Navbar.Toggle />
        </div>
        <Navbar.Collapse className="md:hidden">
          <Navbar.Link href="/">Home</Navbar.Link>
          {token ? <Navbar.Link href="/dashboard">Dashbor</Navbar.Link> : <Navbar.Link href="/login">Login</Navbar.Link>}
        </Navbar.Collapse>
      </Navbar>
      <div className="w-full">
        <ChildComponent />
      </div>
    </div>
  );
};
