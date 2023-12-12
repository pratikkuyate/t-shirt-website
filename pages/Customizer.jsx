import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useSnapshot } from "valtio";
import config from "../src/config/config/config";
import state from "../src/store";
import { download } from "../src/assets/assets";
import { downloadCanvasToImage, reader } from "../src/config/config/helpers";
import { EditorTabs, FilterTabs, DecalTypes } from "../src/config/config/constants";
import { fadeAnimation, slideAnimation } from "../src/config/config/motion";
import { AIPicker, ColorPicker, CustomButton, FilePicker, Tab } from "../src/components";
import toast, { Toaster } from "react-hot-toast";

const Customizer = () => {
  const snap = useSnapshot(state);
  const [file, setFile] = useState("");
  const [prompt, setPrompt] = useState("");
  const [generatingImg, setGeneratingImg] = useState(false);
  const [activeEditorTab, setActiveEditorTab] = useState("");
  const [activeFilterTab, setActiveFilterTab] = useState({
    logoShirt: true,
    stylishShirt: false,
  });

  const generateTabContent = () => {
    switch (activeEditorTab) {
      case "colorpicker":
        return <ColorPicker />;
      case "filepicker":
        return <FilePicker file={file} setFile={setFile} readFile={readFile} />;
      case "aipicker":
        return (
          <AIPicker prompt={prompt} setPrompt={setPrompt} generatingImg={generatingImg} handleSubmit={handleSubmit} />
        );
      default:
        return null;
    }
  };

  const handleSubmit = async (type) => {
    if (!prompt) return alert("Please enter a prompt");

    try {
      setGeneratingImg(true);

      const response = await fetch("http://localhost:8080/api/v1/dalle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt,
        }),
      });

      const data = await response.json();

      handleDecal(type, `data:image/png;base64,${data.photo}`);
    } catch (error) {
      console.log(error);
      toast.error("Free API limit reached. Please try again later.");
      // alert("Free API limit reached. Please try again later.");
    } finally {
      setGeneratingImg(false);
      setActiveEditorTab("");
    }
  };

  const handleDecal = (type, result) => {
    const decalType = DecalTypes[type];

    state[decalType.stateProperty] = result;

    if (!activeFilterTab[decalType.filterTab]) {
      handleActiveFilterTab(decalType.filterTab);
    }
  };

  const handleActiveFilterTab = (tabName) => {
    switch (tabName) {
      case "logoShirt":
        state.isLogoTextures = !activeFilterTab[tabName];
        break;
      case "stylishShirt":
        state.isStylishTextures = !activeFilterTab[tabName];
        break;
      default:
        state.isFullTextures = false;
        state.isLogoTextures = true;
    }

    setActiveFilterTab((prev) => ({ ...prev, [tabName]: !prev[tabName] }));
  };

  const readFile = (type) => {
    reader(file).then((result) => {
      handleDecal(type, result);
      setActiveEditorTab("");
    });
  };

  return (
    <AnimatePresence>
      {!snap.intro && (
        <>
          <motion.div key="custom" className="absolute top-0 left-0 z-10" {...slideAnimation("left")}>
            <div className="flex item-center min-h-screen">
              <div className="editortabs-container tabs">
                {EditorTabs.map((tab, index) => (
                  <Tab key={tab.name} tab={tab} handleClick={() => setActiveEditorTab(tab.name)} />
                ))}
                {generateTabContent()}
              </div>
            </div>
          </motion.div>

          <motion.div className="absolute z-10 top-5 right-5" {...fadeAnimation}>
            <CustomButton
              type="filled"
              title="Go back"
              handleClick={() => (state.intro = true)}
              customStyle="w-fit px-4 py-2.5 font-bold text-sm"
            />
          </motion.div>

          <motion.div className="filtertabs-container" {...slideAnimation("up")}>
            {FilterTabs.map((tab, index) => (
              <Tab
                key={tab.name}
                tab={tab}
                isFilterTab
                isActiveTab={activeFilterTab[tab.name]}
                handleClick={() => handleActiveFilterTab(tab.name)}
              />
            ))}
          </motion.div>
        </>
      )}
      <Toaster />
    </AnimatePresence>
  );
};

export default Customizer;
