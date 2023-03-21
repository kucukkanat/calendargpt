import { useDisclosure } from "@mantine/hooks";
import { MantineProvider, Drawer } from "@mantine/core";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  Link,
  Outlet,
} from "react-router-dom";
import { useMantineTheme, Group } from "@mantine/core";
import Calendar from "./Calendar";

function Root() {
  const {
    colors: { dark },
  } = useMantineTheme();
  const [opened, { open, close }] = useDisclosure(false);

  function openDrawer() {
    open();
  }
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS>
      <Drawer
        opened={opened}
        onClose={close}
        position="left"
        size="350px"
        title="Authentication"
      >
        {/* Drawer content */}
        This is the drawerrrr
      </Drawer>
      <Group position="left">
        <div
          style={{
            padding: 15,
            color: "#FFF",
            width: "100vw",
            backgroundColor: dark[9],
          }}
        >
          <span style={{ display: "block", height: 40 }} onClick={openDrawer}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="icon icon-tabler icon-tabler-category"
              width={40}
              height={40}
              viewBox="0 0 24 24"
              strokeWidth="2"
              stroke="currentColor"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
              <path d="M4 4h6v6h-6z"></path>
              <path d="M14 4h6v6h-6z"></path>
              <path d="M4 14h6v6h-6z"></path>
              <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            </svg>
          </span>
        </div>
      </Group>

      {/* Rest of the application */}
      <Outlet />
    </MantineProvider>
  );
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Calendar />,
      },
    ],
  },
  {
    path: "about",
    element: <div>About</div>,
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
