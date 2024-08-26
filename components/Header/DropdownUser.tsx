import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

type Props = {
  url: string;
  name: string;
  title: string;
  isLoggedIn: boolean; // Add a prop to check if the user is logged in
};

const DropdownUser = (props: Props) => {
  const { url, name, title, isLoggedIn } = props;
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [userImage, setUserImage] = useState('');
  const [userName, setUserName] = useState('');
  const [userTitle, setUserTitle] = useState('');
  const trigger = useRef<any>(null);
  const dropdown = useRef<any>(null);

  // Close on click outside
  useEffect(() => {
    const clickHandler = ({ target }: MouseEvent) => {
      if (!dropdown.current) return;
      if (
        !dropdownOpen ||
        dropdown.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setDropdownOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // Close if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }: KeyboardEvent) => {
      if (!dropdownOpen || keyCode !== 27) return;
      setDropdownOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  useEffect(() => {
    if (url) {
      setUserImage(url);
    } else {
      setUserImage('/images/user/userD.jpg');
    }
  }, [url]);

  useEffect(() => {
    if (name) {
      setUserName(name);
    }
  }, [name]);

  useEffect(() => {
    if (title) {
      setUserTitle(title);
    }
  }, [title]);

  return (
    <div className="relative">
      <Link
        ref={trigger}
        onClick={() => setDropdownOpen(!dropdownOpen)}
        className="flex items-center gap-4"
        href="#"
      >
        {isLoggedIn && (
          <>
            <span className="hidden text-right lg:block">
              <span className="block text-sm font-medium text-black dark:text-white">
                {userName}
              </span>
              <span className="block text-xs">{userTitle}</span>
            </span>

            <span className="h-12 w-12 rounded-full">
              <Image
                className="rounded-full"
                width={112}
                height={112}
                src={userImage}
                alt="User"
              />
            </span>
          </>
        )}

        <svg
          className="hidden fill-current sm:block"
          width="12"
          height="8"
          viewBox="0 0 12 8"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1 1.5L6 6.5L11 1.5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </Link>

      {/* <!-- Dropdown Start --> */}
      <div
        ref={dropdown}
        onFocus={() => setDropdownOpen(true)}
        onBlur={() => setDropdownOpen(false)}
        className={`absolute right-0 mt-4 flex w-62.5 flex-col rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark ${
          dropdownOpen ? "block" : "hidden"
        }`}
      >
        {isLoggedIn ? (
          <>
            <ul className="flex flex-col gap-5 border-b border-stroke px-6 py-7.5 dark:border-strokedark">
              <li>
                <Link
                  href="/profile"
                  className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Profile icon SVG */}
                  </svg>
                  My Profile
                </Link>
              </li>
              <li>
                <Link
                  href="#"
                  className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Contacts icon SVG */}
                  </svg>
                  My Contacts
                </Link>
              </li>
              <li>
                <Link
                  href="/pages/settings"
                  className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
                >
                  <svg
                    className="fill-current"
                    width="22"
                    height="22"
                    viewBox="0 0 22 22"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    {/* Settings icon SVG */}
                  </svg>
                  Account Settings
                </Link>
              </li>
            </ul>
            <button className="flex items-center gap-3.5 px-6 py-4 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base">
              <svg
                className="fill-current"
                width="22"
                height="22"
                viewBox="0 0 22 22"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Logout icon SVG */}
              </svg>
              Log Out
            </button>
          </>
        ) : (
          <ul className="flex flex-col gap-5 px-6 py-7.5">
            <li>
              <Link
                href="/sign-up"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Sign Up icon SVG */}
                </svg>
                Sign Up
              </Link>
            </li>
            <li>
              <Link
                href="/login"
                className="flex items-center gap-3.5 text-sm font-medium duration-300 ease-in-out hover:text-primary lg:text-base"
              >
                <svg
                  className="fill-current"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Login icon SVG */}
                </svg>
                Login
              </Link>
            </li>
          </ul>
        )}
      </div>
      {/* <!-- Dropdown End --> */}
    </div>
  );
};

export default DropdownUser;
