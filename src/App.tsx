import { useDisclosure } from "@mantine/hooks";
import { MantineProvider, Drawer, TextInput } from "@mantine/core";
import "./App.css";
import {
  RouterProvider,
  createBrowserRouter,
  Link,
  Outlet,
} from "react-router-dom";
import { useMantineTheme, Group } from "@mantine/core";
import Calendar from "./components/Calendar/Calendar";

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
        title={<strong>Settings</strong>}
      >
        {/* Drawer content */}
        <TextInput
          label="Calendar source"
          placeholder="http://yoursite.com/calendar.ics"
          description="Add your google calendar ICS URL Here"
        />
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
              className="icon icon-tabler icon-tabler-settings-2"
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
              <path d="M19.875 6.27a2.225 2.225 0 0 1 1.125 1.948v7.284c0 .809 -.443 1.555 -1.158 1.948l-6.75 4.27a2.269 2.269 0 0 1 -2.184 0l-6.75 -4.27a2.225 2.225 0 0 1 -1.158 -1.948v-7.285c0 -.809 .443 -1.554 1.158 -1.947l6.75 -3.98a2.33 2.33 0 0 1 2.25 0l6.75 3.98h-.033z"></path>
              <path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
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
      {
        path: "about",
        element: <div>About</div>,
      },
    ],
  },
]);

function Routes() {
  return <RouterProvider router={router} />;
}

export default Routes;
