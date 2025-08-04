"use client";
import Tabs from "@/components/Tabs";

const TabsPage = () => {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold">Tabs</h1>
      <Tabs
        tabs={[
          { id: "home", label: "Home" },
          { id: "profile", label: "Profile" },
          { id: "settings", label: "Settings" },
        ]}
        render={(activeTabId) => (
          <div className="p-4">
            {activeTabId === "home" && <p>Welcome to the homepage!</p>}
            {activeTabId === "profile" && <p>Here is your profile.</p>}
            {activeTabId === "settings" && <p>Adjust your settings here.</p>}
          </div>
        )}
      />
    </>
  );
}

export default TabsPage;